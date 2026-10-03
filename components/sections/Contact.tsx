import dynamic from "next/dynamic";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { siteConfig, mailtoLink, whatsappLink } from "@/data/site.config";
import { AvailabilityCard } from "./contact/AvailabilityCard";
import { BookingEmbed } from "./contact/BookingEmbed";
// Form libraries load as a separate chunk (still server-rendered, so it is visible immediately)
const ContactForm = dynamic(() => import("./contact/ContactForm").then((m) => m.ContactForm), {
  loading: () => <div className="h-[640px] animate-pulse rounded-2xl border border-line bg-surface" aria-hidden="true" />,
});

const channelClass =
  "group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-all duration-300 " +
  "hover:-translate-y-0.5 hover:border-cyan/70 hover:shadow-glow-soft";

export function Contact() {
  return (
    <Section
      id="contact"
      label="Contact"
      title="Let's build your store"
      description={`Tell me about your project and I'll reply ${siteConfig.responseTime}. Prefer chat? WhatsApp is the fastest way to reach me.`}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="space-y-5">
          <Reveal>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={channelClass}
            >
              <span className="rounded-xl border border-line bg-surface2 p-3 text-success">
                <MessageCircle size={24} aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="block font-heading font-semibold">WhatsApp</span>
                <span className="block text-sm text-muted">Fastest reply, chat anytime</span>
              </span>
              <ArrowUpRight size={18} className="text-muted transition-colors group-hover:text-cyan" aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <a href={mailtoLink()} className={channelClass}>
              <span className="rounded-xl border border-line bg-surface2 p-3 text-cyan">
                <Mail size={24} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading font-semibold">Email</span>
                <span className="block truncate text-sm text-muted">{siteConfig.email}</span>
              </span>
              <ArrowUpRight size={18} className="text-muted transition-colors group-hover:text-cyan" aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal delay={0.16}>
            <AvailabilityCard />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>

      <Reveal className="mt-8">
        <BookingEmbed />
      </Reveal>
    </Section>
  );
}
