import { Code2, ClipboardCheck, LifeBuoy, Rocket, Search, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { processSteps } from "@/data/process";

const icons: Record<string, LucideIcon> = { Search, ClipboardCheck, Code2, Rocket, LifeBuoy };

export function Process() {
  return (
    <Section
      id="process"
      label="Process"
      title="From first call to launch"
      description="A simple, transparent workflow so you always know what happens next."
    >
      <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
        {/* connecting line (desktop) */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-7 hidden h-px bg-neon-gradient opacity-40 lg:block"
        />
        {processSteps.map((step, i) => {
          const Icon = icons[step.icon];
          return (
            <li key={step.title}>
              <Reveal delay={i * 0.1} className="relative flex gap-5 lg:flex-col lg:gap-0">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-cyan/70 bg-bg text-cyan shadow-glow-soft">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div className="lg:mt-6">
                  <p className="font-mono text-xs text-magenta">STEP 0{i + 1}</p>
                  <h3 className="mt-1 !text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.description}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
