import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://theeverydayuniversity.com";
  const now = new Date();

  // Static site routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/episodes`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/classrooms`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamically fetch any podcast episode slugs from Sanity if configured
  try {
    const episodes = await client.fetch<{ slug: { current: string }; _updatedAt?: string }[]>(
      `*[_type == "episode" && defined(slug.current)]{ slug, _updatedAt }`
    );

    const dynamicEpisodeRoutes: MetadataRoute.Sitemap = (episodes || []).map((ep) => ({
      url: `${baseUrl}/episodes/${ep.slug.current}`,
      lastModified: ep._updatedAt ? new Date(ep._updatedAt) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...dynamicEpisodeRoutes];
  } catch {
    // If Sanity query fails (e.g. offline/building), return all static routes
    return staticRoutes;
  }
}
