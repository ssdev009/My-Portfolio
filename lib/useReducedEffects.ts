"use client";

import { useEffect, useState } from "react";

/**
 * True when the visitor prefers reduced motion (OS setting) OR turned on the
 * site's "Reduce glow & motion" toggle. Starts false so server and client match.
 */
export function useReducedEffects(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setReduced(
        query.matches || document.documentElement.dataset.reduced === "true"
      );

    update();
    query.addEventListener("change", update);
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-reduced"],
    });

    return () => {
      query.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  return reduced;
}
