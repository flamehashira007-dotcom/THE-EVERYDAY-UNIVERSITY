import React from "react";
import { ClassroomsClient, type ClassroomEpisode } from "@/components/classrooms";
import { client } from "@/sanity/lib/client";
import { VIDEOS_QUERY, type SanityVideo } from "@/sanity/lib/queries";
import { extractYouTubeId } from "@/lib/youtube";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ClassroomsPage() {
  let initialEpisodes: ClassroomEpisode[] = [];

  try {
    const data = await client.fetch<SanityVideo[]>(VIDEOS_QUERY);
    if (data && data.length > 0) {
      initialEpisodes = data.map((item, idx) => {
        const yId = extractYouTubeId(item.youtubeUrl);
        return {
          id: item._id || `sanity-${idx}`,
          youtubeId: yId,
          title: item.title || "The Everyday Classroom",
          podcast: item.podcast || "The Everyday University",
          date: item.date || `Episode ${data.length - idx}`,
          duration: item.duration || "Full Episode",
          thumbnail:
            item.thumbnailUrl ||
            (yId
              ? `https://i.ytimg.com/vi/${yId}/maxresdefault.jpg`
              : "/card-compressed.avif"),
          category: "Leadership",
          description: "Explore actionable masterclass wisdom from this podcast episode.",
          publishedAt: item.publishedAt,
        };
      });
    }
  } catch (err) {
    console.error("Failed to load sanity videos on server:", err);
  }

  return <ClassroomsClient initialEpisodes={initialEpisodes} />;
}


