"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  podcast: string;
  date: string;
  duration: string;
  thumbnail: string;
}

const videoData: VideoItem[] = [
  {
    id: "1",
    youtubeId: "89bQ8zM8gHE",
    title: "A Journey From a Nurse to a Fashion Designer",
    podcast: "The Everyday University",
    date: "Episode 1",
    duration: "Full Episode",
    thumbnail: "https://i.ytimg.com/vi/89bQ8zM8gHE/hqdefault.jpg",
  },
  {
    id: "2",
    youtubeId: "SXUQ_OimIMY",
    title: "Powerhouses of the DMV",
    podcast: "The Everyday University",
    date: "Episode 2",
    duration: "Full Episode",
    thumbnail: "https://i.ytimg.com/vi/SXUQ_OimIMY/hqdefault.jpg",
  },
  {
    id: "3",
    youtubeId: "JduHAq-DizE",
    title: "The Masterclass of Sacrifice",
    podcast: "The Everyday University",
    date: "Episode 3",
    duration: "Full Episode",
    thumbnail: "https://i.ytimg.com/vi/JduHAq-DizE/hqdefault.jpg",
  },
  {
    id: "4",
    youtubeId: "cPXHUyKm8DU",
    title: "From Pharmacist to Realtor: Lesley's Journey to Real Estate Success",
    podcast: "The Everyday University",
    date: "Episode 5",
    duration: "Full Episode",
    thumbnail: "https://i.ytimg.com/vi/cPXHUyKm8DU/hqdefault.jpg",
  },
  {
    id: "5",
    youtubeId: "hWNwEsCyPHg",
    title: "Why Smart Money Is Looking at West Africa – CEO Brad Rohr",
    podcast: "The Everyday University",
    date: "Episode 7",
    duration: "Full Episode",
    thumbnail: "https://i.ytimg.com/vi/hWNwEsCyPHg/hqdefault.jpg",
  },
  {
    id: "6",
    youtubeId: "1w7bRHWpYIw",
    title: "The Science of Smile: Dr. Armstrong's Ultimate Guide",
    podcast: "The Everyday University",
    date: "Episode 8",
    duration: "Full Episode",
    thumbnail: "https://i.ytimg.com/vi/1w7bRHWpYIw/hqdefault.jpg",
  },
];

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const activeVideo = videoData[selectedIndex];

  const sectionRef = useRef<HTMLElement>(null);

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
        className="w-full flex-1 flex flex-col lg:flex-row gap-6 bg-[#070709] rounded-3xl p-4 sm:p-6 border border-white/10 shadow-2xl"
      >
        {/* Left Sidebar */}
        <div className="flex w-full flex-col justify-between shrink-0 lg:w-110 xl:w-120">
          <div className="flex flex-col flex-1 h-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between mb-4 px-2"
            >
              <h3 className="text-xl font-bold tracking-tight text-white">
                Featured Classrooms
              </h3>
              <span className="text-xs text-neutral-400 font-medium">
                {videoData.length} Episodes
              </span>
            </motion.div>

            {/* Scrollable List Container — staggered entrance */}
            <motion.div
              variants={listContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="flex-1 overflow-y-auto max-h-80 sm:max-h-120 lg:max-h-[calc(100vh-250px)] space-y-3 pr-2 scrollbar-thin [scrollbar-color:#333_transparent]"
            >
              {videoData.map((video, idx) => {
                const isActive = selectedIndex === idx;
                return (
                  <motion.button
                    key={video.id}
                    variants={listItem}
                    onClick={() => handleSelectVideo(idx)}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                          isActive ? "text-[#facc15]" : "text-neutral-200 group-hover:text-white"
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
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#facc15] py-3.5 text-base font-black text-black transition-all hover:bg-white cursor-pointer"
          >
            <span>All Episodes on YouTube</span>
            <span>↗</span>
          </motion.a>
        </div>

        {/* Video Stage — Interactive YouTube Player */}
        <motion.div
          style={{ scale: stageScale, opacity: stageOpacity }}
          className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-2xl bg-[#0a0a0d] border border-white/10 min-h-80 sm:min-h-[480px] shadow-2xl"
        >
          <div className="flex flex-1 flex-col justify-between h-full w-full">
            {/* Embedded YouTube Frame */}
            <div className="relative aspect-video w-full flex-1 overflow-hidden bg-black">
              {isPlaying ? (
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
              <a
                href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:border-[#facc15] hover:text-[#facc15]"
              >
                Watch on YouTube ↗
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}