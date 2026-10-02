"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutMission() {
  return (
    <section className="relative w-full border-t border-white/10 bg-black px-6 py-20 md:px-12 md:py-28 lg:px-16 lg:py-36">
      <div className="relative mx-auto max-w-4xl space-y-10 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#facc15]">
            OUR MISSION
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          Our Mission
        </motion.h2>

        {/* Core Mission Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0e0e12] p-6 sm:p-10 md:p-12 shadow-2xl"
        >
          <p className="text-base sm:text-xl md:text-2xl font-light text-zinc-100 leading-relaxed italic">
            “To help people learn from real people, discover new perspectives, and turn knowledge into meaningful action. <span className="text-[#facc15] font-normal not-italic">Because the day you stop learning is the day you begin to die.</span>”
          </p>
        </motion.div>

        {/* Welcome statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed"
        >
          So whether you&apos;re here to learn something, share something, meet someone, discover a new perspective, or simply be inspired - welcome to The Everyday University.
        </motion.p>

        {/* Tagline & Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col items-center gap-3 pt-2"
        >
          <p className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider text-white">
            Where legends speak and dreams take flight.
          </p>
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#facc15]">
            <span>People</span>
            <span className="text-neutral-600">|</span>
            <span>Stories</span>
            <span className="text-neutral-600">|</span>
            <span>Purpose</span>
          </div>
        </motion.div>

        {/* Founder Sign-off */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4 text-center space-y-1"
        >
          <p className="text-base sm:text-lg font-black uppercase tracking-wider text-white">
            - MC DASI
          </p>
          <p className="text-xs sm:text-sm uppercase tracking-widest text-[#facc15] font-semibold">
            Founder &amp; Host, The Everyday University
          </p>
        </motion.div>
      </div>
    </section>
  );
}