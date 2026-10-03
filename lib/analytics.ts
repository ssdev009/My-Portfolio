type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
  }
}

/** Sends a custom event to Plausible (no-op when analytics is not configured). */
export function trackEvent(name: string, props?: Props) {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(name, props ? { props } : undefined);
  } catch {
    /* never let analytics break the page */
  }
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, props ?? "");
  }
}
