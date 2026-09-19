"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CommunityVideoModal from "./CommunityVideoModal";

interface VoiceMember {
  id: string;
  name: string;
  location: string;
  avatar: string;
  videoUrl?: string;
  bio: string;
  linkText?: string;
  linkUrl?: string;
}

const MEMBERS: VoiceMember[] = [
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    location: "Founder & Listener",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/89bQ8zM8gHE?autoplay=1",
    bio: "The lessons I've learned from this podcast have completely changed how I approach my business and my life. It's an incredible resource.",
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    location: "Creative Director & Listener",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/SXUQ_OimIMY?autoplay=1",
    bio: "Finally, a podcast community that actually focuses on actionable wisdom instead of just celebrating success. The discussions in the group are just as valuable as the episodes themselves.",
  },
];

export default function CommunityVoices() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const [manualActiveIndex, setManualActiveIndex] = useState<number | null>(null);

  const row1ContentRef = useRef<HTMLDivElement>(null);
  const row2ContentRef = useRef<HTMLDivElement>(null);
  const [row1FullHeight, setRow1FullHeight] = useState(0);
  const [row2FullHeight, setRow2FullHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (row1ContentRef.current) setRow1FullHeight(row1ContentRef.current.scrollHeight);
      if (row2ContentRef.current) setRow2FullHeight(row2ContentRef.current.scrollHeight);
    };
    measure();
    const timeout = setTimeout(measure, 100);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.05, 1.1]);

  const row1Opacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 1, 0]);
  const row1Height = useTransform(
    scrollYProgress,
    [0, 0.35, 0.55],
    [row1FullHeight, row1FullHeight, 0]
  );

  const row2Opacity = useTransform(scrollYProgress, [0.15, 0.3, 1], [0, 1, 1]);
  const row2Height = useTransform(scrollYProgress, [0.15, 0.3, 1], [0, row2FullHeight, row2FullHeight]);

  return (
    <section id="voices" className="relative w-full bg-black text-white">
      {/* 1. TOP HEADER */}
      <div className="w-full px-4 sm:px-8 md:px-12 pt-12 sm:pt-24 md:pt-32 pb-6 sm:pb-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-[5rem] font-serif text-white tracking-tight mb-3 sm:mb-6 leading-[1.05]">
            Voices from Our <span className="text-[#facc15]">Listeners</span>
          </h2>
          <p className="text-xs sm:text-lg md:text-xl text-neutral-300 leading-relaxed font-light">
            Hear from listeners who are using the lessons from the podcast to navigate their own journeys with greater wisdom and purpose.
          </p>
        </div>
      </div>

      {/* 2. PINNED SCROLL TRACK */}
      <div ref={scrollTrackRef} className="relative w-full min-h-0 sm:min-h-[160vh] md:min-h-[200vh]">
        <div className="sm:sticky sm:top-24 md:top-28 w-full px-4 sm:px-8 md:px-12 pb-8 sm:pb-14">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white/10 shadow-2xl bg-[#0a0a0a] w-full min-h-0 sm:min-h-[560px] md:min-h-[640px] p-4 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-center">
            {/* Parallax Background */}
            <motion.div style={{ y: bgY, scale: bgScale }} className="absolute -inset-y-16 inset-x-0 z-0 pointer-events-none">
              <img
                src="/card-compressed.avif"
                alt="Voices from Our Listeners background"
                className="w-full h-full object-cover object-center brightness-75"
              />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
            </motion.div>

            {/* Inset Glassmorphic Dark Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto rounded-xl sm:rounded-[1.75rem] border border-white/20 bg-black/60 backdrop-blur-2xl p-4 sm:p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.55)] divide-y divide-white/15">
              {/* ROW 1: Marcus Vance */}
              <div
                onClick={() => setManualActiveIndex(manualActiveIndex === 0 ? null : 0)}
                className="pb-4 sm:pb-6 first:pt-0 cursor-pointer group"
              >
                <div className="pb-2 sm:pb-3 flex items-center justify-between">
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-serif text-white group-hover:text-[#facc15] transition-colors">
                    {MEMBERS[0].name}
                  </h3>
                  <span className="text-[10px] sm:text-sm font-mono uppercase tracking-widest text-[#facc15]/90">
                    {MEMBERS[0].location}
                  </span>
                </div>

                <motion.div
                  className={`overflow-hidden ${
                    manualActiveIndex !== null ? "transition-all duration-500 ease-in-out" : ""
                  }`}
                  style={
                    manualActiveIndex !== null
                      ? {
                          opacity: manualActiveIndex === 0 ? 1 : 0,
                          height: manualActiveIndex === 0 ? row1FullHeight : 0,
                        }
                      : { opacity: row1Opacity, height: row1Height }
                  }
                >
                  <div ref={row1ContentRef} className="pt-4 sm:pt-6 pb-2 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-center">
                    <div className="md:col-span-4 flex justify-center md:justify-start">
                      <div className="relative group/avatar w-28 h-28 sm:w-40 sm:h-40 rounded-2xl sm:rounded-3xl overflow-hidden bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center shadow-2xl shrink-0">
                        <img
                          src={MEMBERS[0].avatar}
                          alt={MEMBERS[0].name}
                          className="w-full h-full object-cover object-top mix-blend-luminosity group-hover/avatar:mix-blend-normal group-hover/avatar:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {MEMBERS[0].videoUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedVideo({ url: MEMBERS[0].videoUrl!, title: MEMBERS[0].name });
                            }}
                            className="absolute inset-0 m-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#facc15] hover:bg-white text-black flex items-center justify-center backdrop-blur-md shadow-lg hover:scale-110 transition-all cursor-pointer"
                            aria-label={`Play ${MEMBERS[0].name} story`}
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-8 flex items-start gap-3 sm:gap-4">
                      <div className="text-[#facc15] shrink-0 mt-0.5 sm:mt-1">
                        <svg className="w-5 h-5 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      <p className="text-xs sm:text-lg md:text-xl text-neutral-200 leading-relaxed font-light italic">
                        &ldquo;{MEMBERS[0].bio}&rdquo;
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* ROW 2: Elena Rostova */}
              <div
                onClick={() => setManualActiveIndex(manualActiveIndex === 1 ? null : 1)}
                className="pt-4 sm:pt-6 cursor-pointer group"
              >
                <div className="pb-2 sm:pb-3 flex items-center justify-between">
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-serif text-white group-hover:text-[#facc15] transition-colors">
                    {MEMBERS[1].name}
                  </h3>
                  <span className="text-[10px] sm:text-sm font-mono uppercase tracking-widest text-[#facc15]/90">
                    {MEMBERS[1].location}
                  </span>
                </div>

                <motion.div
                  className={`overflow-hidden ${
                    manualActiveIndex !== null ? "transition-all duration-500 ease-in-out" : ""
                  }`}
                  style={
                    manualActiveIndex !== null
                      ? {
                          opacity: manualActiveIndex === 1 ? 1 : 0,
                          height: manualActiveIndex === 1 ? row2FullHeight : 0,
                        }
                      : { opacity: row2Opacity, height: row2Height }
                  }
                >
                  <div ref={row2ContentRef} className="pt-4 sm:pt-6 pb-2 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-center">
                    <div className="md:col-span-4 flex justify-center md:justify-start">
                      <div className="relative group/avatar w-28 h-28 sm:w-40 sm:h-40 rounded-2xl sm:rounded-3xl overflow-hidden bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center shadow-2xl shrink-0">
                        <img
                          src={MEMBERS[1].avatar}
                          alt={MEMBERS[1].name}
                          className="w-full h-full object-cover object-top mix-blend-luminosity group-hover/avatar:mix-blend-normal group-hover/avatar:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {MEMBERS[1].videoUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedVideo({ url: MEMBERS[1].videoUrl!, title: MEMBERS[1].name });
                            }}
                            className="absolute inset-0 m-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#facc15] hover:bg-white text-black flex items-center justify-center backdrop-blur-md shadow-lg hover:scale-110 transition-all cursor-pointer"
                            aria-label={`Play ${MEMBERS[1].name} story`}
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-8 flex items-start gap-3 sm:gap-4">
                      <div className="text-[#facc15] shrink-0 mt-0.5 sm:mt-1">
                        <svg className="w-5 h-5 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      <p className="text-xs sm:text-lg md:text-xl text-neutral-200 leading-relaxed font-light italic">
                        &ldquo;{MEMBERS[1].bio}&rdquo;
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reusable Video Modal */}
      {selectedVideo && (
        <CommunityVideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}
    </section>
  );
}