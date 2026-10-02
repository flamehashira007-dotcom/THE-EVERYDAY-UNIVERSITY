"use client";

import React, { useState, useEffect } from "react";
import {
  ClassroomHero,
  ClassroomPillars,
  ClassroomFeed,
  ClassroomQuotes,
  ClassroomSpotlight,
  type PillarId,
  type ClassroomEpisode,
} from "@/components/classrooms";
import ClassroomModal from "./ClassroomModal";
import ContactCalEmbed from "@/components/contact/ContactCalEmbed";
import ContactModal from "@/components/ContactModal";
import { client } from "@/sanity/lib/client";
import { VIDEOS_QUERY, type SanityVideo } from "@/sanity/lib/queries";
import { extractYouTubeId } from "@/lib/youtube";

interface ClassroomsClientProps {
  initialEpisodes: ClassroomEpisode[];
}

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

export default function ClassroomsClient({
  initialEpisodes,
}: ClassroomsClientProps) {
  const [episodes, setEpisodes] = useState<ClassroomEpisode[]>(initialEpisodes || []);
  const [activePillar, setActivePillar] = useState<PillarId>("all");

  // Keep state synchronized when server delivers fresh initialEpisodes
  useEffect(() => {
    if (initialEpisodes && initialEpisodes.length > 0) {
      setEpisodes(initialEpisodes);
    }
  }, [initialEpisodes]);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    videoUrl: string;
    title: string;
  }>({
    isOpen: false,
    videoUrl: "",
    title: "",
  });

  // Background refresh from Sanity if needed
  useEffect(() => {
    async function loadSanityVideos() {
      try {
        const data = await client.fetch<SanityVideo[]>(VIDEOS_QUERY);
        if (data && data.length > 0) {
          const mapped: ClassroomEpisode[] = data.map((item, idx) => {
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

          setEpisodes(mapped);
        }
      } catch (err) {
        console.error("Failed to refresh sanity videos on classroom page:", err);
      }
    }

    // Only background refresh if initial was empty
    if (!initialEpisodes || initialEpisodes.length === 0) {
      loadSanityVideos();
    }
  }, [initialEpisodes]);

  const handlePlayVideo = (videoUrl: string, title: string) => {
    setModalState({
      isOpen: true,
      videoUrl,
      title,
    });
  };

  const featuredEpisode = episodes[0] || initialEpisodes[0];

  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* 1. Hero Section / Featured Episode Spotlight */}
      <ClassroomHero
        featuredEpisode={featuredEpisode}
        onPlayVideo={handlePlayVideo}
      />

      {/* 2. Series Pillars & Tabs Switcher */}
      <ClassroomPillars
        activePillar={activePillar}
        onSelectPillar={setActivePillar}
      />

      {/* 3. Search, Filters, View Modes & Episode Feed Cards */}
      <ClassroomFeed
        episodes={episodes}
        activePillar={activePillar}
        onSelectPillar={setActivePillar}
        onPlayVideo={handlePlayVideo}
      />

      {/* 4. Live Booking Strategy Call Scheduler */}
      <ContactCalEmbed />

      {/* 5. Interactive YouTube Video Player Modal */}
      <ClassroomModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, videoUrl: "", title: "" })}
        videoUrl={modalState.videoUrl}
        title={modalState.title}
      />

      {/* 6. Global Contact Modal */}
      <ContactModal />
    </main>
  );
}
