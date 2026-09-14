"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black px-6 pt-24 pb-16 text-center md:px-12 lg:px-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center space-y-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#facc15]">
            Contact Us
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05]"
        >
          Pitch a Story or
          <br />
          <span className="text-[#facc15]">Partner With Us.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg sm:leading-relaxed"
        >
          Know someone whose story belongs in our classroom? Interested in sponsoring an episode or partnering with The Everyday University? We’d love to hear from you.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row w-full sm:w-auto items-center justify-center gap-4 pt-2"
        >
          <a
            href="#contact-form"
            className="flex w-full sm:w-auto items-center justify-center rounded-full bg-[#facc15] px-8 py-4 text-xs font-black uppercase tracking-wider text-black shadow-lg transition-all hover:scale-105 hover:bg-white"
          >
            Send A Message
          </a>
          <a
            href="#cal-booking"
            className="flex w-full sm:w-auto items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-[#facc15] hover:text-[#facc15]"
          >
            Book A Strategy Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
