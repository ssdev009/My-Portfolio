"use client";

import { Pause, Play, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useReducedEffects } from "@/lib/useReducedEffects";
import { cn } from "@/lib/utils";

const KEY = "sv-reduced-effects";

interface Props {
  /** "compact" = small "Pause animations" button (used in the hero). Default = footer pill. */
  variant?: "default" | "compact";
  className?: string;
}

/**
 * Lets visitors stop glow + motion (WCAG 2.2.2 "Pause, Stop, Hide").
 * State comes from the shared hook, so every instance stays in sync.
 * The saved choice is applied before first paint by the script in app/layout.tsx.
 */
export function EffectsToggle({ variant = "default", className }: Props) {
  const reduced = useReducedEffects();

  function toggle() {
    const next = document.documentElement.dataset.reduced !== "true";
    document.documentElement.dataset.reduced = String(next);
    try {
      localStorage.setItem(KEY, String(next));
    } catch {
      /* storage unavailable */
    }
    trackEvent("Reduce Motion Toggle", { enabled: next });
  }

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-pressed={reduced}
        className={cn(
          "inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-bg/70 px-4 font-mono text-xs text-muted backdrop-blur transition-colors hover:border-cyan hover:text-cyan",
          reduced && "border-magenta text-magenta",
          className
        )}
      >
        {reduced ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        Pause animations
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={reduced}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 font-mono text-xs transition-colors",
        reduced
          ? "border-magenta text-magenta"
          : "border-line text-muted hover:border-cyan hover:text-cyan",
        className
      )}
    >
      <Sparkles size={14} aria-hidden="true" />
      Reduce glow &amp; motion
    </button>
  );
}
