import type { Metadata, Viewport } from "next";
import { preconnect } from "react-dom";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { BackgroundGrid } from "@/components/layout/BackgroundGrid";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Analytics } from "@/components/analytics/Analytics";
import { TrackClicks } from "@/components/analytics/TrackClicks";
import { siteConfig } from "@/data/site.config";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const title = `${siteConfig.owner} | Shopify Developer & ${siteConfig.brandName}`;
const description =
  "Hire Muhammad Shahzad, a Shopify, WordPress and React developer with 5+ years of experience. Custom themes, apps, migrations and speed optimization.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${siteConfig.brandName}` },
  description,
  applicationName: siteConfig.brandName,
  keywords: [
    "Shopify developer",
    "hire Shopify developer",
    "Shopify expert",
    "Shopify theme development",
    "Shopify app development",
    "Shopify migration",
    "Shopify speed optimization",
    "WordPress developer",
    "React developer",
    "Muhammad Shahzad",
  ],
  authors: [{ name: siteConfig.owner, url: siteConfig.url }],
  creator: siteConfig.owner,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.brandName,
    title,
    description,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#05060F",
};

/** Runs before first paint so the saved theme is applied with no flash. */
const themeScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem("sv-theme");if(t==="light"||t==="dark"){d.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m){m.setAttribute("content",t==="light"?"#F4F6FF":"#05060F");}}if(localStorage.getItem("sv-reduced-effects")==="true"){d.dataset.reduced="true";}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Warm up the connection used for live project screenshots
  preconnect("https://s.wordpress.com");

  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${heading.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`[style*="opacity: 0"],[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <ThemeProvider>
          <MotionProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-cyan focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <BackgroundGrid />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
          </MotionProvider>
          <TrackClicks />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
