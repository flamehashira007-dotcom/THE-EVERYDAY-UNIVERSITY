"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface ResourceCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  hasQuoteBadge?: boolean;
}

const RESOURCES: ResourceCard[] = [
  {
    id: "show-notes",
    title: "Episode Show\nNotes",
    subtitle:
      "Access our detailed show notes, key takeaways, and actionable lessons from every guest. Never miss a critical insight.",
    image:
      "https://images.unsplash.com/photo-1629909614456-6b1c5c94cecc?q=80&w=1000&auto=format&fit=crop",
    hasQuoteBadge: true,
  },
  {
    id: "deep-dive",
    title: "Deep-Dive\nDiscussions",
    subtitle:
      "Engage in community workshops and discussions focused on entrepreneurship, storytelling, and personal growth.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "community-insights",
    title: "Community\nInsights",
    subtitle:
      "Insights, resources, and takeaways crowdsourced directly from fellow listeners in our channels.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000&auto=format&fit=crop",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 64, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      delay: i * 0.12,
      ease: EASE,
      when: "beforeChildren",
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  }),
};

const imageVariants: Variants = {
  hidden: { scale: 1.18 },
  visible: {
    scale: 1.05,
    transition: { duration: 1.4, ease: EASE },
  },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export default function CommunityResources() {
  return (
    <section className="relative w-full bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 text-white overflow-hidden">
      <div className="w-full">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerVariants}
        >
          <h2 className="text-3xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight mb-3 sm:mb-4">
            Listener <span className="text-[#facc15]">Resources</span>
          </h2>
          <p className="text-sm sm:text-xl text-neutral-300 leading-relaxed font-light">
            Explore our curated resources designed to help you turn podcast inspiration into daily action.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">
          {RESOURCES.map((res, index) => {
            const titleLines = res.title.split("\n");

            return (
              <motion.div
                key={res.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
                variants={cardVariants}
                className="relative overflow-hidden rounded-2xl sm:rounded-[2.75rem] aspect-[4/5] min-h-[360px] sm:min-h-[480px] bg-zinc-950 border border-white/10 shadow-2xl flex flex-col justify-end p-3.5 sm:p-5 group hover:border-yellow-400/40 transition-colors duration-300"
              >
                {/* Card Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <motion.img
                    src={res.image}
                    alt={res.title}
                    variants={imageVariants}
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>

                {/* Top-Left Quote Badge */}
                {res.hasQuoteBadge && (
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-black/70 backdrop-blur-md border border-yellow-400/30 text-[#facc15] shadow-lg">
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                )}

                {/* Floating dark frosted-glass panel */}
                <motion.div
                  variants={panelVariants}
                  className="relative z-10 w-full rounded-xl sm:rounded-[2rem] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xl border border-white/15 group-hover:border-yellow-400/30 transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <div className="relative p-4 sm:p-7 md:p-8 text-center text-white">
                    <h3 className="text-xl sm:text-3xl lg:text-[2.15rem] font-serif font-normal leading-tight mb-2 sm:mb-4 drop-shadow-sm group-hover:text-yellow-400/95 transition-colors">
                      {titleLines.map((line, li) => (
                        <motion.span key={li} variants={lineVariants} className="block">
                          {line}
                        </motion.span>
                      ))}
                    </h3>
                    <motion.p
                      variants={lineVariants}
                      className="text-xs sm:text-sm md:text-[0.95rem] text-neutral-300 leading-relaxed font-light max-w-xs mx-auto drop-shadow-sm"
                    >
                      {res.subtitle}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}