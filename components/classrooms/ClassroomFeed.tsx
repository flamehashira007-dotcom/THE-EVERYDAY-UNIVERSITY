"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { type PillarId } from "./ClassroomPillars";
import { Search, X, ChevronDown } from "lucide-react";

export interface ClassroomEpisode {
  id: string;
  youtubeId: string;
  title: string;
  podcast: string;
  date: string;
  duration: string;
  thumbnail: string;
  hostImage?: string;
  category?: string;
  department?: string;
  format?: string;
  description?: string;
  publishedAt?: string;
}

const INITIAL_VISIBLE_COUNT = 6; // 2 rows of 3 columns in grid view
const ITEMS_PER_PAGE = 6; // 2 more rows per click

interface ClassroomFeedProps {
  episodes: ClassroomEpisode[];
  activePillar?: PillarId;
  onPlayVideo?: (videoUrl: string, title: string) => void;
}

export default function ClassroomFeed({
  episodes = [],
  activePillar = "all",
}: ClassroomFeedProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Keyboard shortcut (press '/' or Cmd+K to focus search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) &&
        document.activeElement !== searchInputRef.current
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset pagination when search query or pillar changes
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [searchQuery, activePillar]);

  // Filtering by search and active pillar
  const filteredEpisodes = useMemo(() => {
    if (!Array.isArray(episodes)) return [];

    return episodes.filter((ep) => {
      // 1. Text Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        ep.title?.toLowerCase().includes(q) ||
        ep.podcast?.toLowerCase().includes(q) ||
        ep.category?.toLowerCase().includes(q) ||
        ep.description?.toLowerCase().includes(q);

      // 2. Pillar filter (linked when activePillar is selected)
      let matchesPillar = true;
      if (activePillar && activePillar !== "all") {
        const p = activePillar.toLowerCase().replace(/-/g, " ");
        const words = p.split(" ").filter((w) => w.length > 2);
        const title = ep.title?.toLowerCase() || "";
        const cat = ep.category?.toLowerCase() || "";
        const desc = ep.description?.toLowerCase() || "";

        matchesPillar =
          cat.includes(p) ||
          title.includes(p) ||
          words.some((w) => title.includes(w)) ||
          desc.includes(p) ||
          words.some((w) => desc.includes(w));
      }

      return matchesSearch && matchesPillar;
    });
  }, [episodes, searchQuery, activePillar]);

  const visibleEpisodes = useMemo(() => {
    return filteredEpisodes.slice(0, visibleCount);
  }, [filteredEpisodes, visibleCount]);

  const hasMore = visibleCount < filteredEpisodes.length;

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <section
      id="classroom-feed"
      className="relative w-full bg-black py-12 sm:py-16 px-4 sm:px-8 md:px-12 text-white border-t border-white/10"
    >
      <div className="w-full">
        {/* Clean Search Bar & View Controls Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pb-6 sm:pb-8 border-b border-white/10">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <div className="relative flex items-center rounded-full bg-zinc-900/90 border border-white/15 focus-within:border-[#facc15] focus-within:ring-2 focus-within:ring-[#facc15]/20 transition-all duration-200">
              <Search className="absolute left-3.5 sm:left-4.5 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search masterclasses, topics, or keywords..."
                className="w-full bg-transparent pl-11 pr-20 py-3 text-sm text-white placeholder-neutral-500 font-sans focus:outline-none"
              />
              <div className="absolute right-3.5 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 hover:bg-[#facc15] text-neutral-300 hover:text-black transition-all cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center rounded border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-neutral-400">
                    /
                  </kbd>
                )}
              </div>
            </div>
          </div>

          {/* Right Controls: Count & View Switcher */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Lessons (
              <span className="text-[#facc15] font-bold">
                {filteredEpisodes.length}
              </span>
              )
            </span>

            <div className="flex items-center rounded-full border border-white/15 bg-zinc-900/90 p-1">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs transition cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[#facc15] text-black shadow-md font-bold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                ⊞
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs transition cursor-pointer ${
                  viewMode === "list"
                    ? "bg-[#facc15] text-black shadow-md font-bold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Episodes Content */}
        {filteredEpisodes.length === 0 ? (
          <div className="py-24 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 border border-white/10 text-2xl text-[#facc15] mb-4">
              📚
            </div>
            <h3 className="text-xl font-bold text-white">No lessons match your search</h3>
            <p className="mt-2 text-sm text-neutral-400 max-w-sm mx-auto">
              Try adjusting your keyword search to see all masterclasses.
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 inline-flex items-center rounded-full bg-[#facc15] hover:bg-white text-black px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-lg"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          /* ============================================================ */
          /* GRID VIEW - 2 ROWS (6 CARDS) INITIALLY                       */
          /* ============================================================ */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {visibleEpisodes.map((ep, idx) => (
              <motion.div
                key={ep.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (idx % 6) * 0.06 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-zinc-950/90 border border-white/10 hover:border-[#facc15]/40 transition-all duration-300 shadow-xl"
              >
                <div>
                  {/* Thumbnail Stage */}
                  <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={ep.thumbnail || "/card-compressed.avif"}
                      alt={ep.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    {/* Duration Badge */}
                    <span className="absolute bottom-3 right-3 rounded-md bg-black/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-mono font-bold text-white border border-white/10">
                      {ep.duration || "Lesson"}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Date / Episode tag */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#facc15]">
                        {ep.podcast || "The Everyday University"}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-semibold">
                        {ep.date}
                      </span>
                    </div>

                    {/* Main Title */}
                    <h3 className="line-clamp-2 text-lg font-serif font-bold text-white group-hover:text-[#facc15] transition-colors leading-snug">
                      {ep.title}
                    </h3>

                    {/* Lesson Summary */}
                    {ep.description && (
                      <p className="mt-2.5 line-clamp-3 text-xs text-neutral-300 font-light leading-relaxed">
                        {ep.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* ============================================================ */
          /* LIST VIEW - 2 ROWS (6 CARDS) INITIALLY                       */
          /* ============================================================ */
          <div className="space-y-4 pt-8">
            {visibleEpisodes.map((ep, idx) => (
              <motion.div
                key={ep.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: (idx % 6) * 0.05 }}
                className="group flex flex-col sm:flex-row items-stretch sm:items-center gap-5 rounded-2xl bg-zinc-950/90 p-4 sm:p-5 border border-white/10 hover:border-[#facc15]/40 transition-all shadow-lg"
              >
                {/* Thumbnail */}
                <div className="relative h-32 sm:h-24 sm:w-40 shrink-0 rounded-xl overflow-hidden bg-neutral-900">
                  <Image
                    src={ep.thumbnail || "/card-compressed.avif"}
                    alt={ep.title}
                    fill
                    sizes="160px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#facc15]">
                      {ep.podcast || "The Everyday University"}
                    </span>
                    <span className="text-xs text-neutral-400">•</span>
                    <span className="text-xs text-neutral-400 font-medium">
                      {ep.date}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white group-hover:text-[#facc15] transition-colors line-clamp-2 sm:truncate">
                    {ep.title}
                  </h3>
                  {ep.description && (
                    <p className="mt-1 text-xs text-neutral-300 font-light line-clamp-1">
                      {ep.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View More Button (Loads 2 More Rows = 6 Items) */}
        {hasMore && (
          <div className="mt-12 flex flex-col items-center justify-center gap-3">
            <button
              onClick={handleViewMore}
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-zinc-900 border border-white/20 hover:border-[#facc15] hover:bg-[#facc15] text-white hover:text-black font-bold text-sm transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>View More Lessons</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
            <span className="text-xs font-mono text-neutral-500">
              Showing {visibleEpisodes.length} of {filteredEpisodes.length} masterclasses
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

