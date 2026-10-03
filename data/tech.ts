export interface TechCategory {
  title: string;
  items: string[];
}

export const techCategories: TechCategory[] = [
  {
    title: "Shopify",
    items: ["Liquid", "Online Store 2.0", "Shopify Plus", "Hydrogen", "Checkout Extensions", "Shopify Functions", "Admin API", "Storefront API", "Metafields"],
  },
  {
    title: "Frontend & CMS",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "WordPress", "Figma"],
  },
  {
    title: "Backend & Data",
    items: ["Node.js", "Remix", "GraphQL", "REST APIs", "Webhooks", "PostgreSQL"],
  },
  {
    title: "Apps & Tools",
    items: ["Klaviyo", "Recharge", "Judge.me", "Google Analytics", "GitHub", "Vercel"],
  },
];
