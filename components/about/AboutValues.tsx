"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const VALUE_ITEMS = [
  {
    title: "Every Guest is a Professor",
    description:
      "Real people who have built something, lost something, failed, and started again.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.247 7.761a6 6 0 0 1 0 8.478m2.828-11.306a10 10 0 0 1 0 14.134m-14.15 0a10 10 0 0 1 0-14.134m2.828 11.306a6 6 0 0 1 0-8.478" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "Every Story is a Lesson",
    description:
      "Extracting actionable wisdom, not just celebrating success.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0m1 7v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    title: "Every Conversation is a Classroom",
    description:
      "An open space for vulnerable, deep, and transformative dialogues.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Every Listener is a Student",
    description:
      "Empowering you to navigate your own journey with greater courage and purpose.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
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
              OUR PHILOSOPHY
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            The Everyday Curriculum
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl space-y-5 text-base leading-relaxed text-neutral-300 sm:text-lg sm:leading-relaxed"
          >
            <p className="text-xl sm:text-2xl font-medium text-white">
              We aren't here for surface-level interviews. We are here to uncover the untold dimensions of the world's most fascinating people.
            </p>
            <p>
              Every conversation on The Everyday University is structured as a living classroom. We unpack the turning points, the quiet sacrifices, and the hard-won insights that formal education rarely teaches.
            </p>
            <p className="font-bold text-white">
              <span className="text-neutral-400">Not just to inspire you for a moment. </span>
              <span className="text-[#facc15]">To equip you for a lifetime.</span>
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
            {VALUE_ITEMS.map((item, idx) => (
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
