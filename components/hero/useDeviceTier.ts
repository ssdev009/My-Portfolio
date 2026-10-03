"use client";

import { useEffect, useState } from "react";

export type Tier = "low" | "mid" | "high";

export interface DeviceInfo {
  /** false until the first client-side detection finishes (avoids hydration mismatch) */
  ready: boolean;
  webgl: boolean;
  /** OS reduced-motion OR the site's "Reduce glow & motion" toggle */
  reducedMotion: boolean;
  /** touch-first device (no hover pointer) */
  coarse: boolean;
  tier: Tier;
}

const INITIAL: DeviceInfo = {
  ready: false,
  webgl: false,
  reducedMotion: false,
  coarse: false,
  tier: "low",
};

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      (canvas.getContext("webgl2") as WebGL2RenderingContext | null) ||
      (canvas.getContext("webgl") as WebGLRenderingContext | null);
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

function detectTier(coarse: boolean): Tier {
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  if (memory <= 2 || cores <= 2) return "low";
  if (coarse || window.innerWidth < 768 || cores <= 4) return "mid";
  return "high";
}

/** Detects WebGL support, motion preference and a quality tier for the 3D hero. */
export function useDeviceTier(): DeviceInfo {
  const [info, setInfo] = useState<DeviceInfo>(INITIAL);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");

    const readReduced = () =>
      motionQuery.matches ||
      document.documentElement.dataset.reduced === "true";

    setInfo({
      ready: true,
      webgl: hasWebGL(),
      reducedMotion: readReduced(),
      coarse: coarseQuery.matches,
      tier: detectTier(coarseQuery.matches),
    });

    const update = () =>
      setInfo((prev) => ({ ...prev, reducedMotion: readReduced() }));

    motionQuery.addEventListener("change", update);
    // React to the footer "Reduce glow & motion" toggle
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-reduced"],
    });

    return () => {
      motionQuery.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  return info;
}
