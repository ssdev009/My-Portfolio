"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { iconMap } from "@/lib/icons";
import { cn } from "@/lib/utils";

const INITIAL_COUNT = 9;

export function Services() {
  const [showAll, setShowAll] = useState(false);

  return (
    <Section
      id="services"
      label="Services"
      title="Everything Shopify, under one roof"
      description="From a first store to enterprise-scale builds, one partner for the whole journey."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon];
          return (
            <Reveal
              key={service.id}
              delay={(i % 3) * 0.08}
              className={cn(!showAll && i >= INITIAL_COUNT && "hidden")}
            >
              <Card className="group flex h-full flex-col">
                <span className="w-fit rounded-xl border border-line bg-surface2 p-3 text-cyan transition-colors group-hover:border-cyan/60 group-hover:text-magenta">
                  {Icon && <Icon size={24} aria-hidden="true" />}
                </span>
                <h3 className="mt-5 !text-xl">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{service.description}</p>
                <a
                  href={`/?service=${service.id}#contact`}
                  className="mt-5 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-cyan transition-colors hover:text-magenta"
                >
                  Discuss this
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </Card>
            </Reveal>
          );
        })}
      </div>

      {services.length > INITIAL_COUNT && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="secondary"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
          >
            {showAll ? "Show fewer services" : `Show all ${services.length} services`}
            <ChevronDown
              size={18}
              aria-hidden="true"
              className={cn("transition-transform", showAll && "rotate-180")}
            />
          </Button>
        </div>
      )}
    </Section>
  );
}
