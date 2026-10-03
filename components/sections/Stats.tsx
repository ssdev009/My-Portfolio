"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site.config";
import { useReducedEffects } from "@/lib/useReducedEffects";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedEffects();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section id="stats" aria-label="Key numbers" className="py-10">
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {siteConfig.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 bg-surface/90 px-3 py-6 text-center backdrop-blur sm:px-4 sm:py-8"
              >
                <dd className="gradient-text font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="text-sm text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
