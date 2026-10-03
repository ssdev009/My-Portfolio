"use client";

import { trackEvent } from "@/lib/analytics";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "dark" | "light";
export const THEME_KEY = "sv-theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
  toggle: () => {},
});

/**
 * Keeps the current theme in React state (for components like the 3D hero) and
 * on <html data-theme>. The very first paint is handled by an inline script in
 * app/layout.tsx so there is no flash of the wrong theme.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    setThemeState(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const setTheme = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "light" ? "#F4F6FF" : "#05060F");
    setThemeState(next);
    trackEvent("Theme Toggle", { theme: next });
    window.setTimeout(() => root.classList.remove("theme-transition"), 350);
  }, []);

  const toggle = useCallback(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
  }, [setTheme]);

  const value = useMemo(() => ({ theme, setTheme, toggle }), [theme, setTheme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
