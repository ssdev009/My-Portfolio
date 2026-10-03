"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EffectsToggle } from "@/components/layout/EffectsToggle";
import { useTheme } from "@/components/layout/ThemeProvider";
import { siteConfig } from "@/data/site.config";
import { HeroFallback, HeroLoader } from "./HeroFallback";
import { useDeviceTier } from "./useDeviceTier";

// The 3D bundle loads only on the client, so it never blocks the headline (LCP).
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => <HeroLoader />,
});

const HIGHLIGHT_WORDS = 4;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function HeroSection() {
  const { hero } = siteConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const { ready, webgl, reducedMotion, coarse, tier } = useDeviceTier();
  const { theme } = useTheme();
  const [inView, setInView] = useState(true);
  // Mount the heavy 3D scene only once the browser is idle, so text and buttons paint first
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const start = () => setIdle(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    // Safari fallback (no requestIdleCallback)
    const timer = window.setTimeout(start, 400);
    return () => window.clearTimeout(timer);
  }, []);

  // Pause rendering when the hero is off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.02 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scene fades and shrinks slightly as the hero scrolls away
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const mode = !ready ? "loading" : webgl && !reducedMotion ? (idle ? "3d" : "loading") : "static";

  const words = hero.headline.split(" ");
  const lead = words.slice(0, -HIGHLIGHT_WORDS).join(" ");
  const highlight = words.slice(-HIGHLIGHT_WORDS).join(" ");

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden"
    >
      {/* 3D scene (decorative) */}
      <m.div
        aria-hidden="true"
        style={{ opacity: sceneOpacity, scale: sceneScale }}
        className="absolute inset-x-0 top-0 -z-10 h-[54svh] [mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_78%,transparent)] lg:inset-0 lg:h-auto"
      >
        {mode === "3d" && (
          <HeroCanvas
            tier={tier}
            theme={theme}
            coarse={coarse}
            inView={inView}
            eventSource={sectionRef}
          />
        )}
        {mode === "static" && <HeroFallback />}
        {mode === "loading" && <HeroLoader />}
      </m.div>

      {/* Text (renders immediately, independent of 3D) */}
      <Container className="relative z-10 flex min-h-[calc(100svh-4rem)] items-center pb-20 pt-[46svh] lg:pt-0">
        <m.div
          variants={container}
          initial={reducedMotion ? false : "hidden"}
          animate="show"
          className="max-w-2xl lg:max-w-xl xl:max-w-2xl"
        >
          <m.div variants={item}>
            <SectionLabel>{hero.eyebrow}</SectionLabel>
          </m.div>

          <m.h1
            variants={item}
            className="mt-6 !text-[clamp(2.25rem,5vw,4.25rem)]"
          >
            {lead}{" "}
            <span className="gradient-text text-glow-cyan">{highlight}</span>
          </m.h1>

          <m.p variants={item} className="mt-6 max-w-xl text-lg text-muted">
            {hero.subheadline}
          </m.p>

          <m.div variants={item} className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href={hero.primaryCta.href} size="lg" className="w-full sm:w-auto">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg" className="w-full sm:w-auto">
              {hero.secondaryCta.label}
            </Button>
          </m.div>

          <m.p
            variants={item}
            className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted sm:mt-8 sm:text-xs"
          >
            {hero.trustLine}
          </m.p>
        </m.div>
      </Container>

      <div className="absolute bottom-3 left-4 z-10 sm:bottom-6 sm:left-6">
        <EffectsToggle variant="compact" />
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-cyan md:block"
      >
        <ChevronDown className="animate-bounce" size={28} />
      </a>
    </section>
  );
}
