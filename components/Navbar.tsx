"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuOverlay from "./MenuOverlay";
import Link from "next/link";
import { useIntro } from "@/context/IntroContext";

const LOGO_YELLOW = "#facc15";
const boing = { type: "spring", stiffness: 220, damping: 14, mass: 0.9 } as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isIntroActive, introPhase } = useIntro();

  // Hide navbar during frames 1 & 2, then animate down smoothly when curtains open
  const isHiddenByIntro = isIntroActive && (introPhase === "frame1" || introPhase === "frame2");

  return (
    <>
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isHiddenByIntro ? -100 : 0,
          opacity: isHiddenByIntro ? 0 : 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          delay: introPhase === "curtain" ? 0.3 : 0,
        }}
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-12"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-bebas-neue text-xl sm:text-3xl font-bold tracking-tight text-white md:text-4xl transition hover:opacity-90"
        >
          The <span style={{ color: LOGO_YELLOW }}>Everyday</span> University
        </Link>

        <div className="flex items-center gap-3">
          {/* Glassmorphism Hamburger Button */}
          <motion.button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={boing}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/20 cursor-pointer"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
            >
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && <MenuOverlay onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}