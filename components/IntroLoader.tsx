"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntro } from "@/context/IntroContext";

const easeCustom = [0.76, 0, 0.24, 1] as const;

interface FrameItem {
  id: number;
  frameNum: string;
  tag?: string;
  type: "single" | "stacked" | "question" | "brand" | "tagline";
  text?: string;
  lines?: string[];
  highlightWords?: string[];
  duration: number; // in milliseconds
}

const FRAMES: FrameItem[] = [
  {
    id: 1,
    frameNum: "01",
    tag: "THE HOOK",
    type: "single",
    text: "EVERYONE HAS A STORY.",
    duration: 1500,
  },
  {
    id: 2,
    frameNum: "02",
    tag: "THE PROMISE",
    type: "single",
    text: "EVERY STORY HAS A LESSON.",
    highlightWords: ["LESSON."],
    duration: 1500,
  },
  {
    id: 3,
    frameNum: "03",
    tag: "THE PURPOSE",
    type: "single",
    text: "AND EVERY LESSON CAN CHANGE A LIFE.",
    highlightWords: ["CHANGE", "A", "LIFE."],
    duration: 1600,
  },
  {
    id: 4,
    frameNum: "04",
    tag: "THE QUESTION",
    type: "question",
    text: "What if the world itself was a university?",
    duration: 1700,
  },
  {
    id: 5,
    frameNum: "05",
    type: "stacked",
    lines: ["No classrooms.", "No exams.", "No tuition."],
    duration: 1800,
  },
  {
    id: 6,
    frameNum: "06",
    type: "single",
    text: "Just people.",
    duration: 1300,
  },
  {
    id: 7,
    frameNum: "07",
    type: "stacked",
    lines: [
      "People who have built something.",
      "People who have lost something.",
      "People who started with nothing.",
    ],
    duration: 2000,
  },
  {
    id: 8,
    frameNum: "08",
    type: "stacked",
    lines: [
      "People who failed—and started again.",
      "People who turned pain into purpose.",
      "People who dared to dream.",
    ],
    duration: 2000,
  },
  {
    id: 9,
    frameNum: "09",
    tag: "THE REVEAL",
    type: "single",
    text: "THESE ARE OUR PROFESSORS.",
    highlightWords: ["PROFESSORS."],
    duration: 1500,
  },
  {
    id: 10,
    frameNum: "10",
    type: "single",
    text: "THEIR LIVES ARE OUR TEXTBOOKS.",
    highlightWords: ["TEXTBOOKS."],
    duration: 1500,
  },
  {
    id: 11,
    frameNum: "11",
    type: "single",
    text: "THEIR STORIES ARE OUR CLASSROOMS.",
    highlightWords: ["CLASSROOMS."],
    duration: 1600,
  },
  {
    id: 12,
    frameNum: "12",
    tag: "BRAND REVEAL",
    type: "brand",
    text: "THE EVERYDAY UNIVERSITY",
    duration: 1800,
  },
  {
    id: 13,
    frameNum: "13",
    tag: "TAGLINE",
    type: "tagline",
    text: "Where legends speak and dreams take flight.",
    duration: 2200,
  },
];

export default function IntroLoader() {
  const { isIntroActive, introPhase, setIntroPhase, finishIntro, skipIntro } = useIntro();
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut (Escape or Space) to skip intro
  useEffect(() => {
    if (!isIntroActive || introPhase === "finished") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Space") {
        e.preventDefault();
        skipIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isIntroActive, introPhase, skipIntro]);

  // Handle frame progression
  useEffect(() => {
    if (!isIntroActive || introPhase !== "playing") return;

    const currentFrame = FRAMES[currentFrameIndex];
    if (!currentFrame) {
      setIntroPhase("curtain");
      return;
    }

    const timer = setTimeout(() => {
      if (currentFrameIndex < FRAMES.length - 1) {
        setCurrentFrameIndex((prev) => prev + 1);
      } else {
        setIntroPhase("curtain");
      }
    }, currentFrame.duration);

    return () => clearTimeout(timer);
  }, [isIntroActive, introPhase, currentFrameIndex, setIntroPhase]);

  // Handle curtain animation timing
  useEffect(() => {
    if (introPhase !== "curtain") return;

    const timer = setTimeout(() => {
      finishIntro();
    }, 1100);

    return () => clearTimeout(timer);
  }, [introPhase, finishIntro]);

  if (!mounted || !isIntroActive || introPhase === "idle" || introPhase === "finished") {
    return null;
  }

  const isOpening = introPhase === "curtain";
  const currentFrame = FRAMES[currentFrameIndex] || FRAMES[0];

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center overflow-hidden select-none bg-black"
    >
      {/* Top Curtain Panel */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isOpening ? "-100%" : 0 }}
        transition={{ duration: 1.05, ease: easeCustom }}
        className="absolute top-0 inset-x-0 h-1/2 bg-[#08080a] shadow-2xl z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(250,204,21,0.06),transparent_70%)]" />
      </motion.div>

      {/* Bottom Curtain Panel */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isOpening ? "100%" : 0 }}
        transition={{ duration: 1.05, ease: easeCustom }}
        className="absolute bottom-0 inset-x-0 h-1/2 bg-[#08080a] shadow-2xl z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.06),transparent_70%)]" />
      </motion.div>

      {/* Skip Intro Button (Top Right) */}
      {!isOpening && (
        <motion.button
          onClick={skipIntro}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute top-6 right-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs font-semibold tracking-wider uppercase text-zinc-300 hover:text-white hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all cursor-pointer group shadow-lg"
        >
          <span>Skip Intro</span>
          <span className="text-[10px] text-zinc-500 group-hover:text-yellow-400 font-mono transition-colors">
            [ESC]
          </span>
          <svg
            className="w-3.5 h-3.5 text-zinc-400 group-hover:text-yellow-400 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </motion.button>
      )}

      {/* Top Frame Progress Bar */}
      {!isOpening && (
        <div className="absolute top-0 inset-x-0 z-30 h-1 bg-zinc-900/60">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-500 to-amber-300 shadow-[0_0_10px_rgba(250,204,21,0.6)]"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentFrameIndex + 1) / FRAMES.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      )}

      {/* Frame Counter Badge (Bottom Center) */}
      {!isOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="absolute bottom-8 inset-x-0 z-30 flex items-center justify-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 pointer-events-none"
        >
          <span>FRAME</span>
          <span className="text-yellow-400 font-bold">{currentFrame.frameNum}</span>
          <span>/</span>
          <span>{FRAMES.length < 10 ? `0${FRAMES.length}` : FRAMES.length}</span>
        </motion.div>
      )}

      {/* Center Cinematic Content Area */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto w-full min-h-[300px]">
        <AnimatePresence mode="wait">
          {!isOpening && (
            <motion.div
              key={`frame-${currentFrame.id}`}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 1.02,
                filter: "blur(10px)",
                transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] },
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center w-full"
            >
              {/* Optional Category / Subheading Badge */}
              {currentFrame.tag && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="flex items-center gap-2 mb-6 px-3.5 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-md"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#facc15] animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#facc15]">
                    {currentFrame.tag}
                  </span>
                </motion.div>
              )}

              {/* RENDER BY FRAME TYPE */}

              {/* 1. SINGLE PHRASE (Hook, Promise, Purpose, Reveal, Textbooks, Classrooms, Just People) */}
              {currentFrame.type === "single" && currentFrame.text && (
                <div className="flex flex-col items-center">
                  <h1 className="font-bebas-neue text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-wider text-white flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
                    {currentFrame.text.split(" ").map((w, idx) => {
                      const isHighlighted = currentFrame.highlightWords?.some((hw) =>
                        w.toUpperCase().includes(hw.toUpperCase().replace(/[.,]/g, ""))
                      );
                      return (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{
                            duration: 0.45,
                            delay: 0.1 + idx * 0.07,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={
                            isHighlighted
                              ? "text-[#facc15] drop-shadow-[0_0_25px_rgba(250,204,21,0.5)]"
                              : "text-zinc-100"
                          }
                        >
                          {w}
                        </motion.span>
                      );
                    })}
                  </h1>

                  {/* Subtle decorative bottom glow line */}
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100px", opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
                    className="h-[2px] bg-gradient-to-r from-transparent via-[#facc15] to-transparent mt-8"
                  />
                </div>
              )}

              {/* 2. THE QUESTION (Frame 04) */}
              {currentFrame.type === "question" && currentFrame.text && (
                <div className="flex flex-col items-center max-w-3xl">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl sm:text-6xl text-yellow-400/30 mb-2 font-serif select-none"
                  >
                    “
                  </motion.div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-zinc-100 tracking-wide leading-snug sm:leading-relaxed font-sans italic">
                    {currentFrame.text}
                  </h2>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="h-[2px] bg-yellow-500/50 mt-6"
                  />
                </div>
              )}

              {/* 3. STACKED MULTI-LINE (Frames 05, 07, 08) */}
              {currentFrame.type === "stacked" && currentFrame.lines && (
                <div className="flex flex-col items-center space-y-3 sm:space-y-4 max-w-3xl">
                  {currentFrame.lines.map((line, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.45,
                        delay: 0.15 + idx * 0.18,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-center gap-3 sm:gap-4"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 shrink-0" />
                      <p
                        className={`text-lg sm:text-2xl md:text-3xl font-medium tracking-wide ${
                          currentFrame.id === 5
                            ? "text-zinc-200 uppercase font-bebas-neue tracking-widest text-2xl sm:text-4xl"
                            : "text-zinc-100 font-sans"
                        }`}
                      >
                        {line}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* 4. BRAND REVEAL (Frame 12) */}
              {currentFrame.type === "brand" && (
                <div className="flex flex-col items-center relative">
                  <div className="absolute -inset-20 bg-yellow-500/15 blur-3xl rounded-full -z-10 pointer-events-none" />

                  <motion.p
                    initial={{ opacity: 0, letterSpacing: "0.5em" }}
                    animate={{ opacity: 0.85, letterSpacing: "0.3em" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-[11px] sm:text-xs uppercase font-medium text-zinc-400 mb-3 tracking-[0.3em]"
                  >
                    Official Podcast & Platform
                  </motion.p>

                  <h1 className="font-bebas-neue text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-5 leading-none drop-shadow-2xl">
                    {["THE", "EVERYDAY", "UNIVERSITY"].map((word, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, y: 40, rotateX: -30 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.15 + idx * 0.12,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={
                          word === "EVERYDAY"
                            ? "text-[#facc15] font-black drop-shadow-[0_0_35px_rgba(250,204,21,0.6)]"
                            : "text-white"
                        }
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h1>
                </div>
              )}

              {/* 5. TAGLINE REVEAL (Frame 13) */}
              {currentFrame.type === "tagline" && (
                <div className="flex flex-col items-center relative">
                  <div className="absolute -inset-24 bg-yellow-500/20 blur-3xl rounded-full -z-10 pointer-events-none" />

                  {/* Brand Header */}
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="font-bebas-neue text-3xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white mb-4"
                  >
                    The <span className="text-[#facc15]">Everyday</span> University
                  </motion.h1>

                  {/* Tagline */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative px-6 py-3 rounded-2xl bg-zinc-900/60 border border-yellow-500/30 backdrop-blur-md shadow-2xl"
                  >
                    <p className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-100 tracking-wide italic">
                      “Where legends speak and dreams take flight.”
                    </p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Center Seam Glow Line when Curtains part */}
      {isOpening && (
        <motion.div
          initial={{ opacity: 1, scaleX: 1 }}
          animate={{ opacity: 0, scaleX: 1.5 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-yellow-400 shadow-[0_0_20px_#facc15] z-30"
        />
      )}
    </div>
  );
}
