#!/usr/bin/env node
/**
 * Launch readiness check. Finds placeholders and missing settings.
 * Usage: npm run launch-check
 *  BLOCKER = fix before going live   WARN = should fix   INFO = optional
 * Exits with code 1 only when there are BLOCKERs.
 */
import fs from "node:fs";

const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "");
const out = [];
const add = (level, msg) => out.push({ level, msg });

// ---- environment (.env.local + shell) ----
const env = { ...process.env };
for (const line of read(".env.local").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !line.trim().startsWith("#")) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const site = env.NEXT_PUBLIC_SITE_URL ?? "";
if (!site || site.includes("localhost")) add("BLOCKER", "NEXT_PUBLIC_SITE_URL is missing or still localhost (set your real https:// domain; used for canonical links, sitemap, social cards)");
else if (!site.startsWith("https://")) add("WARN", `NEXT_PUBLIC_SITE_URL should start with https:// (found ${site})`);
else if (site.endsWith("/")) add("WARN", "NEXT_PUBLIC_SITE_URL should not end with a slash");
if (!env.RESEND_API_KEY) add("WARN", "RESEND_API_KEY not found here. The contact form cannot email you without it (ignore if you set it in Vercel)");
if (!env.CONTACT_FROM_EMAIL) add("WARN", "CONTACT_FROM_EMAIL not set. Without a verified domain, visitors do not get the auto-reply (ignore if set in Vercel)");
if (!env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) add("INFO", "Analytics is off (NEXT_PUBLIC_PLAUSIBLE_DOMAIN not set)");
if (!env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) add("INFO", "No Google Search Console verification token set (not needed if you verify by DNS)");

// ---- secrets must never be committed ----
if (!/^\.env/m.test(read(".gitignore"))) add("BLOCKER", ".gitignore does not ignore .env files");

// ---- site.config.ts ----
const cfg = read("data/site.config.ts");
const val = (key) => cfg.match(new RegExp(`${key}:\\s*"([^"]*)"`))?.[1] ?? "";
if (/example\.com/.test(val("email")) || !val("email")) add("BLOCKER", "Contact email is still a placeholder");
if (!val("whatsapp") || val("whatsapp") === "923000000000") add("BLOCKER", "WhatsApp number is still a placeholder");
if (val("bookingUrl").includes("your-link") || !val("bookingUrl")) add("WARN", "No booking calendar link (bookingUrl). The call button uses WhatsApp instead (fine, or add Cal.com / Calendly)");
if (val("brandName") === "StoreVolt") add("WARN", 'Brand name is still the placeholder "StoreVolt". Change brandName in data/site.config.ts when the company name is final');
if (!val("ownerPhoto")) add("INFO", "No owner photo (a monogram is shown). Set ownerPhoto to /images/owner.webp to use a real photo");
const socials = [...cfg.matchAll(/(linkedin|instagram|github|upwork|fiverr):\s*"([^"]*)"/g)];
const empty = socials.filter((s) => !s[2]).map((s) => s[1]);
if (empty.length) add("INFO", `Social links not set: ${empty.join(", ")}`);

// ---- projects ----
const projects = read("data/projects.ts");
const generic = (projects.match(/summary:\s*(shopifyBlurb|wpBlurb|reactBlurb)/g) ?? []).length;
const total = (projects.match(/\bslug:\s*"/g) ?? []).length;
const withImage = (projects.match(/^\s*image:\s*"[^"]+"/gm) ?? []).length;
if (generic > 0) add("WARN", `${generic} of ${total} projects still use a generic one-line description (edit data/projects.ts)`);
if (withImage === 0) add("WARN", `No project has a local screenshot. Live screenshots are used, and the 3 vape stores fall back to a mockup. Add /public/images/*.webp and set image`);
else add("INFO", `${withImage} of ${total} projects have a local screenshot`);

// ---- testimonials ----
if (/testimonials:\s*Testimonial\[\]\s*=\s*\[\s*\]/.test(read("data/testimonials.ts"))) add("INFO", "No testimonials yet, so the section is hidden (add real ones in data/testimonials.ts)");

// ---- images folder ----
const imgs = fs.existsSync("public/images") ? fs.readdirSync("public/images").filter((f) => !f.startsWith(".")) : [];
add("INFO", `public/images has ${imgs.length} file(s)`);

// ---- report ----
const order = ["BLOCKER", "WARN", "INFO"];
console.log("\nLaunch readiness\n");
for (const level of order) {
  const rows = out.filter((o) => o.level === level);
  for (const r of rows) console.log(`  ${level.padEnd(7)} ${r.msg}`);
}
const blockers = out.filter((o) => o.level === "BLOCKER").length;
const warns = out.filter((o) => o.level === "WARN").length;
console.log(`\n${blockers} blocker(s), ${warns} warning(s).` + (blockers ? " Fix the blockers before launch.\n" : " Ready to launch (review warnings).\n"));
process.exit(blockers ? 1 : 0);
