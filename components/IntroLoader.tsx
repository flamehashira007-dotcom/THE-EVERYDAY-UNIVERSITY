"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntro } from "@/context/IntroContext";

const easeCustom = [0.76, 0, 0.24, 1] as const;

export default function IntroLoader() {
  const { isIntroActive, introPhase, setIntroPhase, finishIntro } = useIntro();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isIntroActive || introPhase === "idle" || introPhase === "finished") return;

    if (introPhase === "frame1") {
      // Frame 1 stays for 2.2 seconds then transitions to Frame 2
      const timer1 = setTimeout(() => {
        setIntroPhase("frame2");
      }, 2300);
      return () => clearTimeout(timer1);
    }

    if (introPhase === "frame2") {
      // Frame 2 brand reveal plays for 2.1 seconds then opens curtains
      const timer2 = setTimeout(() => {
        setIntroPhase("curtain");
      }, 2200);
      return () => clearTimeout(timer2);
    }

    if (introPhase === "curtain") {
      // Curtain animation runs for 1.1 seconds then fully cleans up
      const timer3 = setTimeout(() => {
        finishIntro();
      }, 1100);
      return () => clearTimeout(timer3);
    }
  }, [isIntroActive, introPhase, setIntroPhase, finishIntro]);

  if (!mounted || !isIntroActive || introPhase === "idle" || introPhase === "finished") {
    return null;
  }

  const isOpening = introPhase === "curtain";

  const frame1Words = ["THEIR", "STORIES", "ARE", "OUR", "CLASSROOMS."];
  const brandWords = ["THE", "EVERYDAY", "UNIVERSITY"];

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center overflow-hidden select-none"
    >
      {/* Top Curtain Panel */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isOpening ? "-100%" : 0 }}
        transition={{ duration: 1.05, ease: easeCustom }}
        className="absolute top-0 inset-x-0 h-1/2 bg-[#08080a] border-b border-yellow-500/20 shadow-2xl z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(250,204,21,0.06),transparent_70%)]" />
      </motion.div>

      {/* Bottom Curtain Panel */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isOpening ? "100%" : 0 }}
        transition={{ duration: 1.05, ease: easeCustom }}
        className="absolute bottom-0 inset-x-0 h-1/2 bg-[#08080a] border-t border-yellow-500/20 shadow-2xl z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.06),transparent_70%)]" />
      </motion.div>

      {/* Center Cinematic Content Area */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {introPhase === "frame1" && (
            <motion.div
              key="frame1"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                y: -30,
                filter: "blur(12px)",
                transition: { duration: 0.45, ease: [0.32, 0, 0.67, 0] },
              }}
              className="flex flex-col items-center"
            >
              {/* Subtle Tagline / Subheading */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-2 mb-6 px-3.5 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#facc15] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#facc15]">
                  Philosophy
                </span>
              </motion.div>

              {/* Main Frame 1 Typography */}
              <h1 className="font-bebas-neue text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-wider text-white flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
                {frame1Words.map((w, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + idx * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={
                      w.includes("CLASSROOMS")
                        ? "text-[#facc15] drop-shadow-[0_0_25px_rgba(250,204,21,0.45)]"
                        : "text-zinc-100"
                    }
                  >
                    {w}
                  </motion.span>
                ))}
              </h1>

              {/* Animated Accent Line */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "120px", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                className="h-[2px] bg-gradient-to-r from-transparent via-[#facc15] to-transparent mt-8"
              />
            </motion.div>
          )}

          {introPhase === "frame2" && (
            <motion.div
              key="frame2"
              initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                scale: 1.06,
                filter: "blur(14px)",
                transition: { duration: 0.5, ease: easeCustom },
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Radial Center Glow Behind Brand */}
              <div className="absolute -inset-16 bg-yellow-500/15 blur-3xl rounded-full -z-10 pointer-events-none" />

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.4em" }}
                animate={{ opacity: 0.85, letterSpacing: "0.25em" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[11px] sm:text-xs uppercase font-medium text-zinc-400 mb-3 tracking-[0.25em]"
              >
                Official Podcast & Platform
              </motion.p>

              {/* Brand Reveal Frame 12 */}
              <h1 className="font-bebas-neue text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-5 leading-none drop-shadow-2xl">
                {brandWords.map((word, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 40, rotateX: -30 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.15 + idx * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={
                      word === "EVERYDAY"
                        ? "text-[#facc15] font-black drop-shadow-[0_0_35px_rgba(250,204,21,0.55)]"
                        : "text-white"
                    }
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* Progress Charging Bar */}
              <div className="mt-8 sm:mt-10 h-1 w-44 sm:w-64 bg-zinc-800/80 rounded-full overflow-hidden p-[1px] border border-white/10">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-yellow-400 via-[#facc15] to-amber-300 rounded-full shadow-[0_0_12px_#facc15]"
                />
              </div>
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
