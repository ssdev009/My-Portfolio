import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site.config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.brandName} handles your personal data.`,
  alternates: { canonical: "/privacy" },
};

/**
 * Plain-language TEMPLATE. Have it reviewed against the laws that apply to your
 * business (for UK visitors: UK GDPR) before relying on it.
 */
export default function PrivacyPage() {
  const h2 = "mt-10 !text-2xl";
  const p = "mt-3 text-muted";

  return (
    <Container className="max-w-3xl py-16 sm:py-24">
      <h1 className="!text-4xl sm:!text-5xl">Privacy Policy</h1>
      <p className="mt-4 font-mono text-xs text-muted">Last updated: October 2026</p>

      <p className={p}>
        This website is run by {siteConfig.owner} ({siteConfig.brandName}). This page explains what
        information is collected and how it is used. Questions? Email{" "}
        <a className="text-cyan underline" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>
        .
      </p>

      <h2 className={h2}>Information you send me</h2>
      <p className={p}>
        If you use the contact form, I receive your name, email address, store or website (optional),
        the service you are interested in, your budget range and your message. I use this only to reply
        to your enquiry and to discuss the project. Form messages are delivered to me by email through
        EmailJS. If you contact me on WhatsApp or by email directly, those services
        process your message under their own policies.
      </p>

      <h2 className={h2}>How long I keep it</h2>
      <p className={p}>
        I keep enquiry emails for as long as needed to respond and to manage any work that follows, and
        delete them on request.
      </p>

      <h2 className={h2}>Analytics</h2>
      <p className={p}>
        This site may use Plausible Analytics, a privacy-friendly tool that does not use cookies and does
        not collect personal data. It records anonymous page views and button clicks (for example,
        WhatsApp or email clicks) so I can understand which parts of the site are useful.
      </p>

      <h2 className={h2}>Stored on your device</h2>
      <p className={p}>
        Your light/dark theme choice and your &quot;reduce glow &amp; motion&quot; choice are saved in
        your browser&apos;s local storage so the site remembers them. They are not used for tracking.
      </p>

      <h2 className={h2}>Third-party content</h2>
      <p className={p}>
        Project preview images in the portfolio section may be loaded from the WordPress.com screenshot
        service (s.wordpress.com), which means your IP address is visible to that service when the images
        load. Links to other websites (my live projects, Upwork, LinkedIn, GitHub, WhatsApp) are governed
        by those sites&apos; own policies.
      </p>

      <h2 className={h2}>Your rights</h2>
      <p className={p}>
        Depending on where you live, you may have the right to access, correct or delete the personal data
        I hold about you, or to object to how it is used. To make a request, email{" "}
        <a className="text-cyan underline" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>
        .
      </p>
    </Container>
  );
}
