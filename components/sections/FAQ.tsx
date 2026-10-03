"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { faq } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      label="FAQ"
      title="Questions, answered"
      description="Can't find what you need? Message me directly and I'll reply fast."
    >
      <div className="max-w-3xl space-y-3">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.question} delay={i * 0.05}>
              <div
                className={cn(
                  "rounded-2xl border bg-surface transition-colors",
                  isOpen ? "border-cyan/60" : "border-line"
                )}
              >
                <h3 className="!text-base">
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-heading font-semibold"
                  >
                    {item.question}
                    <Plus
                      size={20}
                      aria-hidden="true"
                      className={cn(
                        "shrink-0 text-cyan transition-transform duration-300",
                        isOpen && "rotate-45"
                      )}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-muted">{item.answer}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
