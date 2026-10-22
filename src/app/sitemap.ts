import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { cities } from "@/content/cities";
import { events } from "@/content/events";
import { products } from "@/content/tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/marketplace", "/marketplace/community", "/marketplace/services", "/marketplace/swag", "/events", "/tech", "/tech/ai-software", "/tech/robotics", "/tech/physical-ai", "/tech/lab", "/tech/developers", "/locations", "/join"];
  return [
    ...staticRoutes.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...cities.map((c) => ({ url: `${site.url}/chapters/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...events.map((e) => ({ url: `${site.url}/events/${e.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...products.map((p) => ({ url: `${site.url}/tech/ai-software/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
