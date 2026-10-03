"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * One delegated click listener that records the actions that matter:
 * WhatsApp, email, social, booking, "contact" buttons and project visits.
 * Any element can also opt in with data-track="Event Name" (+ data-track-* props).
 */
export function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest<HTMLElement>("a[href], [data-track]");
      if (!el) return;

      const href = el.getAttribute("href") ?? "";
      const label = (el.getAttribute("aria-label") ?? el.textContent ?? "").trim().slice(0, 50);
      const explicit = el.dataset.track;

      if (explicit) {
        const props: Record<string, string> = {};
        for (const [key, value] of Object.entries(el.dataset)) {
          if (key.startsWith("track") && key !== "track" && value) {
            const name = key.slice(5);
            props[name.charAt(0).toLowerCase() + name.slice(1)] = value;
          }
        }
        trackEvent(explicit, props);
        return;
      }

      if (href.includes("wa.me")) trackEvent("WhatsApp Click", { label });
      else if (href.startsWith("mailto:")) trackEvent("Email Click");
      else if (href.startsWith("tel:")) trackEvent("Phone Click");
      else if (/cal\.com|calendly\.com/.test(href)) trackEvent("Booking Click");
      else if (/upwork\.com|linkedin\.com|github\.com|fiverr\.com|instagram\.com/.test(href)) {
        trackEvent("Social Click", { network: new URL(href, window.location.href).hostname.replace("www.", "") });
      } else if (href.includes("#contact")) trackEvent("Contact CTA Click", { label });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
