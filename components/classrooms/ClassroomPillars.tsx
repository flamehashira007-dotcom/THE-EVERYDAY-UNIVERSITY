"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { getLenis } from "@/lib/lenis";
import { ArrowUpRight, Sparkles, Radio } from "lucide-react";

export type PillarId =
  | "all"
  | "business"
  | "resilience"
  | "arts-culture"
  | "great-simplification"
  | "frankly"
  | "reality-roundtables"
  | string;

export interface ClassroomPillarsProps {
  activePillar?: PillarId;
  onSelectPillar?: (pillar: PillarId) => void;
}

export interface StoryPillarItem {
  id: PillarId;
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  buttonLabel: string;
  image: string;
  badge: string;
  accent: string;
  accentGlow: string;
}

const PILLARS: StoryPillarItem[] = [
  {
    id: "business",
    number: "01",
    tag: "DEPARTMENT 01",
    title: "The School of Business & Entrepreneurship",
    subtitle: "Founders, Builders & Investors",
    description:
      "Learn from founders, investors, and builders who have navigated the highs and lows of creating something from nothing.",
    buttonLabel: "Enter the School",
    badge: "Foundational Blueprints",
    image: "/Copy of IMG_2145.JPG",
    accent: "#facc15",
    accentGlow: "rgba(250, 204, 21, 0.35)",
  },
  {
    id: "resilience",
    number: "02",
    tag: "DEPARTMENT 02",
    title: "The School of Resilience",
    subtitle: "Overcoming Adversity",
    description:
      "Stories of overcoming failure, enduring loss, and the powerful lessons learned from starting over.",
    buttonLabel: "Enter the School",
    badge: "Mental Toughness",
    image: "/Copy of IMG_2357.JPG",
    accent: "#38bdf8",
    accentGlow: "rgba(56, 189, 248, 0.35)",
  },
  {
    id: "arts-culture",
    number: "03",
    tag: "DEPARTMENT 03",
    title: "The School of Arts & Storytelling",
    subtitle: "Creatives & Cultural Architects",
    description:
      "Explore the craft of storytelling, media, and creative expression through the lens of visionary leaders.",
    buttonLabel: "Enter the School",
    badge: "Creative Mastery",
    image: "/Copy of IMG_2021.JPG",
    accent: "#a855f7",
    accentGlow: "rgba(168, 85, 247, 0.35)",
  },
];

interface PillarCardProps {
  item: StoryPillarItem;
  index: number;
  scrollYProgress: MotionValue<number>;
  totalItems: number;
  onSelectPillar?: (pillar: PillarId) => void;
  onScrollToFeed: () => void;
}

function PillarCard({
  item,
  index,
  scrollYProgress,
  totalItems,
  onSelectPillar,
  onScrollToFeed,
}: PillarCardProps) {
  const isFirst = index === 0;
  const isLast = index === totalItems - 1;

  let inputRange: number[];
  let opacityRange: number[];
  let yRange: number[];
  let scaleRange: number[];

  if (isFirst) {
    inputRange = [0, 0.18, 0.32, 1];
    opacityRange = [1, 1, 0, 0];
    yRange = [0, 0, -40, -40];
    scaleRange = [1, 1, 0.96, 0.96];
  } else if (isLast) {
    inputRange = [0, 0.60, 0.74, 1];
    opacityRange = [0, 0, 1, 1];
    yRange = [40, 40, 0, 0];
    scaleRange = [0.96, 0.96, 1, 1];
  } else {
    inputRange = [0, 0.24, 0.36, 0.56, 0.68, 1];
    opacityRange = [0, 0, 1, 1, 0, 0];
    yRange = [40, 40, 0, 0, -40, -40];
    scaleRange = [0.96, 0.96, 1, 1, 0.96, 0.96];
  }

  const opacity = useTransform(scrollYProgress, inputRange, opacityRange);
  const y = useTransform(scrollYProgress, inputRange, yRange);
  const scale = useTransform(scrollYProgress, inputRange, scaleRange);

  const visibility = useTransform(opacity, (v) => (v > 0.005 ? "visible" : "hidden"));
  const pointerEvents = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none"));

  const handleAction = () => {
    if (onSelectPillar) {
      onSelectPillar(item.id);
    }
    onScrollToFeed();
  };

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        visibility,
        pointerEvents,
      }}
      className="absolute inset-0 flex items-center justify-center w-full"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-14 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-6 flex flex-col items-start z-10">
          {/* Tag & Series Pill */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-white border"
              style={{
                borderColor: `${item.accent}55`,
                backgroundColor: `${item.accent}15`,
                boxShadow: `0 0 20px ${item.accent}20`,
              }}
            >
              <Radio className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-pulse" style={{ color: item.accent }} />
              {item.tag}
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase tracking-widest">
              Department {item.number} / 0{totalItems}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] sm:leading-[1.1] mb-1.5 sm:mb-2 font-serif">
            {item.title}
          </h2>

          <p
            className="text-xs sm:text-sm md:text-base font-semibold tracking-wide mb-2.5 sm:mb-4"
            style={{ color: item.accent }}
          >
            {item.subtitle}
          </p>

          {/* Description */}
          <p className="text-neutral-300 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-8 max-w-2xl font-light line-clamp-3 sm:line-clamp-none">
            {item.description}
          </p>

          {/* Action CTA & Badge */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={handleAction}
              className="group relative inline-flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-[#facc15] hover:bg-white text-black font-bold text-xs sm:text-sm md:text-base shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                boxShadow: "0 10px 30px rgba(250, 204, 21, 0.25)",
              }}
            >
              <span>{item.buttonLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <span className="text-[10px] sm:text-xs text-neutral-300 font-mono flex items-center gap-1.5 bg-zinc-900 border border-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#facc15]" />
              {item.badge}
            </span>
          </div>
        </div>

        {/* Right Artwork Showcase Card */}
        <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
          <div
            className="relative w-full aspect-[21/9] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden p-[1px] shadow-2xl transition-transform duration-500 bg-neutral-900 border border-white/10"
            style={{
              boxShadow: "0 20px 50px -10px rgba(250, 204, 21, 0.15)",
            }}
          >
            <div className="relative w-full h-full rounded-[15px] sm:rounded-[23px] overflow-hidden bg-black">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex items-center justify-between p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-black/80 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#facc15] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-semibold text-white tracking-wide truncate">
                    {item.title}
                  </span>
                </div>
                <span className="text-[9px] sm:text-[11px] font-mono font-medium px-2 sm:px-2.5 py-0.5 rounded-full text-[#facc15] bg-[#facc15]/15 border border-[#facc15]/20 shrink-0">
                  Featured
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ClassroomPillars({
  activePillar,
  onSelectPillar,
}: ClassroomPillarsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleScrollToFeed = () => {
    const feedElement = document.getElementById("classroom-feed");
    const lenis = getLenis();
    if (lenis && feedElement) {
      lenis.scrollTo(feedElement, { offset: -40, duration: 1.0 });
    } else if (feedElement) {
      feedElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleJumpToCard = (cardIndex: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetY =
      scrollTop + rect.top + (cardIndex / (PILLARS.length - 1)) * totalHeight;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[220vh] bg-black text-white"
    >
      {/* Sticky Fullscreen Showcase Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-8 md:px-12 bg-black">
        {/* Top Header & Pillar Switcher Navigation */}
        <div className="relative z-20 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#facc15] shadow-[0_0_10px_#facc15]" />
            <h3 className="text-xs sm:text-sm font-mono tracking-widest text-neutral-400 uppercase">
              Thematic Departments
            </h3>
          </div>

          {/* Quick Pillar Jump Pills */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {PILLARS.map((pillar, idx) => (
              <button
                key={pillar.id}
                onClick={() => handleJumpToCard(idx)}
                className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all duration-300 hover:text-white cursor-pointer flex items-center gap-1.5 text-neutral-400 hover:bg-white/10 whitespace-nowrap shrink-0"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: pillar.accent }}
                />
                <span className="hidden sm:inline">{pillar.title}</span>
                <span className="sm:hidden">Dept {pillar.number}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center Canvas: Stacking & Disappearing Animated Cards */}
        <div className="relative flex-1 w-full my-auto flex items-center justify-center">
          {PILLARS.map((item, index) => (
            <PillarCard
              key={item.id}
              item={item}
              index={index}
              scrollYProgress={scrollYProgress}
              totalItems={PILLARS.length}
              onSelectPillar={onSelectPillar}
              onScrollToFeed={handleScrollToFeed}
            />
          ))}
        </div>

        {/* Bottom Interactive Progress Bar */}
        <div className="relative z-20 w-full flex items-center justify-end text-xs text-neutral-500 font-mono pb-2 sm:pb-0">
          <div className="flex items-center gap-3">
            <span className="uppercase tracking-widest text-[10px]">
              Curriculum Progress
            </span>
            <div className="w-32 sm:w-52 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                className="h-full bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f59e0b]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}