import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.brandName} | ${siteConfig.owner}`,
    short_name: siteConfig.brandName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#05060F",
    theme_color: "#05060F",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
