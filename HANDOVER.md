# Handover Guide: how to edit the website

You do not need to touch component code for day-to-day changes. Almost everything is edited in the `data/` folder. After any change: **save, commit, push to `main`**. Vercel redeploys automatically in about a minute.

To preview changes on your computer first:
```bash
npm install     # first time only
npm run dev     # opens http://localhost:3000
```

## Where is everything?
| I want to change... | Edit this file |
|---|---|
| Company name, tagline, contact details, social links, working hours, hero text, stats | `data/site.config.ts` |
| Projects shown in "Selected Work" | `data/projects.ts` |
| Services list | `data/services.ts` |
| About text and the four values | `data/about.ts` |
| Process steps | `data/process.ts` |
| Tech stack lists | `data/tech.ts` |
| Pricing/work models ("Ways to Work") | `data/engagement.ts` |
| FAQ questions | `data/faq.ts` |
| Client testimonials | `data/testimonials.ts` |
| Privacy policy text | `app/privacy/page.tsx` |
| Colors (dark and light) | `app/globals.css` (top of the file) |
| Fonts | `app/layout.tsx` |

---

## Common tasks

### Add a new project
Open `data/projects.ts` and add one entry to the `projects` list:
```ts
{
  slug: "my-new-store",            // unique, lowercase, no spaces
  name: "My New Store",
  platform: "Shopify",             // "Shopify" | "WordPress" | "ReactJS"
  url: "https://mynewstore.com/",
  industry: "Skincare, UK",        // optional
  summary: "One or two sentences: what the business sells and what you built.",
  tags: ["Shopify", "eCommerce", "UK"],
  image: "/images/my-new-store.webp",   // optional, see next task
},
```
The platform filter counts update automatically.

### Add a project screenshot (best-looking cards)
1. Take a desktop screenshot of the site, about 1200 x 750 px, and save it as `.webp` or `.jpg` (keep it under 200 KB).
2. Put it in `public/images/`.
3. Set `image: "/images/<file-name>"` on the project.

If a site shows an age-check popup in the automatic screenshot, set `noScreenshot: true` on that project (a clean mockup is used) or add your own screenshot.

### Add case-study details to a project
Optional fields, shown in the project popup only when filled in. **Only add real facts.**
```ts
challenge: "What the client needed.",
solution: "What you built.",
tech: ["Liquid", "JavaScript"],
results: [{ label: "Page load time", value: "-1.2s" }],
```

### Add a real testimonial
In `data/testimonials.ts`:
```ts
export const testimonials: Testimonial[] = [
  { quote: "Great work, fast delivery.", name: "Client Name", role: "Founder, Store Name", country: "UK" },
];
```
The Testimonials section appears automatically once there is at least one.

### Change the company name
1. `brandName` in `data/site.config.ts` (updates the navbar, footer, emails, share image, page titles, privacy page).
2. Optional: replace the logo mark. The logo is drawn in `components/ui/Logo.tsx`. The browser tab icon is `app/icon.svg`.
3. Update `tagline` and `hero` text in the same config file if needed.
4. Commit and push.

### Update contact details
`data/site.config.ts`:
- `email`, `whatsapp` (international format, digits only, no `+`), `bookingUrl`, `socials`.
- Working hours: `workingHours` (text) and `hours` (days: 0 = Sunday ... 6 = Saturday, start/end in 24h Pakistan time). The "Online now" badge uses `hours`.

Where inquiries are emailed is set separately in Vercel: `CONTACT_TO_EMAIL`.

### Add a booking calendar
Create a free event at Cal.com or Calendly and paste the public link into `bookingUrl`. The "Pick a time" button and the inline calendar appear automatically (until then, the call button opens WhatsApp).

### Update the numbers in the stats bar
`stats` in `data/site.config.ts`:
```ts
{ value: 5, suffix: "+", label: "Years of experience" },
```

### Use a real photo in the About section
Add a square image (about 800 x 800) to `public/images/`, then set `ownerPhoto: "/images/owner.webp"` in `data/site.config.ts`.

### Add or remove a service / FAQ
Copy an existing line in `data/services.ts` or `data/faq.ts`, change the text, save. For service icons, use a name already listed in `lib/icons.ts`.

### Hide or reorder a section
Sections are listed in order in `app/page.tsx`. Delete or move a line. Remember the top navigation links are in `nav` inside `data/site.config.ts`; remove the matching link if you remove a section.

### Change colors
`app/globals.css`, top of the file. Each color has a dark value and a light value (`:root` and `:root[data-theme="light"]`). Values are RGB numbers separated by spaces, for example `0 240 255`. If you change light-theme colors, keep text readable (aim for a contrast ratio of 4.5:1 or better; a checker like https://webaim.org/resources/contrastchecker/ helps).

---

## Things that need the developer
- Changing layouts or adding new sections
- Changing the 3D hero scene (`components/hero/`)
- Changing form fields or email templates (`components/sections/contact/`, `lib/email.ts`, `app/api/contact/route.ts`)

## Accounts used by the site
| Service | Used for | Where |
|---|---|---|
| GitHub | code | repository |
| Vercel | hosting + deployments | vercel.com |
| Resend | contact form emails | resend.com |
| Plausible (optional) | visitor statistics | plausible.io |
| Google Search Console | search performance | search.google.com/search-console |
| Domain registrar | domain name and DNS | your registrar |

## Health checks
```bash
npm run launch-check                          # finds placeholders and missing settings
npm run audit -- https://yourdomain.com       # SEO and accessibility checks on the live site
```

## Notes
- The contact form rate limit (5 messages per 15 minutes per visitor) is kept in server memory, which is enough for a portfolio. If you ever see spam, add Cloudflare Turnstile or Upstash Redis rate limiting.
- The privacy page is a plain-language template. Have it reviewed against the laws that apply to your business.
- Project preview images may be loaded from WordPress.com's screenshot service (`s.wordpress.com`) when no local `image` is set. This is mentioned in the privacy page. Local images avoid this.
