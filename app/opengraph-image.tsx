import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site.config";

export const alt = `${siteConfig.brandName} | Shopify, WordPress and React developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const host = siteConfig.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#05060f",
          backgroundImage:
            "radial-gradient(circle at 12% 8%, rgba(0,240,255,0.30), transparent 45%), radial-gradient(circle at 92% 96%, rgba(255,43,214,0.30), transparent 45%)",
          color: "#e8ecff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
            <rect x="1" y="1" width="30" height="30" rx="8" fill="#05060f" stroke="#00f0ff" strokeWidth="1.5" />
            <path d="M18.5 5 9 18h6l-1.5 9L23 14h-6l1.5-9Z" fill="#ff2bd6" />
          </svg>
          <div style={{ display: "flex", marginLeft: 20, fontSize: 40, fontWeight: 700, letterSpacing: 2, color: "#00f0ff" }}>
            {siteConfig.brandName.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Shopify stores that convert.
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: "#ff2bd6" }}>
            Built fast.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#8a93b8" }}>
            {siteConfig.owner} · Shopify · WordPress · React · 5+ years
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: "100%", height: 6, backgroundImage: "linear-gradient(90deg, #00f0ff, #7a5cff, #ff2bd6)" }} />
          <div style={{ display: "flex", marginTop: 20, fontSize: 28, color: "#8a93b8" }}>{host}</div>
        </div>
      </div>
    ),
    size
  );
}
