"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { siteConfig } from "@/data/site.config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section currently in the middle of the screen
  useEffect(() => {
    const ids = ["home", ...siteConfig.nav.map((n) => n.href.slice(1))];
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "home" ? "" : entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Close the mobile menu on Escape, and when the viewport grows to desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-line bg-bg/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-3 px-4 sm:px-6"
      >
        <Logo className="min-w-0 shrink" />

        <ul className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active === item.href.slice(1) ? "true" : undefined}
                className={cn(
                  "font-body text-sm transition-colors hover:text-cyan",
                  active === item.href.slice(1) ? "text-cyan" : "text-muted"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Button href="#contact" size="sm" className="hidden sm:inline-flex">
            Book a Call
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface/60 text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-line lg:hidden"
          >
            <ul className="mx-auto flex max-w-content flex-col gap-1 px-4 py-4 sm:px-6">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.href.slice(1) ? "true" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-3 transition-colors hover:bg-surface hover:text-cyan",
                      active === item.href.slice(1) ? "text-cyan" : "text-ink"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <ThemeToggle variant="row" />
              </li>
              <li className="pt-2">
                <Button href="#contact" className="w-full" onClick={() => setOpen(false)}>
                  Book a Call
                </Button>
              </li>
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
