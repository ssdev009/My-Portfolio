"use client";

import { m } from "framer-motion";
import { useReducedEffects } from "@/lib/useReducedEffects";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Fade + rise on first scroll into view. Plain div when effects are reduced. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduced = useReducedEffects();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}
