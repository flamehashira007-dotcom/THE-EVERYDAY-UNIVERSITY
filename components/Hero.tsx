"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Permanent_Marker } from "next/font/google";

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
});

const LOGO_YELLOW = "#facc15";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  // null ref — never attached to DOM; used to freeze useScroll on mobile
  const nullRef = useRef<HTMLElement>(null);

  // Freeze scroll on true phones only (<768px) — desktop elements are hidden there anyway
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // On mobile: nullRef is never attached, so scrollYProgress stays frozen at 0
  // — zero scroll event listeners, zero MotionValue updates during mobile scroll.
  const { scrollYProgress } = useScroll({
    target: isMobile ? nullRef : sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const badgeLeftY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const badgeRightY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] h-[100svh] md:min-h-[100dvh] md:h-[100dvh] w-full overflow-hidden bg-black text-white"
    >
      {/* ── Mobile Video Background ─────────────────────────────────────
          Static — no JS scroll tracking, fully GPU-isolated compositor layer.
          will-change-transform + isolation:isolate forces its own GPU layer
          before first paint so video decode never competes with scroll.
      ────────────────────────────────────────────────────────────────── */}
      <div
        className="md:hidden absolute inset-0 z-0 pointer-events-none will-change-transform transform-gpu"
        style={{ opacity: 0.7, isolation: "isolate" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          <source src="/30 secound vali Final.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Desktop Video Background — scroll-driven parallax ─────────── */}
      <motion.div
        className="hidden md:block absolute inset-0 z-0 opacity-70 transform-gpu pointer-events-none will-change-transform"
        style={{ y: videoY }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover scale-105"
        >
          <source src="/30 secound vali Final.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/30 to-black/60 pointer-events-none" />

      {/* ── Mobile Title — plain HTML, zero JS animation overhead ──────── */}
      <div className="md:hidden relative z-20 flex h-full w-full flex-col items-center justify-center px-4 pb-0 text-center pointer-events-none">
        <div className="relative flex flex-col items-center justify-center text-center font-black uppercase leading-[0.82] tracking-tighter select-none">
          {["THE", "EVERYDAY", "UNIVERSITY"].map((word, i) => (
            <span
              key={word}
              style={{ color: i === 1 ? "#fff" : LOGO_YELLOW }}
              className={i === 1 ? "text-5xl sm:text-7xl" : "text-6xl sm:text-8xl"}
            >
              {word}
            </span>
          ))}
        </div>
        <p className="mt-4 max-w-xl text-center text-sm xs:text-base uppercase tracking-wider text-white/90 font-semibold leading-relaxed">
          Where legends speak and dreams take flight
        </p>
      </div>

      {/* ── Desktop Title — scroll-driven parallax ─────────────────────── */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="hidden md:flex relative z-20 h-full w-full flex-col items-center justify-center px-4 pb-0 text-center transform-gpu will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center justify-center text-center font-black uppercase leading-[0.82] tracking-tighter select-none"
        >
          {["THE", "EVERYDAY", "UNIVERSITY"].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.25 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ color: i === 1 ? "#fff" : LOGO_YELLOW }}
              className={
                i === 1
                  ? "text-5xl sm:text-7xl md:text-[8rem]"
                  : "text-6xl sm:text-8xl md:text-[9rem]"
              }
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-6 max-w-xl text-center text-sm xs:text-base sm:text-lg md:text-2xl uppercase tracking-wider sm:tracking-widest text-white/90 md:text-white/70 font-semibold md:font-medium leading-relaxed"
        >
          Where legends speak and dreams take flight
        </motion.p>
      </motion.div>

      {/* ── Floating Badges — DESKTOP ONLY (lg+ / 1024px+) ─────────────────
          Moved OUTSIDE the desktop title container so visibility is controlled
          independently. `hidden lg:block` guarantees they NEVER appear on any
          screen below 1024px — mobile or tablet — regardless of parent state.
      ────────────────────────────────────────────────────────────────── */}

      {/* Left Purple Badge */}
      <motion.div
        style={{ y: badgeLeftY }}
        initial={{ opacity: 0, x: -40, rotate: -8 }}
        animate={{ opacity: 1, x: 0, rotate: [-8, -12, -8] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.4 },
          x: { duration: 0.8, delay: 0.4 },
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.1, rotate: -4 }}
        className="hidden lg:block absolute left-14 bottom-28 z-30 cursor-pointer transform-gpu will-change-transform"
      >
        <Image
          src="/p.svg"
          alt="Purple Podcast Badge"
          width={120}
          height={120}
          className="h-auto w-36 drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Right Cyan Badge */}
      <motion.div
        style={{ y: badgeRightY }}
        initial={{ opacity: 0, x: 40, rotate: 8 }}
        animate={{ opacity: 1, x: 0, rotate: [8, 12, 8] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.5 },
          x: { duration: 0.8, delay: 0.5 },
          rotate: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.1, rotate: 4 }}
        className="hidden lg:block absolute right-14 top-1/2 -translate-y-1/2 z-30 cursor-pointer transform-gpu will-change-transform"
      >
        <Image
          src="/c.svg"
          alt="Cyan Podcast Badge"
          width={120}
          height={120}
          className="h-auto w-36 drop-shadow-2xl"
          priority
        />
      </motion.div>
    </section>
  );
}
