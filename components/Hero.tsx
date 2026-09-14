"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Permanent_Marker } from "next/font/google";

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
});

const LOGO_YELLOW = "#facc15  ";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const badgeLeftY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const badgeRightY = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-70"
        style={{ y: videoY, scale: videoScale }}
      >
        <iframe
          src="https://player.vimeo.com/video/1047927010?badge=0&autopause=0&player_id=0&autoplay=1&loop=1&muted=1&background=1&app_id=58479"
          className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.77vh] min-w-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          title="Hero background video"
        />
      </motion.div>

      <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/30 to-black/60" />

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4 pb-0 md:justify-end md:pb-14"
      >

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
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
                  ? "text-5xl sm:text-7xl md:text-[8rem] "
                  : "text-6xl sm:text-8xl md:text-[9rem] "
              }
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Small subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-center text-sm uppercase tracking-wide text-white/50 md:text-2xl"
        >
          Where legends speak and dreams take 
        </motion.p>

        {/* Floating Left Purple Badge (p.svg) */}
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
          className="absolute left-8 bottom-28 hidden cursor-pointer lg:block md:left-14"
        >
          <Image
            src="/p.svg"
            alt="Purple Podcast Badge"
            width={120}
            height={120}
            className="h-auto w-28 md:w-36 drop-shadow-2xl"
            priority
          />
        </motion.div>

        {/* Floating Right Green/Cyan Badge (c.svg) */}
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
          className="absolute right-8 top-1/2 hidden -translate-y-1/2 cursor-pointer lg:block md:right-14"
        >
          <Image
            src="/c.svg"
            alt="Cyan Podcast Badge"
            width={120}
            height={120}
            className="h-auto w-28 md:w-36 drop-shadow-2xl"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}