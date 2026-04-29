import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/private/",
        "/*.json$",
        "/_next/",
      ],
    },
    sitemap: "https://beydigitalmedia.com/sitemap.xml",
    host: "https://beydigitalmedia.com",
  };
}
