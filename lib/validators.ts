import { z } from "zod";

function looksLikeUrl(value: string) {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

export const budgetOptions = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Not sure yet",
] as const;

export const engagementOptions = [
  { value: "fixed", label: "Fixed-price project" },
  { value: "retainer", label: "Monthly retainer" },
  { value: "hourly", label: "Hourly / dedicated" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Enter a valid email address")
    .max(120, "Email is too long"),
  storeUrl: z
    .string()
    .trim()
    .max(200, "URL is too long")
    .refine((v) => v === "" || looksLikeUrl(v), "Enter a valid URL, e.g. mystore.com"),
  service: z.string().max(60),
  engagement: z.string().max(30),
  budget: z.string().max(40),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more (at least 10 characters)")
    .max(3000, "Message is too long (3000 characters max)"),
  /** Honeypot: real visitors never see or fill this field */
  website: z.string(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
