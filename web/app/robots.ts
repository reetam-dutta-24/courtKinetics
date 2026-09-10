import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/sessions", "/dashboard", "/upload", "/api/"],
      },
    ],
    sitemap: "https://courtkinetics.vercel.app/sitemap.xml",
  };
}