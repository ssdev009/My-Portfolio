/**
 * SINGLE SOURCE OF TRUTH for brand, contact, and global copy.
 * Anything marked [REPLACE] is a placeholder the client should update.
 */
export const siteConfig = {
  /** Public site address. Set NEXT_PUBLIC_SITE_URL in production (used for SEO, sitemap and social cards) */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  brandName: "StoreVolt", // [REPLACE] when the final company name is decided
  tagline: "Shopify stores that convert. Built fast.",
  description:
    "StoreVolt is a Shopify development studio led by Muhammad Shahzad, with 5+ years of experience building Shopify stores, WordPress sites and React web apps for brands worldwide.",
  experienceYears: "5+",
  /** Show an automatic live screenshot on project cards that have no local image (falls back to a mockup if it fails) */
  liveScreenshots: true,
  owner: "Muhammad Shahzad",
  ownerRole: "Founder & Lead Shopify Developer",
  /** Local profile portrait displayed in the About section. */
  ownerPhoto: "/images/pic.jpeg",

  // Real contact details
  email: "shahzad.shopifydev@gmail.com",
  whatsapp: "923166789435", // +92 316 6789435, international format, digits only
  whatsappMessage:
    "Hi, I found you via your website and I'd like to discuss a Shopify project.",
  bookingUrl: "https://cal.com/your-link",

  timezone: "Asia/Karachi",
  timezoneLabel: "PKT (UTC+5)",
  /** Pakistan has no daylight saving, so a fixed offset is safe for the local-time converter */
  utcOffsetHours: 5,
  workingHours: "Mon–Sat, 10:00–19:00 PKT",
  /** days: 0 = Sunday ... 6 = Saturday; start/end are PKT hours (24h clock) */
  hours: { days: [1, 2, 3, 4, 5, 6] as number[], start: 10, end: 19 },
  responseTime: "within 24 hours",

  // Leave empty strings to hide a social link
  socials: {
    linkedin: "https://www.linkedin.com/in/muhammad-shahzad-43bb59225/",
    instagram: "",
    github: "https://github.com/ssdev009",
    upwork: "https://www.upwork.com/freelancers/~0119297b6f74e0d7a8?mp_source=share",
    fiverr: "",
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "SHOPIFY DEVELOPMENT STUDIO",
    headline: "We build Shopify stores that sell while you sleep.",
    subheadline:
      "5+ years building fast, conversion-focused Shopify, WordPress, and React websites for brands worldwide. Led by Muhammad Shahzad.",
    primaryCta: { label: "Book a Free Call", href: "#contact" },
    secondaryCta: { label: "View Our Work", href: "#work" },
    trustLine: "Shopify Experts • Clients Worldwide • Fast Delivery",
  },

  // Based on the real project list (16 live sites, 11 on Shopify)
  stats: [
    { value: 5, suffix: "+", label: "Years of experience" },
    { value: 16, suffix: "+", label: "Live projects delivered" },
    { value: 11, suffix: "+", label: "Shopify stores built" },
    { value: 3, suffix: "", label: "Platforms: Shopify, WordPress, React" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export const whatsappLink = () =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    siteConfig.whatsappMessage
  )}`;

export const mailtoLink = () => `mailto:${siteConfig.email}`;
