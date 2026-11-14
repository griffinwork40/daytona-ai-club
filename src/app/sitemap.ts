import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { events } from "@/content/events";

/** Every public route. Event pages are added from the event data. */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteUrl();
  const pages = ["", "/events", "/about", "/speak"];
  return [
    ...pages.map((path) => ({
      url: `${origin}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...events.map((event) => ({
      url: `${origin}/events/${event.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
