export type Platform = "Shopify" | "WordPress" | "ReactJS";

export interface ProjectResult {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  name: string;
  platform: Platform;
  /** Live website address */
  url: string;
  /** Industry or store type, shown above the name (optional) */
  industry?: string;
  summary: string;
  tags: string[];
  /** Local screenshot in /public/images (e.g. "/images/greetvape.webp"). Best quality, used first. */
  image?: string;
  /** Set true to skip the automatic live screenshot (e.g. sites with an age-check popup) */
  noScreenshot?: boolean;
  // Optional case-study details. Only shown when filled in. Add real facts only.
  challenge?: string;
  solution?: string;
  tech?: string[];
  results?: ProjectResult[];
}

export const platforms: Platform[] = ["Shopify", "WordPress", "ReactJS"];

const shopifyBlurb = "Live Shopify storefront.";
const wpBlurb = "Live WordPress website.";
const reactBlurb = "Live ReactJS web application.";

/**
 * REAL live projects. Descriptions for Greet Vape and Alectrofag come from their
 * live sites. For the others, replace `summary` / `industry` with one real line
 * (what the business sells + what you built). Drop screenshots in /public/images
 * and set `image` for the best-looking cards.
 */
export const projects: Project[] = [
  {
    slug: "greetvape",
    name: "Greet Vape",
    platform: "Shopify",
    url: "https://www.greetvape.co.uk/",
    industry: "Online vape store, UK",
    summary: "UK online vape store with prefilled pod kits, e-liquids and accessories, next-day delivery, and a multi-branch retail presence.",
    tags: ["Shopify", "eCommerce", "UK"],
  },
  {
    slug: "alectrofag",
    name: "Alectrofag",
    platform: "Shopify",
    url: "https://www.alectrofag.co.uk/",
    industry: "Online vape store, UK",
    summary: "Large UK online vape shop with 2,500+ e-liquid flavours, kits and pods, same-day dispatch, and a rewards program.",
    tags: ["Shopify", "eCommerce", "UK"],
  },
  { slug: "vapegala", name: "Vape Gala", platform: "Shopify", url: "https://www.vapegala.co.uk/", industry: "Online store, UK", summary: shopifyBlurb, tags: ["Shopify", "eCommerce", "UK"] },
  { slug: "luxurydesires", name: "Luxury Desires", platform: "Shopify", url: "https://luxurydesires.pk/", summary: shopifyBlurb, tags: ["Shopify", "eCommerce", "Pakistan"] },
  { slug: "skingen", name: "SkinGen", platform: "Shopify", url: "https://skingen.pk/", summary: shopifyBlurb, tags: ["Shopify", "eCommerce", "Pakistan"] },
  { slug: "vanillaskinltd", name: "Vanilla Skin Ltd", platform: "Shopify", url: "https://vanillaskinltd.com/", summary: shopifyBlurb, tags: ["Shopify", "eCommerce"] },
  { slug: "smashithoney", name: "Smash It Honey", platform: "Shopify", url: "https://smashithoney.com/", summary: shopifyBlurb, tags: ["Shopify", "eCommerce"] },
  { slug: "myvanillaskin", name: "My Vanilla Skin", platform: "Shopify", url: "https://myvanillaskin.com/", summary: shopifyBlurb, tags: ["Shopify", "eCommerce"] },
  { slug: "gopurple", name: "Go Purple", platform: "Shopify", url: "https://gopurple.pk/", summary: shopifyBlurb, tags: ["Shopify", "eCommerce", "Pakistan"] },
  { slug: "vitafix", name: "VitaFix", platform: "Shopify", url: "https://vitafix.pk/", summary: shopifyBlurb, tags: ["Shopify", "eCommerce", "Pakistan"] },
  { slug: "s2bysabafaisal", name: "S2 by Saba Faisal", platform: "Shopify", url: "https://s2bysabafaisal.com/", summary: shopifyBlurb, tags: ["Shopify", "eCommerce"] },
  { slug: "roplar", name: "Roplar", platform: "WordPress", url: "https://roplar.com/", summary: wpBlurb, tags: ["WordPress", "Website"] },
  { slug: "ufadistro", name: "UFA Distro", platform: "WordPress", url: "https://ufadistro.com/", summary: wpBlurb, tags: ["WordPress", "Website"] },
  { slug: "dentalaesthetics", name: "Dental Aesthetics", platform: "ReactJS", url: "https://www.dentalaesthetics.pk/", summary: reactBlurb, tags: ["ReactJS", "Web app", "Pakistan"] },
  { slug: "xcentricservices", name: "Xcentric Services", platform: "ReactJS", url: "https://www.xcentricservices.com/", summary: reactBlurb, tags: ["ReactJS", "Web app"] },
  { slug: "glommico", name: "Glommico", platform: "ReactJS", url: "https://www.glommico.com/", summary: reactBlurb, tags: ["ReactJS", "Web app"] },
];

export function domainOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
