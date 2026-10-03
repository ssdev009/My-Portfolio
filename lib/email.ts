import { siteConfig } from "@/data/site.config";
import type { ContactFormValues } from "@/lib/validators";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface SendArgs {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

/** Sends one email through the Resend REST API (no SDK needed). */
export async function sendEmail({ to, subject, html, text, replyTo }: SendArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const from =
    process.env.CONTACT_FROM_EMAIL ?? `${siteConfig.brandName} <onboarding@resend.dev>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend error ${res.status}: ${detail}`);
  }
}

interface Labels {
  serviceTitle: string;
  engagementLabel: string;
}

export function buildOwnerEmail(data: ContactFormValues, labels: Labels) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Store / website", data.storeUrl || "—"],
    ["Service", labels.serviceTitle],
    ["Engagement", labels.engagementLabel],
    ["Budget", data.budget || "—"],
  ];

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:auto;color:#111">
    <h2 style="margin:0 0 16px">New inquiry from ${escapeHtml(data.name)}</h2>
    <table style="width:100%;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 0;color:#555;width:160px">${escapeHtml(k)}</td><td style="padding:8px 0"><strong>${escapeHtml(v)}</strong></td></tr>`
        )
        .join("")}
    </table>
    <h3 style="margin:24px 0 8px">Message</h3>
    <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(data.message)}</p>
    <p style="color:#888;font-size:12px;margin-top:32px">Sent from the ${escapeHtml(siteConfig.brandName)} website contact form. Reply to this email to respond directly.</p>
  </div>`;

  const text = [
    `New inquiry from ${data.name}`,
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    data.message,
  ].join("\n");

  return { subject: `New Shopify inquiry from ${data.name}`, html, text };
}

export function buildAutoReply(data: ContactFormValues) {
  const first = data.name.split(" ")[0];
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;color:#111;line-height:1.6">
    <h2>Thanks, ${escapeHtml(first)}!</h2>
    <p>I received your message and will reply ${escapeHtml(siteConfig.responseTime)} (working hours: ${escapeHtml(siteConfig.workingHours)}).</p>
    <p>If it's urgent, message me on WhatsApp: <a href="https://wa.me/${escapeHtml(siteConfig.whatsapp)}">chat now</a>.</p>
    <p>— ${escapeHtml(siteConfig.owner)}<br/>${escapeHtml(siteConfig.brandName)}</p>
  </div>`;
  const text = `Thanks, ${first}!\n\nI received your message and will reply ${siteConfig.responseTime} (working hours: ${siteConfig.workingHours}).\nUrgent? WhatsApp: https://wa.me/${siteConfig.whatsapp}\n\n— ${siteConfig.owner}, ${siteConfig.brandName}`;
  return { subject: `Thanks for contacting ${siteConfig.brandName}`, html, text };
}
