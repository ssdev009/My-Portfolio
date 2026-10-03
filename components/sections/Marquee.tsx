"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const list = (duplicate: boolean) =>
    items.map((name) => (
      <li
        key={`${name}-${duplicate}`}
        aria-hidden={duplicate || undefined}
        className={duplicate ? "marquee-dup" : undefined}
      >
        <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-4 py-2 font-mono text-sm text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
          {name}
        </span>
      </li>
    ));

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <ul
        className={cn(
          "marquee-track flex w-max gap-3 [animation-play-state:var(--marquee-state,running)]",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {list(false)}
        {list(true)}
      </ul>
    </div>
  );
}

/** Two scrolling rows of technologies with a keyboard-accessible pause button. */
export function Marquee({ rowA, rowB }: { rowA: string[]; rowB: string[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      style={paused ? ({ "--marquee-state": "paused" } as React.CSSProperties) : undefined}
      className="hover:[--marquee-state:paused]"
    >
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line px-4 font-mono text-xs text-muted transition-colors hover:border-cyan hover:text-cyan"
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          Pause scrolling
        </button>
      </div>
      <div className="space-y-3">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </div>
  );
}
