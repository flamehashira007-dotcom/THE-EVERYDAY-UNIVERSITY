"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutStatement() {
  return (
    <section id="story" className="relative w-full max-w-7xl mx-auto px-6 border-t border-white/10 py-20 md:px-12 md:py-28 lg:px-16 lg:py-36">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        {/* Left Column: Founder Photo & Letter Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 lg:col-span-5 lg:sticky lg:top-28"
        >
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#facc15]">
            FOUNDER&apos;S LETTER
          </span>
          <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
            My Story &amp; Why I Do What I Do
          </h2>

          {/* Photo of MC DASI */}
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-neutral-900">
            <Image
              src="/Copy of IMG_2963.jpg"
              alt="MC DASI - Founder & Host"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-sm font-bold text-white">MC DASI</p>
              <p className="text-xs text-[#facc15] font-medium tracking-wide">Founder &amp; Host, The Everyday University</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#facc15]">
              Core Philosophy
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300 italic">
              “Every person is a classroom. Every conversation is a lesson. Every story has the potential to change someone else&apos;s life.”
            </p>
          </div>
        </motion.div>

        {/* Right Column: Personal Letter Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-6 text-base leading-relaxed text-neutral-300 sm:text-lg sm:leading-relaxed lg:col-span-7"
        >
          <p className="text-xl font-bold text-white sm:text-2xl">
            I&apos;ve always been fascinated by people - their journeys, their struggles, their breakthroughs, their failures, and the decisions that shaped who they became.
          </p>

          <p>
            As a host, storyteller, entrepreneur, and lifelong learner, I&apos;ve had the opportunity to meet people from different backgrounds, industries, generations, and walks of life. And I&apos;ve discovered something powerful:
          </p>

          <div className="rounded-2xl border border-[#facc15]/30 bg-[#16161c] p-6 sm:p-8 space-y-3 shadow-lg">
            <p className="text-lg sm:text-xl font-extrabold text-[#facc15] leading-snug">
              Every person is a classroom. Every conversation is a lesson. Every story has the potential to change someone else&apos;s life.
            </p>
          </div>

          <p className="font-semibold text-white">
            That&apos;s why I created The Everyday University.
          </p>

          <p>
            This isn&apos;t a traditional university. There are no lecture halls, exams, or degrees required. Our classroom is the real world.
          </p>

          <p>
            Through conversations, documentaries, interviews, technology, business, personal development, culture, and real-life experiences, we explore the ideas that can help everyday people learn, grow, connect, and create impact.
          </p>

          <p>
            I&apos;m particularly passionate about making complex ideas understandable and useful - from AI and emerging technology to money, careers, entrepreneurship, leadership, creativity, and personal growth. I don&apos;t believe you have to be an expert to start learning, and I don&apos;t believe learning should ever stop.
          </p>

          <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-6 sm:p-7 space-y-2">
            <h3 className="text-lg font-black uppercase tracking-wider text-[#facc15] sm:text-xl">
              Why do I do it?
            </h3>
            <p className="text-base text-neutral-200 sm:text-lg font-medium">
              Because I know what it feels like to be on a journey of figuring things out.
            </p>
          </div>

          <p>
            I&apos;ve learned that success isn&apos;t simply about how much you know. It&apos;s about your willingness to keep learning, to ask better questions, to listen to people who have walked different paths, and to turn knowledge into action.
          </p>

          <p className="pt-2 font-bold text-[#facc15] text-lg sm:text-xl">
            And now, I want to create a platform where other people can do the same.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
