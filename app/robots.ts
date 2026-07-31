import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://unitedtireschico.com/sitemap.xml",
    host: "https://unitedtireschico.com",
  };
}
