import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { engagementModels } from "@/data/engagement";
import { cn } from "@/lib/utils";

export function Engagement() {
  return (
    <Section
      id="engagement"
      label="Ways to Work"
      title="Pick the model that fits"
      description="Every project is quoted individually. Tell me what you need and get a clear proposal within 24 hours."
    >
      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        {engagementModels.map((m, i) => (
          <Reveal key={m.id} delay={i * 0.1} className="h-full">
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl border bg-surface p-6 sm:p-8",
                m.highlight
                  ? "gradient-border border-transparent shadow-glow-soft"
                  : "border-line"
              )}
            >
              {m.highlight && (
                <span className="absolute -top-3 left-6 sm:left-8 rounded-full bg-neon-gradient px-3 py-1 font-mono text-xs font-semibold text-bg">
                  MOST POPULAR
                </span>
              )}
              <h3 className="!text-2xl">{m.name}</h3>
              <p className="mt-2 text-sm text-muted">{m.bestFor}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {m.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check size={18} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                href={`/?plan=${m.id}#contact`}
                variant={m.highlight ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                Get a Quote
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
