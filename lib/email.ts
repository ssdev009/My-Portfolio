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
  templateParams: Record<string, string>;
  replyTo?: string;
}

/** Sends one email through the EmailJS REST API (no SDK needed). */
export async function sendEmail({ to, subject, html, text, templateParams, replyTo }: SendArgs) {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  if (!serviceId || !templateId || !publicKey || !privateKey) {
    throw new Error(
      "EmailJS service ID, template ID, public key, and private key must be configured"
    );
  }

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        ...templateParams,
        to_email: to,
        subject,
        html_content: html,
        message_html: html,
        message: text,
        text_content: text,
        reply_to: replyTo ?? "",
      },
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const detail = (await res.text()).replace(/[\r\n\t]+/g, " ").trim().slice(0, 500);
    throw new Error(
      `EmailJS request failed with status ${res.status}${detail ? `: ${detail}` : ""}`
    );
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
          ([key, value]) =>
            `<tr><td style="padding:8px 0;color:#555;width:160px">${escapeHtml(key)}</td><td style="padding:8px 0"><strong>${escapeHtml(value)}</strong></td></tr>`
        )
        .join("")}
    </table>
    <h3 style="margin:24px 0 8px">Message</h3>
    <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(data.message)}</p>
    <p style="color:#888;font-size:12px;margin-top:32px">Sent from the ${escapeHtml(siteConfig.brandName)} website contact form. Reply to this email to respond directly.</p>
  </div>`;

  const text = [
    `New Shopify inquiry from ${data.name}`,
    ...rows.map(([key, value]) => `${key}: ${value}`),
    "",
    "Message:",
    data.message,
    "",
    `Sent from the ${siteConfig.brandName} website contact form. Reply to this email to respond directly.`,
  ].join("\n");

  return {
    subject: `New Shopify inquiry from ${data.name}`,
    html,
    text,
    templateParams: {
      name: data.name,
      from_name: data.name,
      from_email: data.email,
      email: data.email,
      contact_email: data.email,
      time: new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: siteConfig.timezone,
      }).format(new Date()),
      store_url: data.storeUrl || "—",
      service: labels.serviceTitle,
      service_title: labels.serviceTitle,
      engagement: labels.engagementLabel,
      budget: data.budget || "—",
      client_message: data.message,
    },
  };
}
