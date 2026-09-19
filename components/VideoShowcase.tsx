"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { VIDEOS_QUERY, type SanityVideo } from "@/sanity/lib/queries";

export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  podcast: string;
  date: string;
  duration: string;
  thumbnail: string;
}

import { extractYouTubeId } from "@/lib/youtube";
export { extractYouTubeId };

/* Framer Motion variants for staggered sidebar list */
const listContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const listItem = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function VideoShowcase() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchSanityVideos() {
      try {
        const data = await client.fetch<SanityVideo[]>(VIDEOS_QUERY);
        if (data && data.length > 0) {
          const mapped: VideoItem[] = await Promise.all(
            data.map(async (item, idx) => {
              const yId = extractYouTubeId(item.youtubeUrl);
              let resolvedTitle = item.title;

              if (!resolvedTitle && yId) {
                try {
                  const metaRes = await fetch(
                    `/api/youtube-meta?id=${encodeURIComponent(yId)}`
                  );
                  if (metaRes.ok) {
                    const metaData = await metaRes.json();
                    if (metaData.title) resolvedTitle = metaData.title;
                  }
                } catch {
                  resolvedTitle = "YouTube Video";
                }
              }

              return {
                id: item._id || String(idx + 1),
                youtubeId: yId,
                title: resolvedTitle || "YouTube Video",
                podcast: item.podcast || "The Everyday University",
                date: item.date || `Episode ${idx + 1}`,
                duration: item.duration || "Full Episode",
                thumbnail:
                  item.thumbnailUrl ||
                  (yId
                    ? `https://i.ytimg.com/vi/${yId}/maxresdefault.jpg`
                    : "/card-compressed.avif"),
              };
            })
          );
          setVideos(mapped);
          setSelectedIndex(0);
          setIsPlaying(false);
        } else {
          setVideos([]);
        }
      } catch (err) {
        console.error("Failed to load videos from Sanity:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSanityVideos();
  }, []);

  const safeIndex = selectedIndex < videos.length ? selectedIndex : 0;
  const activeVideo = videos[safeIndex];

  /* Scroll-driven transforms for the whole section */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Pill heading floats slower — subtle parallax */
  const pillY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  /* Video stage scales up as you scroll into view */
  const stageScale = useTransform(scrollYProgress, [0, 0.4], [0.94, 1]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const handleSelectVideo = (idx: number) => {
    setSelectedIndex(idx);
    setIsPlaying(false);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black px-4 sm:py-20 lg:py-40 lg:px-8 flex flex-col items-center justify-start text-white overflow-hidden"
    >
      {/* Container with Floating Tag */}
      <motion.div
        style={{ y: pillY }}
        className="relative z-30 mb-6 sm:mb-8 flex justify-center w-full pointer-events-none select-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-full bg-white px-8 py-2.5 sm:px-10 sm:py-3.5 shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/20"
        >
          {/* White Pill Tag Heading */}
          <span className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black">
            Videos
          </span>
        </motion.div>
      </motion.div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex-1 flex flex-col lg:flex-row gap-6 bg-[#070709] rounded-3xl p-4 sm:p-6 border border-white/10 shadow-2xl min-h-[500px]"
      >
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#facc15] border-t-transparent" />
              <p className="text-sm font-medium text-neutral-400">
                Loading videos...
              </p>
            </div>
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 border border-white/10 text-2xl text-[#facc15]">
              ▶
            </div>
            <h3 className="mt-4 text-xl font-bold text-white">No Videos Found</h3>
            <p className="mt-2 text-sm text-neutral-400 max-w-sm">
              Add your first YouTube video in Sanity Studio to display it here.
            </p>
            <a
              href="/studio"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#facc15] px-6 py-2.5 text-sm font-bold text-black hover:bg-white transition"
            >
              Open Studio ↗
            </a>
          </div>
        ) : (
          <>
            {/* Left Sidebar */}
            <div className="flex w-full flex-col justify-between shrink-0 lg:w-110 xl:w-120">
              <div className="flex flex-col flex-1 h-full">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between mb-5 px-2"
                >
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    Featured Classrooms
                  </h3>
                  <span className="text-xs text-neutral-400 font-medium">
                    {videos.length} {videos.length === 1 ? "Episode" : "Episodes"}
                  </span>
                </motion.div>

                {/* Scrollable List Container */}
                <motion.div
                  data-lenis-prevent
                  variants={listContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="flex-1 overflow-y-auto overscroll-contain max-h-80 sm:max-h-120 lg:max-h-[calc(100vh-100px)] space-y-3.5 pt-2.5 pb-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                  {videos.map((video, idx) => {
                    const isActive = safeIndex === idx;
                    return (
                      <motion.button
                        key={video.id}
                        variants={listItem}
                        onClick={() => handleSelectVideo(idx)}
                        whileHover={{ x: 4 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className={`group flex w-full items-center gap-4 rounded-2xl p-3.5 text-left transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-[#1d1d22] ring-1 ring-yellow-400/50 shadow-xl"
                            : "bg-[#0e0e11] hover:bg-[#15151a]"
                        }`}
                      >
                        <div className="relative h-18 w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-800">
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            sizes="112px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <h4
                            className={`line-clamp-2 text-sm font-bold leading-tight transition-colors ${
                              isActive
                                ? "text-[#facc15]"
                                : "text-neutral-200 group-hover:text-white"
                            }`}
                          >
                            {video.title}
                          </h4>
                          <div className="mt-2 flex items-center gap-2 text-xs text-neutral-400 font-medium">
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#facc15] text-[9px] text-black font-bold">
                              ▶
                            </span>
                            <span className="truncate">
                              {video.podcast} · {video.date}
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>

              <motion.a
                href="https://www.youtube.com/@TheEverydayUniversity"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#facc15] py-3.5 text-base font-black text-black transition-all hover:bg-white cursor-pointer"
              >
                <span>All Episodes on YouTube</span>
                <span>↗</span>
              </motion.a>
            </div>

            {/* Video Stage — Interactive YouTube Player */}
            {activeVideo && (
              <motion.div
                style={{ scale: stageScale, opacity: stageOpacity }}
                className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-2xl bg-[#0a0a0d] border border-white/10 min-h-80 sm:min-h-[480px] shadow-2xl"
              >
                <div className="flex flex-1 flex-col justify-between h-full w-full">
                  {/* Embedded YouTube Frame */}
                  <div className="relative aspect-video w-full flex-1 overflow-hidden bg-black">
                    {isPlaying && activeVideo.youtubeId ? (
                      <iframe
                        key={activeVideo.youtubeId}
                        src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                        title={activeVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    ) : (
                      <div
                        onClick={() => setIsPlaying(true)}
                        className="relative h-full w-full cursor-pointer group flex items-center justify-center"
                      >
                        <Image
                          src={activeVideo.thumbnail}
                          alt={activeVideo.title}
                          fill
                          sizes="(max-width: 1200px) 100vw, 70vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                        {/* Play Button */}
                        <motion.button
                          aria-label="Play video"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative z-20 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#facc15] text-black shadow-2xl transition-transform"
                        >
                          <svg
                            className="ml-1 h-7 w-7 sm:h-8 sm:w-8 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </motion.button>
                      </div>
                    )}
                  </div>

                  {/* Video Meta info bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#0e0e12] p-4 sm:p-6 border-t border-white/10"
                  >
                    <div className="text-left max-w-xl">
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#facc15]">
                        {activeVideo.podcast} • {activeVideo.date}
                      </span>
                      <h2 className="mt-1 text-base sm:text-xl font-bold text-white tracking-tight leading-snug">
                        {activeVideo.title}
                      </h2>
                    </div>
                    {activeVideo.youtubeId ? (
                      <a
                        href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:border-[#facc15] hover:text-[#facc15]"
                      >
                        Watch on YouTube ↗
                      </a>
                    ) : null}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </section>
  );
}