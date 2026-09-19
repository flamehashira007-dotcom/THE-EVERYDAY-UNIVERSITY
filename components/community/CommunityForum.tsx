"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CommunityForum() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const badge1Y = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const badge2Y = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-16 sm:py-24 md:py-36 px-4 sm:px-8 md:px-12 text-white overflow-hidden"
    >
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-20 items-center">
          {/* Left Column: Image with Parallax & Floating Category Badges */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-6 w-full relative group"
          >
            <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.75rem] lg:rounded-[3rem] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full bg-zinc-950 shadow-2xl border border-white/10 group-hover:border-yellow-400/40 transition-colors">
              <motion.div
                style={{ y: imageY, scale: 1.2 }}
                className="absolute inset-0 w-full h-full will-change-transform"
              >
                <img
                  src="/6735f1bb835823b06517dc34_image_2.avif"
                  alt="Join the conversation"
                  className="w-full h-full object-cover object-center brightness-90"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

              {/* Floating Badge 1 */}
              <motion.div
                style={{ y: badge1Y }}
                className="absolute top-3 right-3 sm:top-7 sm:right-7 z-10 flex items-center gap-1.5 sm:gap-2.5 rounded-full border border-yellow-400/30 bg-black/80 backdrop-blur-md px-3 py-1.5 sm:px-5 sm:py-2.5 text-white shadow-xl select-none"
              >
                <span className="text-xs sm:text-lg">💬</span>
                <span className="text-[10px] sm:text-sm font-medium text-[#f2eee9] tracking-wide">
                  Live Discussions
                </span>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div
                style={{ y: badge2Y }}
                className="absolute bottom-3 left-3 sm:bottom-7 sm:left-7 z-10 flex items-center gap-1.5 sm:gap-2.5 rounded-full border border-yellow-400/30 bg-black/80 backdrop-blur-md px-3 py-1.5 sm:px-5 sm:py-2.5 text-white shadow-xl select-none"
              >
                <span className="text-xs sm:text-lg">🎙️</span>
                <span className="text-[10px] sm:text-sm font-medium text-[#f2eee9] tracking-wide">
                  Community Q&A
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Title, Description & Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="lg:col-span-6 w-full flex flex-col items-start lg:pl-4 xl:pl-8"
          >
            <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.25rem] font-serif text-white tracking-tight leading-[1.05] mb-4 sm:mb-8">
              Join the <br className="hidden sm:inline" />
              <span className="text-[#facc15]">Conversation</span>
            </h2>
            <p className="text-sm sm:text-xl md:text-2xl text-neutral-300 leading-relaxed mb-6 sm:mb-10 font-light max-w-xl">
              The podcast conversation never stops, and the best lessons often come from the listeners sitting right next to you. Connect with fellow fans, discuss the latest episodes in real-time, ask questions, and share your own unique story in our official community channels.
            </p>

            {/* Buttons & Links */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="https://whatsapp.com/channel/0029VbBhIhc6hENregzRy92m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-6 sm:px-9 py-3 sm:py-4 text-xs sm:text-base font-black uppercase tracking-wider text-black shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>JOIN ON WHATSAPP</span>
                <span>↗</span>
              </a>

              <a
                href="https://t.me/+gBwQlGPfJr1iNGNh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#229ED9] hover:bg-[#1e8cc0] px-6 sm:px-9 py-3 sm:py-4 text-xs sm:text-base font-black uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>JOIN ON TELEGRAM</span>
                <span>↗</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
