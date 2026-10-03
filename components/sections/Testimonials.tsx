import { Quote, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section
      id="testimonials"
      label="Testimonials"
      title="What clients say"
      description="Brands around the world trust us with their Shopify stores."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <Card className="flex h-full flex-col">
              <Quote className="text-magenta" size={28} aria-hidden="true" />
              <div className="mt-4 flex gap-1 text-shopify" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={16} fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-ink">“{t.quote}”</blockquote>
              <footer className="mt-6 border-t border-line pt-4">
                <p className="font-heading font-semibold">{t.name}</p>
                <p className="text-sm text-muted">
                  {t.role} · {t.country}
                </p>
              </footer>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
