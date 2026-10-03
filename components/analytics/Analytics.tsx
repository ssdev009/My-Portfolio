import Script from "next/script";

/**
 * Privacy-friendly, cookie-free analytics (Plausible). Nothing loads until
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set, so there is no tracking by default.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";

  return (
    <>
      {/* queues custom events fired before the main script finishes loading */}
      <Script id="plausible-stub" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
      </Script>
      <Script defer data-domain={domain} src={src} strategy="afterInteractive" />
    </>
  );
}
