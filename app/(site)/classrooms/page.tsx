import React from "react";
import type { Metadata } from "next";
import { ClassroomsClient, type ClassroomEpisode } from "@/components/classrooms";
import { client } from "@/sanity/lib/client";
import { VIDEOS_QUERY, type SanityVideo } from "@/sanity/lib/queries";
import { extractYouTubeId } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Classrooms Without Walls",
  description:
    "Explore masterclasses, video lessons, and deep-dive wisdom extracted from every episode of The Everyday University podcast.",
  openGraph: {
    title: "Classrooms Without Walls | The Everyday University",
    description:
      "Explore masterclasses and life lessons from every episode.",
  },
};

export const revalidate = 60; // Revalidate every 60 seconds

function resolveCategory(item: { title?: string; category?: string; department?: string }, idx: number) {
  if (item.department) {
    const dep = item.department.toLowerCase();
    if (dep === "business" || dep.includes("business")) return { department: "business", label: "Business & Entrepreneurship" };
    if (dep === "resilience" || dep.includes("resilience")) return { department: "resilience", label: "Resilience" };
    if (dep === "arts-culture" || dep.includes("art") || dep.includes("culture")) return { department: "arts-culture", label: "Arts & Storytelling" };
  }

  if (item.category) {
    const cat = item.category.toLowerCase();
    if (cat.includes("business") || cat.includes("entrepreneur") || cat.includes("invest")) return { department: "business", label: "Business & Entrepreneurship" };
    if (cat.includes("resilience") || cat.includes("growth") || cat.includes("adversity") || cat.includes("life")) return { department: "resilience", label: "Resilience" };
    if (cat.includes("art") || cat.includes("story") || cat.includes("culture") || cat.includes("creative")) return { department: "arts-culture", label: "Arts & Storytelling" };
    return { department: item.category, label: item.category };
  }

  const title = (item.title || "").toLowerCase();
  if (/purpose|marriage|autism|roots|identity|legacy|sacrifice|smile|teeth|extraction|powerhouse|struggle|fail|pain|resilience|overcome|survive|tough|mindset|courage|loss|grief|health|discipline|action|psychology|journey/i.test(title)) {
    return { department: "resilience", label: "Resilience" };
  }
  if (/business|money|invest|finance|startup|company|career|scale|sales|entrepreneur|ceo|build|strategy|market|product|commission|real estate|realtor|pharmacist|smart money|tech/i.test(title)) {
    return { department: "business", label: "Business & Entrepreneurship" };
  }
  if (/art|creative|film|story|music|design|culture|actor|author|podcast|creator|vision|media|comedian|comedy|fashion|crafting|style|menswear/i.test(title)) {
    return { department: "arts-culture", label: "Arts & Storytelling" };
  }

  const fallbackList = [
    { department: "business", label: "Business & Entrepreneurship" },
    { department: "resilience", label: "Resilience" },
    { department: "arts-culture", label: "Arts & Storytelling" },
  ];
  return fallbackList[idx % fallbackList.length];
}

export default async function ClassroomsPage() {
  let initialEpisodes: ClassroomEpisode[] = [];

  try {
    const data = await client.fetch<SanityVideo[]>(VIDEOS_QUERY);
    if (data && data.length > 0) {
      initialEpisodes = data.map((item, idx) => {
        const yId = extractYouTubeId(item.youtubeUrl);
        const catInfo = resolveCategory(item, idx);
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
          category: catInfo.label,
          department: catInfo.department,
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


