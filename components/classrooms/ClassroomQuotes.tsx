"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface QuoteItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  episode: string;
  highlight: string;
}

const QUOTES: QuoteItem[] = [
  {
    id: "quote-1",
    quote:
      "That’s very understandable because with left hemisphere thinking, one of the problems is that you see everything as a series of problems that must have mechanical solutions.",
    highlight: "left hemisphere thinking",
    author: "Iain McGilchrist",
    role: "Neuroscientist & Philosopher",
    episode: "Episode 230 • The Divided Brain",
  },
  {
    id: "quote-2",
    quote:
      "The worst thing you can do to people is make them feel that whatever they do, it doesn’t matter. What we call in psychology learned helplessness.",
    highlight: "learned helplessness",
    author: "Maren Urner",
    role: "Professor, Sustainable Transformation",
    episode: "Episode 215 • Action & Psychology",
  },
  {
    id: "quote-3",
    quote:
      "We cannot have hundreds of real relationships that are healthy because each requires time, full attention, and real presence with another human being.",
    highlight: "real relationships",
    author: "Steven Njang",
    role: "Host & Creator",
    episode: "Frankly 159 • The Real Work",
  },
  {
    id: "quote-4",
    quote:
      "AI will automate intelligence, but it will never automate wisdom, human empathy, or lived experience. That is our irreplaceable human classroom.",
    highlight: "irreplaceable human classroom",
    author: "Dr. Nelvis",
    role: "Tech Strategist & Healthcare Leader",
    episode: "Episode 16 • Wisdom Over Algorithms",
  },
];

export default function ClassroomQuotes() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextQuote = () => setActiveIndex((prev) => (prev + 1) % QUOTES.length);
  const prevQuote = () => setActiveIndex((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);

  const current = QUOTES[activeIndex];

  return (
    <section className="relative w-full bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 text-white overflow-hidden border-t border-white/10">
      {/* Sleek Dynamic Curving Wave SVG (Replicated from the Reference Site) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full pointer-events-none opacity-25">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="quoteWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="30%" stopColor="#facc15" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>
          <path
            fill="none"
            stroke="url(#quoteWaveGrad)"
            strokeWidth="2.5"
            d="M0,160 C320,300 420,40 720,160 C1020,280 1180,60 1440,160"
          />
          <path
            fill="none"
            stroke="#facc15"
            strokeWidth="1"
            strokeDasharray="6 6"
            opacity="0.4"
            d="M0,180 C360,60 520,300 820,180 C1120,60 1280,260 1440,180"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Top Header Label */}
        <div className="flex items-center gap-2 sm:gap-2.5 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-[#facc15] shadow-[0_0_10px_#facc15]" />
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#facc15] font-bold">
            THOUGHTS & PERSPECTIVES
          </span>
        </div>

        {/* Dynamic Interactive Quote Container */}
        <div className="w-full max-w-4xl mx-auto min-h-[300px] sm:min-h-[220px] flex items-center justify-center text-center px-2 sm:px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -25, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-900/90 border border-white/10 text-[#facc15] mb-1 sm:mb-2 shadow-lg">
                <Quote className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </div>

              <blockquote className="font-serif text-lg sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-[1.3] sm:leading-[1.25] text-white tracking-tight">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="flex flex-col items-center gap-1 pt-2">
                <cite className="not-italic text-sm sm:text-base md:text-lg font-bold text-white tracking-wide">
                  {current.author}
                </cite>
                <span className="text-xs sm:text-sm text-neutral-400 font-light">
                  {current.role} •{" "}
                  <span className="text-[#facc15] font-medium">{current.episode}</span>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center justify-between w-full max-w-xs mt-12 pt-6 border-t border-white/10">
          <button
            onClick={prevQuote}
            aria-label="Previous quote"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-zinc-900/80 text-neutral-300 hover:border-[#facc15] hover:text-[#facc15] transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Indicator Pills */}
          <div className="flex items-center gap-2">
            {QUOTES.map((q, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive ? "w-8 bg-[#facc15]" : "w-2 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                  aria-label={`Jump to quote ${idx + 1}`}
                />
              );
            })}
          </div>

          <button
            onClick={nextQuote}
            aria-label="Next quote"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-zinc-900/80 text-neutral-300 hover:border-[#facc15] hover:text-[#facc15] transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
