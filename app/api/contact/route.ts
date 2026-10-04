import { NextResponse } from "next/server";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site.config";
import { buildOwnerEmail, sendEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rateLimit";
import { contactSchema, engagementOptions } from "@/lib/validators";

export const runtime = "nodejs";

const MIN_FILL_TIME_MS = 1500;

function fail(error: string, status: number, fieldErrors?: Record<string, string[] | undefined>) {
  return NextResponse.json({ ok: false, error, fieldErrors }, { status });
}

export async function POST(req: Request) {
  // 1) Rate limit by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(ip)) {
    return fail("Too many messages. Please try again in a few minutes or use WhatsApp.", 429);
  }

  // 2) Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  // 3) Spam checks: honeypot + suspiciously fast submit. Pretend success to bots.
  const raw = (body ?? {}) as Record<string, unknown>;
  const elapsed = typeof raw.elapsed === "number" ? raw.elapsed : Infinity;
  if ((typeof raw.website === "string" && raw.website.length > 0) || elapsed < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  // 4) Validate
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return fail("Please check the highlighted fields.", 400, parsed.error.flatten().fieldErrors);
  }
  const data = parsed.data;

  const labels = {
    serviceTitle:
      services.find((s) => s.id === data.service)?.title ??
      (data.service ? "Other" : "Not specified"),
    engagementLabel:
      engagementOptions.find((e) => e.value === data.engagement)?.label ?? "Not specified",
  };

  // 5) Local dev without EmailJS configuration: accept the form without sending
  const emailJsConfigured = [
    process.env.EMAILJS_SERVICE_ID,
    process.env.EMAILJS_TEMPLATE_ID,
    process.env.EMAILJS_PUBLIC_KEY,
    process.env.EMAILJS_PRIVATE_KEY,
  ].every(Boolean);
  if (!emailJsConfigured) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] EmailJS is not configured; skipping email delivery in development.");
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] EmailJS service, template, public, or private key is not configured");
    return fail("Messages are temporarily unavailable. Please use WhatsApp or email instead.", 500);
  }

  // 6) Send the inquiry to the owner
  const owner = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  try {
    const mail = buildOwnerEmail(data, labels);
    await sendEmail({ to: owner, replyTo: data.email, subject: mail.subject, html: mail.html });
  } catch (err) {
    console.error("[contact] EmailJS delivery failed:", err);
    return fail("Could not send your message. Please try WhatsApp or email instead.", 502);
  }

  return NextResponse.json({ ok: true });
}
