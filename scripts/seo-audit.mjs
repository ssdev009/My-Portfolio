#!/usr/bin/env node
/**
 * Quick SEO + accessibility health check.
 * Usage:  npm run audit                      (checks http://localhost:3000)
 *         npm run audit -- https://yourdomain.com
 */
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
let failures = 0;
const ok = (m) => console.log(`  PASS  ${m}`);
const bad = (m) => { failures++; console.log(`  FAIL  ${m}`); };
const check = (cond, pass, fail) => (cond ? ok(pass) : bad(fail));

const get = async (path) => {
  const res = await fetch(base + path, { redirect: "manual" });
  return { res, text: await res.text() };
};

console.log(`\nAuditing ${base}\n`);
const { res, text: html } = await get("/");
check(res.status === 200, "Home page returns 200", `Home page returned ${res.status}`);

const meta = (re) => html.match(re)?.[1] ?? "";
const title = meta(/<title>([^<]*)<\/title>/);
check(title.length >= 20 && title.length <= 70, `Title length ${title.length}: "${title}"`, `Title length ${title.length} (aim for 20-70)`);

const desc = meta(/<meta name="description" content="([^"]*)"/);
check(desc.length >= 70 && desc.length <= 170, `Meta description length ${desc.length}`, `Meta description length ${desc.length} (aim for 70-170)`);

check(/<link rel="canonical" href="[^"]+"/.test(html), "Canonical link present", "Missing canonical link");
check(/<html[^>]*lang="en"/.test(html), "<html lang> set", "Missing <html lang>");
check(/name="viewport"/.test(html), "Viewport meta present", "Missing viewport meta");
check(/property="og:title"/.test(html) && /property="og:image"/.test(html), "Open Graph title + image present", "Missing og:title or og:image");
check(/name="twitter:card"/.test(html), "Twitter card present", "Missing twitter:card");

const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
check(h1s === 1, "Exactly one <h1>", `Found ${h1s} <h1> elements`);

// JSON-LD
const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
let types = [];
try {
  for (const b of blocks) types.push(...JSON.parse(b[1])["@graph"].map((n) => n["@type"]));
  check(types.length > 0, `JSON-LD parses: ${types.join(", ")}`, "No JSON-LD found");
} catch (e) {
  bad("JSON-LD is not valid JSON");
}

// images
const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
const noAlt = imgs.filter((i) => !/\balt=/.test(i));
check(noAlt.length === 0, `All ${imgs.length} <img> tags have alt`, `${noAlt.length} <img> without alt`);

// external links
const links = [...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].map((m) => m[0]);
const unsafe = links.filter((l) => !/rel="[^"]*noopener/.test(l));
check(unsafe.length === 0, `All ${links.length} new-tab links use rel=noopener`, `${unsafe.length} new-tab links missing rel=noopener`);

// in-page anchors resolve
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
const dup = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]).filter((v, i, a) => a.indexOf(v) !== i);
check(dup.length === 0, "No duplicate ids", `Duplicate ids: ${[...new Set(dup)].join(", ")}`);
const anchors = [...new Set([...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]))];
const missing = anchors.filter((a) => !ids.has(a));
check(missing.length === 0, `All ${anchors.length} in-page anchors point to a real section`, `Broken anchors: ${missing.join(", ")}`);

// buttons without a name
const emptyBtn = [...html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g)].filter((m) => {
  const text = m[1].replace(/<svg[\s\S]*?<\/svg>/g, "").replace(/<[^>]+>/g, "").trim();
  return !text && !/aria-label=/.test(m[0]);
});
check(emptyBtn.length === 0, "Every button has an accessible name", `${emptyBtn.length} buttons without a name`);

// supporting files
for (const [path, type] of [["/robots.txt", "text/plain"], ["/sitemap.xml", "xml"], ["/manifest.webmanifest", "json"], ["/opengraph-image", "image/png"], ["/privacy", "html"]]) {
  const r = await fetch(base + path);
  check(r.status === 200 && (r.headers.get("content-type") ?? "").includes(type.split("/").pop()), `${path} OK (${r.headers.get("content-type")})`, `${path} problem (status ${r.status})`);
}

const h = res.headers;
check(h.get("x-content-type-options") === "nosniff", "Security headers set", "Security headers missing");
check(!h.get("x-powered-by"), "x-powered-by header hidden", "x-powered-by header exposed");

console.log(`\n${failures === 0 ? "All checks passed." : failures + " check(s) failed."}\n`);
process.exit(failures === 0 ? 0 : 1);
