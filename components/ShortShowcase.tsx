"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ReelItem {
  id: string;
  reelCode: string;
  reelUrl: string;
  title: string;
  showName: string;
  duration: string;
  category: string;
  badgeBg: string;
  badgeText: string;
  thumbnail: string;
}

const reelData: ReelItem[] = [
  {
    id: "r1",
    reelCode: "DdPabEYjkxv",
    reelUrl: "https://www.instagram.com/reel/DdPabEYjkxv/",
    title: "A Journey From a Nurse to a Fashion Designer: Turning Passion into Impact",
    showName: "The Everyday University",
    duration: "REEL",
    category: "STORY",
    badgeBg: "#facc15",
    badgeText: "#000000",
    thumbnail: "https://i.ytimg.com/vi/89bQ8zM8gHE/hqdefault.jpg",
  },
  {
    id: "r2",
    reelCode: "DcqSr7YAHML",
    reelUrl: "https://www.instagram.com/reel/DcqSr7YAHML/",
    title: "Powerhouses of the DMV: Leadership & Real-World Wisdom",
    showName: "The Everyday University",
    duration: "REEL",
    category: "LEADERSHIP",
    badgeBg: "#facc15",
    badgeText: "#000000",
    thumbnail: "https://i.ytimg.com/vi/SXUQ_OimIMY/hqdefault.jpg",
  },
  {
    id: "r3",
    reelCode: "DcG-lhqETl3",
    reelUrl: "https://www.instagram.com/reel/DcG-lhqETl3/",
    title: "The Masterclass of Sacrifice: What True Success Actually Requires",
    showName: "The Everyday University",
    duration: "REEL",
    category: "MINDSET",
    badgeBg: "#facc15",
    badgeText: "#000000",
    thumbnail: "https://i.ytimg.com/vi/JduHAq-DizE/hqdefault.jpg",
  },
  {
    id: "r4",
    reelCode: "Da7ftX8j3gY",
    reelUrl: "https://www.instagram.com/reel/Da7ftX8j3gY/",
    title: "From Pharmacist to Realtor: Lesley’s Blueprint for Reinvention",
    showName: "The Everyday University",
    duration: "REEL",
    category: "BUSINESS",
    badgeBg: "#facc15",
    badgeText: "#000000",
    thumbnail: "https://i.ytimg.com/vi/cPXHUyKm8DU/hqdefault.jpg",
  },
  {
    id: "r5",
    reelCode: "DasClVyD8pe",
    reelUrl: "https://www.instagram.com/reel/DasClVyD8pe/",
    title: "Why Smart Money Looks at Emerging Frontiers: CEO Brad Rohr Breakdown",
    showName: "The Everyday University",
    duration: "REEL",
    category: "FINANCE",
    badgeBg: "#facc15",
    badgeText: "#000000",
    thumbnail: "https://i.ytimg.com/vi/hWNwEsCyPHg/hqdefault.jpg",
  },
  {
    id: "r6",
    reelCode: "DZpGJIHDJty",
    reelUrl: "https://www.instagram.com/reel/DZpGJIHDJty/",
    title: "The Science of Smile: Health, Longevity, and Daily Discipline",
    showName: "The Everyday University",
    duration: "REEL",
    category: "HEALTH",
    badgeBg: "#facc15",
    badgeText: "#000000",
    thumbnail: "https://i.ytimg.com/vi/1w7bRHWpYIw/hqdefault.jpg",
  },
];

export default function ShortShowcase() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-black px-4 py-16 lg:px-8 flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Floating Tag Header */}
      <div className="relative z-30 mb-8 flex justify-center w-full pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-full bg-white px-10 py-3.5 shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/20"
        >
          <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black">
            Reels
          </span>
        </motion.div>
      </div>

      {/* Main Container */}
      <div className="w-full flex flex-col justify-between bg-[#070709] rounded-3xl p-4 sm:p-6 border border-white/10 shadow-2xl">
        {/* Editorial Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-[#facc15] animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-widest text-[#facc15]">
                Instagram Highlights
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white">
              Featured Reels
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#141419] border border-white/10 text-white transition-all hover:bg-[#facc15] hover:text-black hover:border-[#facc15] active:scale-95 cursor-pointer"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#141419] border border-white/10 text-white transition-all hover:bg-[#facc15] hover:text-black hover:border-[#facc15] active:scale-95 cursor-pointer"
            >
              →
            </button>
          </div>
        </div>

        {/* 9:16 Vertical Reel Cards Scroll Row — Plays inline inside the card */}
        <div
          ref={scrollRef}
          className="flex items-center w-full gap-5 overflow-x-auto py-4 snap-x snap-mandatory scrollbar-none [-ms-overflow-style:none]"
        >
          {reelData.map((item, idx) => {
            const isPlayingThis = playingId === item.id;

            return (
              <motion.div
                key={item.id}
                whileHover={!isPlayingThis ? { y: -6 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative shrink-0 h-[62vh] min-h-[440px] max-h-[600px] aspect-9/16 rounded-2xl overflow-hidden bg-[#0e0e11] border snap-start shadow-2xl transition-all duration-300 ${
                  isPlayingThis ? "border-yellow-400 ring-2 ring-yellow-400/40" : "border-white/10"
                }`}
              >
                {isPlayingThis ? (
                  /* Inline Instagram Reel Video Frame */
                  <div className="relative w-full h-full bg-black">
                    <button
                      type="button"
                      onClick={() => setPlayingId(null)}
                      aria-label="Close inline video"
                      className="absolute top-2.5 right-2.5 z-30 flex h-7 w-7 items-center justify-center rounded-full bg-black/85 text-white hover:bg-[#facc15] hover:text-black transition-all border border-white/20 text-xs font-bold cursor-pointer shadow-lg"
                    >
                      ✕
                    </button>
                    <iframe
                      src={`https://www.instagram.com/reel/${item.reelCode}/embed/`}
                      title={item.title}
                      className="w-full h-full border-0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  /* Interactive Card Preview */
                  <div
                    onClick={() => setPlayingId(item.id)}
                    className="relative w-full h-full group cursor-pointer select-none"
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      priority={idx < 4}
                      sizes="(max-width: 640px) 300px, 350px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 pointer-events-none" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span
                        style={{
                          backgroundColor: item.badgeBg,
                          color: item.badgeText,
                        }}
                        className="rounded-full px-3 py-1 text-[11px] font-black tracking-wider uppercase shadow-lg"
                      >
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/10">
                        <svg className="h-3 w-3 fill-current text-[#facc15]" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        <span>Reel</span>
                      </span>
                    </div>

                    {/* Center Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/70 text-white border border-white/30 group-hover:bg-[#facc15] group-hover:text-black group-hover:border-[#facc15] group-hover:scale-110 transition-all duration-300 shadow-2xl">
                        <svg
                          className="ml-1 h-7 w-7 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Card Bottom Meta */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10 bg-gradient-to-t from-black via-black/95 to-transparent pt-12">
                      <span className="text-xs font-bold text-[#facc15] uppercase tracking-wider block mb-1 truncate">
                        {item.showName}
                      </span>
                      <h4 className="line-clamp-2 text-base font-extrabold leading-tight text-white group-hover:text-[#facc15] transition-colors">
                        {item.title}
                      </h4>
                      <div className="mt-3 flex items-center justify-between text-xs text-neutral-400 font-medium border-t border-white/10 pt-3">
                        <span className="text-neutral-300">Play Reel</span>
                        <span className="text-[#facc15] font-bold group-hover:translate-x-1 transition-transform">
                          ▶
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Action Button */}
        <a
          href="https://www.instagram.com/theeverydayuniversity"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#facc15] py-4 text-base font-black text-black uppercase tracking-wider transition-all hover:bg-white cursor-pointer shadow-lg"
        >
          <span>ALL REELS ON INSTAGRAM</span>
          <span>↗</span>
        </a>
      </div>
    </section>
  );
}
