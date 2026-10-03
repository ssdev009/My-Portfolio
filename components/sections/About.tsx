import { Clock, LifeBuoy, MessageSquare, TrendingUp, Zap, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { aboutCopy, aboutValues } from "@/data/about";
import { siteConfig } from "@/data/site.config";

const valueIcons: Record<string, LucideIcon> = { Zap, MessageSquare, TrendingUp, LifeBuoy };

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function About() {
  return (
    <Section id="about" label="About" title={aboutCopy.title}>
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,380px)_1fr]">
        {/* Portrait / monogram */}
        <Reveal>
          <div className="gradient-border relative mx-auto aspect-square w-full max-w-sm rounded-3xl bg-surface p-2">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[1.25rem] bg-surface2">
              {siteConfig.ownerPhoto ? (
                <Image
                  src={siteConfig.ownerPhoto}
                  alt={siteConfig.owner}
                  fill
                  sizes="(min-width: 1024px) 380px, 80vw"
                  className="object-cover"
                />
              ) : (
                <>
                  <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-cyan/25 blur-3xl" />
                  <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-magenta/25 blur-3xl" />
                  <span className="gradient-text relative font-heading text-8xl font-bold">
                    {initials(siteConfig.owner)}
                  </span>
                </>
              )}
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-line bg-bg/80 px-4 py-3 backdrop-blur">
                <p className="font-heading font-semibold">{siteConfig.owner}</p>
                <p className="font-mono text-xs text-cyan">{siteConfig.ownerRole}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Copy + values */}
        <div>
          <Reveal className="space-y-4 text-lg text-muted">
            {aboutCopy.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {aboutValues.map((v, i) => {
              const Icon = valueIcons[v.icon];
              return (
                <Reveal key={v.title} delay={i * 0.08}>
                  <Card className="flex h-full items-start gap-4 p-5">
                    <span className="mt-0.5 rounded-lg border border-line bg-surface2 p-2 text-cyan">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="!text-lg">{v.title}</h3>
                      <p className="mt-1 text-sm text-muted">{v.description}</p>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-8">
            <p className="inline-flex items-center gap-3 rounded-full border border-line bg-surface px-4 py-2 font-mono text-xs text-muted">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
              </span>
              Available for new projects
              <Clock size={14} aria-hidden="true" className="ml-1" />
              {siteConfig.workingHours}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
