"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { domainOf, projects, type Project } from "@/data/projects";
import { ProjectThumb } from "./ProjectThumb";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Project detail dialog: Esc to close, focus trapped, background scroll locked. */
export function ProjectModal({ project, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!project) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  if (!mounted) return null;

  const index = project ? projects.findIndex((p) => p.slug === project.slug) : 0;

  return createPortal(
    <AnimatePresence>
      {project && (
        <m.div
          key="project-modal"
          className="fixed inset-0 z-[70] flex items-end justify-center bg-bg/80 p-0 backdrop-blur-md sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-surface shadow-glow-soft sm:rounded-3xl"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg/80 text-ink backdrop-blur transition-colors hover:border-cyan hover:text-cyan"
            >
              <X size={18} />
            </button>

            <ProjectThumb project={project} index={index} />

            <div className="space-y-6 p-5 sm:space-y-8 sm:p-8">
              <header>
                <div className="flex flex-wrap items-center gap-2">
                  <Chip className="border-cyan/50 text-cyan">{project.platform}</Chip>
                  {project.industry && (
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">
                      {project.industry}
                    </span>
                  )}
                </div>
                <h2 id="project-modal-title" className="mt-3 !text-2xl sm:!text-3xl">
                  {project.name}
                </h2>
                <p className="mt-1 font-mono text-sm text-cyan">{domainOf(project.url)}</p>
                <p className="mt-3 text-muted">{project.summary}</p>
              </header>

              {project.results && project.results.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-3">
                  {project.results.map((r) => (
                    <div key={r.label} className="rounded-xl border border-line bg-surface2 p-4 text-center">
                      <p className="gradient-text font-heading text-2xl font-bold">{r.value}</p>
                      <p className="mt-1 text-xs text-muted">{r.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {(project.challenge || project.solution) && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {project.challenge && (
                    <div>
                      <h3 className="font-mono !text-sm uppercase tracking-widest text-magenta">The challenge</h3>
                      <p className="mt-2 text-sm text-muted">{project.challenge}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div>
                      <h3 className="font-mono !text-sm uppercase tracking-widest text-magenta">What we built</h3>
                      <p className="mt-2 text-sm text-muted">{project.solution}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {[...(project.tech ?? []), ...project.tags].map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:flex-wrap">
                <Button href={project.url} data-track="Project Visit" data-track-project={project.name} className="w-full sm:w-auto">
                  Visit live site
                  <ExternalLink size={16} aria-hidden="true" />
                </Button>
                <Button href="#contact" variant="secondary" onClick={onClose} className="w-full sm:w-auto">
                  Start a similar project
                </Button>
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
