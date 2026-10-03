export interface Service {
  id: string;
  title: string;
  description: string;
  /** lucide-react icon name (mapped in the Services section, Phase 3) */
  icon: string;
}

export const services: Service[] = [
  { id: "store-setup", title: "Shopify Store Setup & Build", description: "A complete, launch-ready store built from scratch.", icon: "Store" },
  { id: "custom-theme", title: "Custom Theme Development", description: "Unique Liquid themes on Online Store 2.0 with sections everywhere.", icon: "Code2" },
  { id: "theme-customization", title: "Theme Customization", description: "Tailor any existing theme to match your brand.", icon: "Palette" },
  { id: "custom-apps", title: "Custom Shopify Apps", description: "Public and private apps using the Admin and Storefront APIs.", icon: "Puzzle" },
  { id: "headless", title: "Headless Commerce", description: "Blazing-fast custom storefronts with Hydrogen or Next.js.", icon: "Zap" },
  { id: "migration", title: "Store Migration", description: "Move from WooCommerce, Magento, BigCommerce, Wix, or Squarespace.", icon: "ArrowRightLeft" },
  { id: "speed", title: "Speed & Performance", description: "Faster loads and better Core Web Vitals.", icon: "Gauge" },
  { id: "wordpress", title: "WordPress Development", description: "Fast, secure business websites and custom WordPress themes that are easy to manage.", icon: "LayoutTemplate" },
  { id: "react", title: "React & Next.js Web Apps", description: "Modern, high-performance websites and web apps built with ReactJS.", icon: "AppWindow" },
  { id: "shopify-plus", title: "Shopify Plus Development", description: "Enterprise features, automation, and scalable setups.", icon: "Rocket" },
  { id: "checkout", title: "Checkout Customization", description: "Checkout UI extensions, branding, and upsells.", icon: "ShoppingCart" },
  { id: "cro", title: "Conversion Optimization", description: "UX improvements and A/B-ready layouts that turn visitors into buyers.", icon: "TrendingUp" },
  { id: "integrations", title: "Third-Party Integrations", description: "ERP, CRM, 3PL, email, payments, and reviews connected cleanly.", icon: "Plug" },
  { id: "subscriptions", title: "Subscriptions & Custom Features", description: "Recurring products, bundles, upsells, and product builders.", icon: "Repeat" },
  { id: "markets", title: "Multi-Currency & International", description: "Sell globally with localized storefronts using Shopify Markets.", icon: "Globe" },
  { id: "seo", title: "Shopify SEO", description: "Technical SEO, structured data, and optimized collections.", icon: "Search" },
  { id: "pos", title: "Shopify POS Setup", description: "Unify online and in-store sales.", icon: "CreditCard" },
  { id: "audit", title: "Store Audit & Consulting", description: "Find what's slowing sales and get a clear action plan.", icon: "ClipboardCheck" },
  { id: "support", title: "Maintenance & Support", description: "Ongoing updates, fixes, and monthly retainers.", icon: "LifeBuoy" },
  { id: "white-label", title: "White-Label for Agencies", description: "Reliable overflow development for agencies.", icon: "Users" },
];
