"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const VISION_ITEMS = [
  {
    title: "Business & Entrepreneurship",
    description:
      "A place where a young entrepreneur can learn from a seasoned business owner.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
        <path d="m18 14 3-3-3-3" />
      </svg>
    ),
  },
  {
    title: "Technology & Innovation",
    description:
      "Where a creator can discover a new tool, and technology becomes understandable instead of intimidating.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "Resilience & Growth",
    description:
      "Where someone's story can give another person the courage to keep going.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Everyday Lessons",
    description:
      "Where ordinary people can discover that their experiences may be extraordinary lessons for someone else.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
  },
];

export default function AboutValues() {
  return (
    <section className="relative w-full border-t border-white/10 bg-black px-6 py-24 md:px-12 lg:px-16 lg:py-36">
      <div className="w-full space-y-16 lg:space-y-24">
        {/* Top Header & Manifesto Copy */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#facc15]">
              THE VISION
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            This is bigger than a podcast.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl space-y-5 text-base leading-relaxed text-neutral-300 sm:text-lg sm:leading-relaxed"
          >
            <p className="text-xl sm:text-2xl font-medium text-white leading-relaxed">
              The podcast is where the journey began, but the vision is much bigger. The Everyday University is my way of building a community around lifelong learning - a platform for ideas, stories, education, and connection.
            </p>
          </motion.div>
        </div>

        {/* Bottom Split: 3D Yellow Glass Sculpture & 2x2 Values Grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: 3D Yellow Glass Ribbon Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-3/4 w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-[#141419] to-black p-4 shadow-[0_25px_60px_rgba(250,204,21,0.12)] lg:col-span-5"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
              <Image
                src="/yellow_abstract_glass.jpg"
                alt="Abstract 3D yellow glass ribbon and soundwave structure"
                fill
                priority
                className="object-cover"
              />
              {/* Subtle radiant glow overlay */}
              <div className="absolute inset-0 bg-radial from-yellow-500/10 via-transparent to-black/30 pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Column: 2x2 Values Grid */}
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:col-span-7">
            {VISION_ITEMS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="space-y-4"
              >
                {/* Gold Circle Icon Button */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#facc15] text-black shadow-md">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-white">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
