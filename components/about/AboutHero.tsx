"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative w-full px-6 pt-32 pb-14 md:px-12 lg:px-16 lg:pt-40 lg:pb-16">
      <div className="w-full space-y-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#facc15]">
            ABOUT THE HOST &amp; PLATFORM
          </span>
        </motion.div>

        {/* Large Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.05]"
        >
          I believe everyone has something to teach, and every story has something to{" "}
          <span className="text-[#facc15]">unlock.</span>
        </motion.h1>

        {/* Paragraph description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg sm:leading-relaxed"
        >
          The idea behind The Everyday University started with a simple realization: some of the most valuable lessons in life aren&apos;t found in classrooms. They&apos;re found in people&apos;s experiences.
        </motion.p>

        {/* Two Action Pill Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-4 pt-2"
        >
          <Link
            href="/episodes"
            className="flex w-full sm:w-auto items-center justify-center rounded-full bg-[#facc15] px-8 py-4 text-xs font-black uppercase tracking-wider text-black shadow-lg transition-all hover:scale-105 hover:bg-white text-center"
          >
            Listen to the Podcast
          </Link>
          <Link
            href="/community"
            className="flex w-full sm:w-auto items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-[#facc15] hover:text-[#facc15] text-center"
          >
            Join the Community
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
