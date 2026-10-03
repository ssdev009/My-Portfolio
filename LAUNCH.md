# Launch Guide

From zip file to live website. Allow 1 to 2 hours (DNS changes can take longer to spread).

## 0. Check readiness
```bash
npm install
npm run launch-check
```
`BLOCKER` items must be fixed. `WARN` items are strongly recommended. `INFO` items are optional.

---

## 1. Put the code on GitHub
1. Create a new **private** repository on GitHub (no README, no .gitignore).
2. In the project folder:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
`.env.local` is ignored by git, so secrets are never uploaded. The included GitHub Action (`.github/workflows/ci.yml`) type-checks and builds every push.

## 2. Deploy on Vercel
1. Sign in at https://vercel.com with GitHub, click **Add New > Project**, and import the repo.
2. Framework is detected automatically (Next.js). Do not change build settings.
3. Open **Environment Variables** and add these before the first deploy:

| Name | Value | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` (no trailing slash) | Yes |
| `RESEND_API_KEY` | key from resend.com | Yes (form emails) |
| `CONTACT_TO_EMAIL` | where inquiries go (default: the email in `site.config.ts`) | Optional |
| `CONTACT_FROM_EMAIL` | `StoreVolt <hello@yourdomain.com>` | Recommended |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `yourdomain.com` | Optional |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | token from Search Console | Optional |

4. Click **Deploy**. You get a free address like `your-project.vercel.app`.

> **Important:** variables starting with `NEXT_PUBLIC_` are baked in at build time. If you change one later, click **Redeploy**.

Until the real domain is ready, set `NEXT_PUBLIC_SITE_URL` to the `.vercel.app` address so links and the sitemap are correct.

## 3. Make the contact form send email (Resend)
1. Create a free account at https://resend.com and create an **API key**. Paste it into Vercel as `RESEND_API_KEY`.
2. **Without a verified domain**, Resend only delivers to the email you signed up with. Inquiries still reach you if you sign up with the same address as `CONTACT_TO_EMAIL`, but visitors will not get the auto-reply.
3. **To email anyone:** in Resend go to **Domains > Add Domain**, add the DNS records it shows (SPF/DKIM) at your domain registrar, and wait until it says *Verified*. Then set `CONTACT_FROM_EMAIL` to an address on that domain.
4. Redeploy, open the live site, send a test message, and check your inbox (and spam folder).

## 4. Connect your own domain
1. Buy a domain if you do not have one (any registrar: Namecheap, Cloudflare, GoDaddy...).
2. In Vercel: **Project > Settings > Domains > Add** your domain (and `www.`). Vercel shows the exact DNS records to create.
3. Add those records at your registrar (typically an `A` record for the root domain and a `CNAME` for `www`). Use the values Vercel shows you.
4. HTTPS certificates are issued automatically once DNS is correct (a few minutes to a few hours).
5. Set `NEXT_PUBLIC_SITE_URL` to the final `https://yourdomain.com` and **Redeploy**.
6. In the Domains list, make one version (for example the root domain) the primary and redirect the other to it.

## 5. Search engines
1. Open https://search.google.com/search-console, add your domain, and verify it (DNS record is easiest, or use the HTML tag token with `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`).
2. Submit `https://yourdomain.com/sitemap.xml` under **Sitemaps**.
3. Optional: do the same at https://www.bing.com/webmasters.
4. Test rich results at https://search.google.com/test/rich-results (the page has Person, business, services and FAQ data).

## 6. Analytics (optional)
Create a site at https://plausible.io (or self-host), add your domain, and set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`. No cookie banner is needed because it does not use cookies. Tracked actions: WhatsApp, email, social, booking and "contact" clicks, project visits, form submit/error. In Plausible, create *Goals* with these exact names: `WhatsApp Click`, `Email Click`, `Contact CTA Click`, `Project Visit`, `Contact Form Submit`.

---

## 7. Final test (do all on the live site)
| Check | Pass? |
|---|---|
| Home page loads over `https://`, no browser warnings | |
| Light and dark theme buttons both work and text is readable | |
| Phone view: menu opens, nothing scrolls sideways | |
| Contact form: send a test message, it arrives in your inbox | |
| Contact form: empty submit shows clear errors | |
| WhatsApp button opens a chat with the right number | |
| Email link opens your mail app with the right address | |
| Every project card opens, "visit" link goes to the right site | |
| "Pause animations" button stops the hero motion | |
| Share the link on WhatsApp/LinkedIn: preview image + title appear | |
| `npm run audit -- https://yourdomain.com` shows all PASS | |
| PageSpeed Insights (pagespeed.web.dev): Performance, Accessibility, SEO scores checked | |

Social preview caches: if a preview looks old, refresh it at https://www.linkedin.com/post-inspector/ .

---

## 8. Handing over to the client
1. **GitHub:** repo > Settings > Transfer ownership (or invite the client as admin).
2. **Vercel:** project > Settings > Transfer, or have the client import the repo into their own account and add the env vars.
3. **Domain:** it should be registered in the client's name. If it is in yours, transfer it.
4. **Accounts the client must own:** Resend, Plausible, Search Console, the booking calendar.
5. Send them `HANDOVER.md` (how to edit text, projects, contact details, colors).

---

## Troubleshooting
| Problem | Fix |
|---|---|
| Social card or canonical link shows `localhost` | `NEXT_PUBLIC_SITE_URL` was missing at build time. Set it and **Redeploy**. |
| Form says "temporarily unavailable" | `RESEND_API_KEY` is missing or wrong. Check **Vercel > Logs** for `[contact]` messages. |
| Form works but you get no email | Check spam. Without a verified domain, `CONTACT_TO_EMAIL` must be the email you signed up to Resend with. |
| Visitors report no auto-reply | Verify your domain in Resend and set `CONTACT_FROM_EMAIL`. |
| Project card shows a mockup instead of a screenshot | The live screenshot service was slow or blocked. Add your own screenshot in `public/images/` and set `image`. |
| 3D hero not visible | The browser has WebGL disabled or "reduce motion" is on. A static neon bag is shown instead (by design). |
| Build fails on Vercel about fonts | Rare network hiccup. Redeploy. |
| Changed text but site is unchanged | Commit and push to `main`; Vercel redeploys in about a minute. |
