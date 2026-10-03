export interface ProcessStep {
  title: string;
  description: string;
  icon: "Search" | "ClipboardCheck" | "Code2" | "Rocket" | "LifeBuoy";
}

export const processSteps: ProcessStep[] = [
  { title: "Discover", description: "We talk goals, audience, and audit your current store or idea.", icon: "Search" },
  { title: "Plan", description: "Scope, wireframes, timeline, and a fixed quote you can trust.", icon: "ClipboardCheck" },
  { title: "Design & Build", description: "Theme or app development with weekly progress updates.", icon: "Code2" },
  { title: "Test & Launch", description: "QA on every device, speed checks, and a smooth go-live.", icon: "Rocket" },
  { title: "Support & Grow", description: "Monitoring, fixes, and ongoing optimization after launch.", icon: "LifeBuoy" },
];
