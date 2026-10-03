
export interface AboutValue {
  title: string;
  description: string;
  icon: "Zap" | "MessageSquare" | "TrendingUp" | "LifeBuoy";
}

// Edit this copy any time. It is the About section text.
export const aboutCopy = {
  title: "The developer behind your store",
  paragraphs: [
    "I'm Muhammad Shahzad, a developer with 5+ years of experience building Shopify stores, WordPress websites, and ReactJS web apps for brands in the UK, Pakistan, and beyond.",
    "I lead StoreVolt, a small, focused studio where you work directly with the person building your project. No middlemen, clear communication, and work that ships on time.",
    "Whether you are launching your first store, migrating from another platform, or scaling a growing brand, the goal is the same: a site that loads fast, looks sharp, and sells.",
  ],
};

export const aboutValues: AboutValue[] = [
  { title: "Speed", description: "Fast delivery and faster stores.", icon: "Zap" },
  { title: "Clarity", description: "Plain-language updates, no surprises.", icon: "MessageSquare" },
  { title: "Conversion-first", description: "Every design choice earns its place.", icon: "TrendingUp" },
  { title: "Long-term support", description: "I stay after launch.", icon: "LifeBuoy" },
];

