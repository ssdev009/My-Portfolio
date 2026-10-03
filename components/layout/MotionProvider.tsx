"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/** Loads only the animation features we use (smaller bundle). Components use `m.*`. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
