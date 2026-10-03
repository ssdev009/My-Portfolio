import type { Config } from "tailwindcss";

/** Colors come from CSS variables (see app/globals.css) so dark/light themes can swap them. */
const c = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: c("bg"),
        surface: c("surface"),
        surface2: c("surface2"),
        line: c("line"),
        cyan: c("cyan"),
        magenta: c("magenta"),
        violet: c("violet"),
        shopify: c("shopify"),
        ink: c("ink"),
        muted: c("muted"),
        success: c("success"),
        danger: c("danger"),
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "neon-gradient":
          "linear-gradient(90deg, rgb(var(--c-cyan)) 0%, rgb(var(--c-violet)) 50%, rgb(var(--c-magenta)) 100%)",
      },
      boxShadow: {
        "glow-cyan": "var(--shadow-cyan)",
        "glow-magenta": "var(--shadow-magenta)",
        "glow-soft": "var(--shadow-soft)",
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.95)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        marquee: "marquee 45s linear infinite",
        "marquee-reverse": "marquee-reverse 55s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
