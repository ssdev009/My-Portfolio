export interface EngagementModel {
  id: string;
  name: string;
  bestFor: string;
  features: string[];
  highlight?: boolean;
}

export const engagementModels: EngagementModel[] = [
  {
    id: "fixed",
    name: "Fixed-price project",
    bestFor: "Store builds, custom themes, and migrations",
    features: ["Clear scope and timeline", "Milestone-based payments", "Full QA before launch", "Free post-launch support window"],
  },
  {
    id: "retainer",
    name: "Monthly retainer",
    bestFor: "Support, maintenance, and continuous growth",
    features: ["Reserved monthly hours", "Ongoing CRO and fixes", "Priority response", "Performance monitoring"],
    highlight: true,
  },
  {
    id: "hourly",
    name: "Hourly / dedicated",
    bestFor: "Flexible scope and ongoing improvements",
    features: ["Pay only for time used", "Weekly time reports", "Scale up or down anytime", "Direct access via WhatsApp"],
  },
];
