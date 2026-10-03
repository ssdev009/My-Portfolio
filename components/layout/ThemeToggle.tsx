"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { cn } from "@/lib/utils";

interface Props {
  /** "icon" = compact round button (navbar). "row" = full-width button with a text label (mobile menu). */
  variant?: "icon" | "row";
  className?: string;
}

/**
 * Both icons are always rendered and shown/hidden with CSS from <html data-theme>,
 * so the server HTML and the first client render always match.
 */
export function ThemeToggle({ variant = "icon", className }: Props) {
  const { theme, toggle } = useTheme();
  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  const icons = (
    <>
      <Sun size={18} aria-hidden="true" className="hidden [html[data-theme=dark]_&]:block" />
      <Moon size={18} aria-hidden="true" className="[html[data-theme=dark]_&]:hidden" />
    </>
  );

  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-ink transition-colors hover:bg-surface hover:text-cyan",
          className
        )}
      >
        {icons}
        <span className="hidden [html[data-theme=dark]_&]:inline">Light theme</span>
        <span className="[html[data-theme=dark]_&]:hidden">Dark theme</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface/60 text-ink",
        "transition-colors hover:border-cyan hover:text-cyan",
        className
      )}
    >
      {icons}
    </button>
  );
}
