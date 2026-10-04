"use client";

import { useEffect, useState } from "react";
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
  const [loaded, setLoaded] = useState(false);

  const src =
    project.image ||
    (siteConfig.liveScreenshots && !project.noScreenshot ? screenshotUrl(project.url) : "");

  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [src]);

  const imageVisibility = loaded ? "opacity-100" : "opacity-0";

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden bg-surface2 sm:aspect-[16/10]"
      style={{ background: gradients[index % gradients.length] }}
    >
      <div
        className="absolute inset-2 flex flex-col overflow-hidden rounded-lg border border-line bg-bg/80 backdrop-blur-sm sm:inset-4"
        aria-hidden="true"
      >
        <div className="flex min-w-0 items-center gap-1.5 border-b border-line px-2 py-2 sm:px-3">
          <span className="h-2 w-2 rounded-full bg-danger/80" />
          <span className="h-2 w-2 rounded-full bg-shopify/80" />
          <span className="h-2 w-2 rounded-full bg-success/80" />
          <span className="ml-1 min-w-0 truncate font-mono text-[10px] text-muted sm:ml-2">
            {domainOf(project.url)}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-2 sm:p-3">
          <div className="h-3 w-1/2 rounded bg-cyan/60" />
          <div className="h-2 w-3/4 rounded bg-line" />
          <div className="mt-1 grid flex-1 grid-cols-3 gap-2">
            <div className="rounded bg-surface2" />
            <div className="rounded bg-surface2" />
            <div className="rounded bg-surface2" />
          </div>
        </div>
      </div>
      <span
        className="absolute bottom-3 right-3 max-w-[calc(100%-1.5rem)] truncate font-heading text-sm font-bold text-ink/90 sm:right-4 sm:text-lg"
        aria-hidden="true"
      >
        {project.name}
      </span>
      {src && !failed && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={`${project.name} website preview`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${imageVisibility}`}
        />
      )}
    </div>
  );
}
