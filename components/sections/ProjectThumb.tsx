"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site.config";
import type { Project } from "@/data/projects";
import { domainOf } from "@/data/projects";

const gradients = [
  "linear-gradient(135deg, rgb(var(--c-cyan) / .35), rgb(var(--c-violet) / .35))",
  "linear-gradient(135deg, rgb(var(--c-magenta) / .35), rgb(var(--c-violet) / .35))",
  "linear-gradient(135deg, rgb(var(--c-cyan) / .3), rgb(var(--c-magenta) / .3))",
];

/** Free live-screenshot service. If it ever fails, the mockup below is shown instead. */
function screenshotUrl(url: string) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=750`;
}

/**
 * Preview image for a project, in this order:
 * 1) local screenshot (project.image)  2) live screenshot  3) neon browser mockup.
 */
export function ProjectThumb({ project, index }: { project: Project; index: number }) {
  const [failed, setFailed] = useState(false);

  const src =
    project.image ||
    (siteConfig.liveScreenshots && !project.noScreenshot ? screenshotUrl(project.url) : "");

  if (src && !failed) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${project.name} website preview`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden"
      style={{ background: gradients[index % gradients.length] }}
      aria-hidden="true"
    >
      <div className="absolute inset-3 flex flex-col overflow-hidden rounded-lg border border-line bg-bg/80 backdrop-blur-sm sm:inset-4">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-danger/80" />
          <span className="h-2 w-2 rounded-full bg-shopify/80" />
          <span className="h-2 w-2 rounded-full bg-success/80" />
          <span className="ml-3 truncate font-mono text-[10px] text-muted">{domainOf(project.url)}</span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <div className="h-3 w-1/2 rounded bg-cyan/60" />
          <div className="h-2 w-3/4 rounded bg-line" />
          <div className="mt-1 grid flex-1 grid-cols-3 gap-2">
            <div className="rounded bg-surface2" />
            <div className="rounded bg-surface2" />
            <div className="rounded bg-surface2" />
          </div>
        </div>
      </div>
      <span className="absolute bottom-3 right-4 font-heading text-lg font-bold text-ink/90">
        {project.name}
      </span>
    </div>
  );
}
