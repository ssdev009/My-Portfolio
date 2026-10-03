/** Static neon bag (no WebGL / reduced motion) and the loading glow. Theme-aware via CSS variables. */

export function HeroFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 300 300"
        className="h-[70%] max-h-[420px] animate-float drop-shadow-[0_0_18px_rgb(var(--c-cyan)/0.5)] lg:ml-[40%]"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="fb-grad" x1="0" y1="0" x2="300" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "rgb(var(--c-cyan))" }} />
            <stop offset="0.5" style={{ stopColor: "rgb(var(--c-violet))" }} />
            <stop offset="1" style={{ stopColor: "rgb(var(--c-magenta))" }} />
          </linearGradient>
        </defs>
        <polygon points="90,110 210,110 228,250 72,250" stroke="url(#fb-grad)" strokeWidth="3" className="fill-surface2" />
        <path d="M120 110C120 55 180 55 180 110" strokeWidth="4" strokeLinecap="round" className="stroke-magenta" />
        <polygon points="160,138 126,194 150,194 140,232 178,172 154,172" className="fill-magenta" />
        <ellipse cx="150" cy="268" rx="90" ry="10" strokeWidth="2" className="stroke-cyan" strokeOpacity="0.6" />
      </svg>
    </div>
  );
}

export function HeroLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse-glow rounded-full bg-cyan/20 blur-3xl lg:ml-[40%]" />
    </div>
  );
}
