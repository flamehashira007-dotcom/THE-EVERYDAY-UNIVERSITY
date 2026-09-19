"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";

interface ClassroomHeroProps {
  featuredEpisode?: {
    id: string;
    youtubeId: string;
    title: string;
    podcast: string;
    date: string;
    duration: string;
    thumbnail: string;
    hostImage?: string;
    description?: string;
    category?: string;
  };
  onPlayVideo: (videoUrl: string, title: string) => void;
}

export default function ClassroomHero({
  featuredEpisode,
  onPlayVideo,
}: ClassroomHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  const episode = featuredEpisode || {
    id: "ep-20",
    youtubeId: "cPXHUyKm8DU",
    title: "From Vision to Empire: How Ebangha Njang Built KREEF Entertainment & SA Majesté",
    podcast: "The Everyday University",
    date: "Latest Masterclass",
    duration: "Full Episode • 55 min",
    category: "Entrepreneurship",
    thumbnail: "https://i.ytimg.com/vi/cPXHUyKm8DU/maxresdefault.jpg",
    description:
      "Welcome to the University of Life. Here, we sit down with extraordinary people and uncover the stories behind the stories. Every guest is a professor. Every conversation is a classroom.",
  };

  const targetYoutubeId = episode.youtubeId || "cPXHUyKm8DU";

  // Compute optimal high-resolution thumbnail synchronously without state delay
  const computedThumb =
    episode.thumbnail && !episode.thumbnail.includes("unsplash.com")
      ? episode.thumbnail.replace("/hqdefault.jpg", "/maxresdefault.jpg")
      : targetYoutubeId
      ? `https://i.ytimg.com/vi/${targetYoutubeId}/maxresdefault.jpg`
      : "https://i.ytimg.com/vi/cPXHUyKm8DU/maxresdefault.jpg";

  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);
  const [fallbackLevel, setFallbackLevel] = useState<number>(0);

  const activeSrc = fallbackSrc || computedThumb;

  const handleImageError = () => {
    if (fallbackLevel === 0 && targetYoutubeId) {
      // Fallback 1: High definition SD default (640x480)
      setFallbackSrc(`https://i.ytimg.com/vi/${targetYoutubeId}/sddefault.jpg`);
      setFallbackLevel(1);
    } else if (fallbackLevel === 1 && targetYoutubeId) {
      // Fallback 2: Standard HQ default (480x360)
      setFallbackSrc(`https://i.ytimg.com/vi/${targetYoutubeId}/hqdefault.jpg`);
      setFallbackLevel(2);
    }
  };

  const episodeTag = episode.date?.includes("Episode")
    ? episode.date
    : "Latest Masterclass";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[640px] sm:min-h-[660px] h-auto sm:h-screen w-full overflow-hidden bg-black text-white flex flex-col justify-between pt-32 xs:pt-36 sm:pt-28 pb-6 sm:pb-8 px-4 sm:px-8 md:px-12"
    >
      {/* Background Cinematic Visual with Parallax — Max Quality YouTube Thumbnail */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 pointer-events-none select-none scale-105"
      >
        <img
          key={activeSrc}
          src={activeSrc}
          alt={episode.title || "Classroom Latest Video Thumbnail"}
          onError={handleImageError}
          className="h-full w-full object-cover object-center brightness-[0.75] contrast-[1.06] transition-opacity duration-700"
        />
        {/* Cinematic Vignette & Ambient Darkness Overlays for Superior Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/75 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/60 pointer-events-none" />
      </motion.div>

      {/* Top Left Editorial Header */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg"
        >
          The Classrooms
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2.5 sm:mt-4 text-xs sm:text-base md:text-lg text-neutral-200 font-normal leading-relaxed max-w-2xl drop-shadow-md"
        >
          Welcome to the University of Life. Here, we sit down with extraordinary people
          and uncover the stories behind the stories. Every guest is a professor. Every
          conversation is a classroom. Explore our curriculum below to start learning.
        </motion.p>
      </motion.div>

      {/* Bottom Floating Frosted Glass Capsule Bar */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full mt-auto pt-6 sm:pt-0"
      >
        <div className="relative w-full rounded-2xl sm:rounded-[32px] border border-white/20 bg-black/40 backdrop-blur-2xl p-4 sm:px-8 sm:py-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 overflow-visible">
          {/* Left Side: Episode Tag, Title, Platform Pills */}
          <div className="relative z-20 min-w-0 max-w-xl lg:max-w-2xl">
            <h2
              onClick={() => onPlayVideo(episode.youtubeId, episode.title)}
              className="text-lg sm:text-2xl font-bold font-sans text-white hover:text-[#facc15] transition-colors cursor-pointer flex flex-wrap items-center gap-2"
            >
              <span>{episodeTag}</span>
              <span className="text-xs font-mono font-normal text-neutral-400">
                • {episode.duration || "Full Masterclass"}
              </span>
            </h2>
            <p
              onClick={() => onPlayVideo(episode.youtubeId, episode.title)}
              className="mt-1 text-xs sm:text-base text-neutral-200/90 font-normal truncate cursor-pointer hover:text-white transition-colors"
            >
              {episode.title}
            </p>

            {/* Platform & Social Badges from Footer */}
            <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href={
                  targetYoutubeId
                    ? `https://www.youtube.com/watch?v=${targetYoutubeId}`
                    : "https://www.youtube.com/@TheEverydayUniversity"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/25 hover:border-[#facc15]/50 hover:text-[#facc15] px-4 sm:px-5 py-1.5 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-md transition-all shadow-sm"
              >
                YouTube
              </a>
              <a
                href="https://www.instagram.com/theeverydayuniversity"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/25 hover:border-[#facc15]/50 hover:text-[#facc15] px-4 sm:px-5 py-1.5 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-md transition-all shadow-sm"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@the.everyday.univ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/25 hover:border-[#facc15]/50 hover:text-[#facc15] px-4 sm:px-5 py-1.5 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-md transition-all shadow-sm"
              >
                TikTok
              </a>
              <a
                href="https://x.com/everydayunivers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/25 hover:border-[#facc15]/50 hover:text-[#facc15] px-4 sm:px-5 py-1.5 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-md transition-all shadow-sm"
              >
                X (Twitter)
              </a>
            </div>
          </div>

          {/* Right Watch Now Button */}
          <div className="relative z-20 shrink-0 flex items-center justify-end">
            <button
              onClick={() => onPlayVideo(episode.youtubeId, episode.title)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#facc15] hover:bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold tracking-wide shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Learning</span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}