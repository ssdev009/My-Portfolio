export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  { question: "How long does a Shopify store take to build?", answer: "Typically 2–6 weeks depending on scope, design complexity, and custom features." },
  { question: "Can you work with my existing theme or store?", answer: "Yes. Customizing and improving existing stores is a core service." },
  { question: "Do you handle migrations from other platforms?", answer: "Yes, including products, customers, orders, and SEO redirects." },
  { question: "How do we communicate across time zones?", answer: "I work on Pakistan time (PKT, UTC+5) with overlap windows for the US, UK, and Middle East, plus WhatsApp and email for quick replies." },
  { question: "Do you offer support after launch?", answer: "Yes. Every project includes a free support window, with optional monthly plans after that." },
  { question: "How does payment work?", answer: "Milestone-based for projects and monthly for retainers." },
  { question: "Can you work under NDA or white-label for my agency?", answer: "Yes, both are available." },
];
