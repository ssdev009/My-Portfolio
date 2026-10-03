"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { domainOf, platforms, projects, type Platform, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectThumb } from "./ProjectThumb";

// The popup code is downloaded only when someone opens a project
const ProjectModal = dynamic(() => import("./ProjectModal").then((m) => m.ProjectModal), { ssr: false });

type Filter = "All" | Platform;
const INITIAL_COUNT = 9;

export function Work() {
  const [active, setActive] = useState<Project | null>(null);
  const [everOpened, setEverOpened] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");
  const [showAll, setShowAll] = useState(false);
  const close = useCallback(() => setActive(null), []);
  const openProject = useCallback((project: Project) => {
    setEverOpened(true);
    setActive(project);
  }, []);

  const filters: Filter[] = ["All", ...platforms];
  const counts = useMemo(() => {
    const map: Record<string, number> = { All: projects.length };
    for (const p of platforms) map[p] = projects.filter((x) => x.platform === p).length;
    return map;
  }, []);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.platform === filter);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <Section
      id="work"
      label="Selected Work"
      title="Live projects you can visit today"
      description={`${projects.length} real websites across Shopify, WordPress and ReactJS. Open any card for details, or visit the live site.`}
    >
      {/* Platform filter (scrolls sideways on small screens) */}
      <div
        role="tablist"
        aria-label="Filter projects by platform"
        className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => {
              setFilter(f);
              setShowAll(false);
            }}
            className={cn(
              "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-5 font-heading text-sm font-semibold transition-colors",
              filter === f
                ? "border-cyan bg-cyan text-bg"
                : "border-line bg-surface text-ink hover:border-cyan hover:text-cyan"
            )}
          >
            {f}
            <span className={cn("font-mono text-xs", filter === f ? "text-bg/80" : "text-muted")}>
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 0.06} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-cyan/70 hover:shadow-glow-soft">
              <div
                role="button"
                tabIndex={0}
                onClick={() => openProject(project)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openProject(project);
                  }
                }}
                aria-haspopup="dialog"
                aria-label={`View details for ${project.name}`}
                className="flex flex-1 cursor-pointer flex-col text-left outline-none"
              >
                <div className="relative w-full">
                  <ProjectThumb project={project} index={projects.indexOf(project)} />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/85 px-2.5 py-1 font-mono text-[11px] text-ink backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    {project.platform}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {project.industry && (
                    <p className="font-mono text-xs uppercase tracking-widest text-cyan">{project.industry}</p>
                  )}
                  <h3 className="mt-2 !text-xl">{project.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{project.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="Project Visit"
                  data-track-project={project.name}
                  className="inline-flex min-h-[44px] min-w-0 items-center gap-1.5 font-mono text-xs text-cyan transition-colors hover:text-magenta"
                >
                  <ExternalLink size={14} aria-hidden="true" className="shrink-0" />
                  <span className="truncate">{domainOf(project.url)}</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <button
                  type="button"
                  onClick={() => openProject(project)}
                  className="inline-flex min-h-[44px] shrink-0 items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-cyan"
                >
                  Details
                  <ArrowUpRight size={14} aria-hidden="true" />
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {filtered.length > INITIAL_COUNT && (
        <div className="mt-10 flex justify-center">
          <Button variant="secondary" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
            {showAll ? "Show fewer projects" : `Show all ${filtered.length} projects`}
            <ChevronDown size={18} aria-hidden="true" className={cn("transition-transform", showAll && "rotate-180")} />
          </Button>
        </div>
      )}

      {everOpened && <ProjectModal project={active} onClose={close} />}
    </Section>
  );
}
