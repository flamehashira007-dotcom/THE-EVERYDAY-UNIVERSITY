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
            ABOUT US
          </span>
        </motion.div>

        {/* Large Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05]"
        >
          Welcome to the
          <br />
          <span className="text-[#facc15]">University of Life.</span>
        </motion.h1>

        {/* Paragraph description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg sm:leading-relaxed"
        >
          We believe the world is full of classrooms that don’t have four walls—and some of the greatest teachers never stood in front of a classroom. The Everyday University is a platform dedicated to extracting wisdom from real lives and making that wisdom accessible to everyone.
        </motion.p>

        {/* Two Action Pill Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-4 pt-2"
        >
          <a
            href="#story"
            className="flex w-full sm:w-auto items-center justify-center rounded-full bg-[#facc15] px-8 py-4 text-xs font-black uppercase tracking-wider text-black shadow-lg transition-all hover:scale-105 hover:bg-white text-center"
          >
            Meet the Host
          </a>
          <Link
            href="/#Classrooms"
            className="flex w-full sm:w-auto items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-[#facc15] hover:text-[#facc15] text-center"
          >
            Explore the Stories
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
