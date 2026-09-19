"use client";

import React from "react";
import { Play, ArrowUpRight, Sparkles, BookOpen, Layers } from "lucide-react";

interface ClassroomSpotlightProps {
  onPlayVideo?: (videoUrl: string, title: string) => void;
}

export default function ClassroomSpotlight({ onPlayVideo }: ClassroomSpotlightProps) {
  const handleExploreCourses = () => {
    const feedElement = document.getElementById("classroom-feed");
    if (feedElement) {
      feedElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePlaySample = () => {
    if (onPlayVideo) {
      onPlayVideo(
        "cPXHUyKm8DU",
        "Curated Playlist: Entrepreneurship 101 — From Idea to Execution"
      );
    } else {
      window.open("https://www.youtube.com/@TheEverydayUniversity", "_blank");
    }
  };

  return (
    <section className="relative w-full bg-black py-20 px-6 md:px-12 text-white border-t border-white/10">
      <div className="w-full">
        {/* ============================================================ */}
        {/* CURATED COURSES & PLAYLISTS BANNER (From PDF Content Guide)  */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#facc15] mb-4">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              CURATED LEARNING PATHS
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
              Curated Courses & <br />
              <span className="text-[#facc15]">Playlists</span>
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-8 max-w-xl">
              Instead of purely chronological episodes, bundle your learning. Dive into curated
              playlists styled as courses—like &ldquo;Entrepreneurship 101: From Idea to
              Execution&rdquo; or &ldquo;Mastering Failure: Turning Pain into Purpose.&rdquo;
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleExploreCourses}
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#facc15] hover:bg-white text-black font-bold text-sm sm:text-base shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  boxShadow: "0 10px 30px rgba(250, 204, 21, 0.25)",
                }}
              >
                <span>Explore All Courses</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={handlePlaySample}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/20 bg-zinc-900/80 hover:border-[#facc15] text-white hover:text-[#facc15] text-sm font-semibold transition cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Preview Playlist</span>
              </button>
            </div>
          </div>

          {/* Right Column Cinematic Course Bundle Visual */}
          <div className="lg:col-span-6 w-full">
            <div
              onClick={handlePlaySample}
              className="group relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-neutral-900 border border-white/15 cursor-pointer shadow-2xl transition-all duration-500 hover:border-[#facc15]/60"
            >
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop"
                alt="Curated Courses & Playlists"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Large Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#facc15] text-black shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#facc15]" />
                  <span className="text-xs font-semibold text-white">
                    Featured Course: Entrepreneurship 101
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#facc15] px-2.5 py-0.5 rounded-full bg-[#facc15]/15 border border-[#facc15]/25">
                  5 LESSONS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
