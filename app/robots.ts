// app/robots.ts
// Generates /robots.txt at build time.

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://rabih.app/sitemap.xml",
    host: "https://rabih.app",
  };
}
