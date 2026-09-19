"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CommunityHero() {
  return (
    <section className="relative min-h-[100dvh] h-auto sm:h-screen w-full overflow-hidden bg-black text-white flex flex-col justify-end pt-24 sm:pt-0">
      {/* Background Image */}
      <img
        src="https://cdn.prod.website-files.com/671f6145048d666039477704/67503deccc42b344a2208634_hero_about-compressed.avif"
        alt="The Everyday Community"
        className="absolute inset-0 h-full w-full object-cover object-[80%_center] sm:object-center pointer-events-none select-none brightness-75"
      />

      {/* Subtle depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/60 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-end pb-8 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="w-full flex justify-start md:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-left max-w-4xl"
          >
            {/* Main Headline */}
            <h1 className="font-serif text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-[4.8rem] font-normal leading-tight sm:leading-[0.98] tracking-[-0.015em] text-white">
              <span className="block">
                <span className="italic font-light text-[#facc15]">Welcome to</span>
              </span>
              <span className="block">
                The Everyday <span className="text-[#facc15]">Community.</span>
              </span>
            </h1>

            {/* Subtitle / Body Text */}
            <p className="mt-3 sm:mt-7 font-sans text-xs xs:text-sm sm:text-base md:text-[1.15rem] leading-relaxed sm:leading-[1.45] text-neutral-200/95 font-normal tracking-normal max-w-3xl">
              At The Everyday University, the conversation doesn&apos;t end when the episode does. Welcome to a space for lifelong learners, builders, and storytellers to connect. Join our community of listeners to discuss the latest episodes, share your own journey, and grow alongside people who are just as driven to turn inspiration into action.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
