"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutStatement() {
  const lessons = [
    "The professor has a lesson.",
    "The entrepreneur has a lesson.",
    "The entertainer has a lesson.",
    "The immigrant has a lesson.",
    "The parent has a lesson.",
    "The person who failed has a lesson.",
  ];

  return (
    <section id="story" className="relative w-full max-w-7xl mx-auto px-6 border-t border-white/10 py-20 md:px-12 md:py-28 lg:px-16 lg:py-36">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Bold Headline & Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 lg:col-span-5"
        >
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#facc15]">
            OUR STORY
          </span>
          <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Every great person has a story.
          </h2>
          <p className="text-base leading-relaxed text-neutral-400 sm:text-lg">
            Too often, we only hear the part that made them successful. We rarely hear the struggles, the failures, the sacrifices, the lessons, and the people who helped shape them.
          </p>
          <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#facc15]">
              The Mission
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300">
              “To help people learn from the journeys of others so they can navigate their own journey with greater wisdom, courage, and purpose.”
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-neutral-400">
              — MC DASI, Host & Founder
            </p>
          </div>
        </motion.div>

        {/* Right Column: Multi-Paragraph Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-6 text-base leading-relaxed text-neutral-300 sm:text-lg sm:leading-relaxed lg:col-span-7"
        >
          <p className="text-xl font-bold text-white sm:text-2xl">
            That is where The Everyday University Podcast was born.
          </p>
          <p>
            I’m MC DASI, a storyteller, host, entrepreneur, technologist, and lifelong learner. My journey has taken me through different worlds—technology, education, business, entertainment, community, and entrepreneurship. And along the way, I discovered something powerful:
          </p>
          <div className="rounded-2xl border border-[#facc15]/20 bg-[#16161c] p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-black uppercase tracking-wider text-[#facc15] sm:text-xl">
              Everyone has something to teach.
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
              {lessons.map((lesson) => (
                <li key={lesson} className="flex items-center gap-2.5 text-neutral-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#facc15] shrink-0" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
          <p>
            And sometimes, the most powerful lessons come from the person nobody has ever heard of.
          </p>
          <p>
            Here, we sit down with extraordinary people and uncover the stories behind the stories. We explore the decisions, struggles, breakthroughs, failures, relationships, sacrifices, and wisdom that shaped their journey.
          </p>
          <p className="font-semibold text-white">
            This isn’t just a podcast about successful people. It’s a university of life.
          </p>
          <p className="pt-2 font-bold text-[#facc15]">
            Because you don’t need a degree to learn something that can change your life. Sometimes, all you need is a story.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
