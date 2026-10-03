import Link from "next/link";
import { siteConfig } from "@/data/site.config";
import { cn } from "@/lib/utils";

/** Default placeholder logo (bolt mark + wordmark). Swap for a real logo later. */
export function Logo({ className, idSuffix = "nav" }: { className?: string; idSuffix?: string }) {
  // SVG ids must be unique per page, and the logo appears in both navbar and footer
  const gradId = `logo-grad-${idSuffix}`;
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.brandName} home`}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#00F0FF" />
            <stop offset="0.5" stopColor="#7A5CFF" />
            <stop offset="1" stopColor="#FF2BD6" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="30" height="30" rx="8" fill="#05060F" stroke={`url(#${gradId})`} strokeWidth="1.5" />
        <path d="M18.5 5 9 18h6l-1.5 9L23 14h-6l1.5-9Z" fill={`url(#${gradId})`} />
      </svg>
      <span className="gradient-text truncate font-heading text-lg font-bold uppercase tracking-wide sm:text-xl">
        {siteConfig.brandName}
      </span>
    </Link>
  );
}
