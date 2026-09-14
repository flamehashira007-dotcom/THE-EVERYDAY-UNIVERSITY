"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface GuestTestimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const LEFT_COLUMN_GUESTS: GuestTestimonial[] = [
  {
    quote:
      "“The Everyday University is the classroom I wish I had early in my career. MC DASI cuts past the surface and digs into the authentic struggles and pivotal decisions that truly shape a life.”",
    name: "Dr. Marcus Vance",
    role: "Leadership Strategist & Guest Professor",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "“Sitting down for this conversation felt completely different from standard press interviews. We didn't talk about achievements; we talked about the moments when everything was on the line.”",
    name: "Elena Rostova",
    role: "Tech Founder & Series Guest",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "“Listening to these stories changed how I handle setback in my own company. You quickly realize that failure isn’t a dead end—it’s the foundational syllabus.”",
    name: "Dean Gardner",
    role: "Entrepreneur & Lifelong Listener",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
];

const RIGHT_COLUMN_GUESTS: GuestTestimonial[] = [
  {
    quote:
      "“Every episode of The Everyday University is a masterclass in resilience and perspective. MC DASI creates an open space where guests can be vulnerable, raw, and generous with their wisdom.”",
    name: "Maya Patel",
    role: "Creative Director & Community Member",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "“You don’t need an MBA when you have access to real dialogues like these. The Everyday University proves that some of the greatest teachers never stood in front of a lecture hall.”",
    name: "Saif Hameed",
    role: "Founder & Investor",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
  },
];

function GuestCard({ guest, index }: { guest: GuestTestimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col justify-between rounded-[2rem] border border-white/10 bg-[#0f0f13] p-8 shadow-lg transition-all duration-300 hover:border-[#facc15]/30 hover:bg-[#13131a] hover:shadow-[0_15px_35px_rgba(250,204,21,0.06)] md:p-10"
    >
      {/* Quote text */}
      <p className="text-base leading-relaxed text-neutral-200 sm:text-lg sm:leading-relaxed">
        {guest.quote}
      </p>

      {/* Author Details */}
      <div className="mt-8 flex items-center gap-4 pt-4">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/20 bg-neutral-800">
          <Image
            src={guest.avatar}
            alt={guest.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-base font-bold text-white group-hover:text-[#facc15] transition-colors">
            {guest.name}
          </h4>
          <p className="truncate text-xs font-medium text-neutral-400 sm:text-sm">
            {guest.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutGuests() {
  return (
    <section className="relative w-full border-t border-white/10 bg-black px-6 py-24 md:px-12 lg:px-16 lg:py-36">
      <div className="w-full space-y-16">
        {/* Centered Eyebrow */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#facc15]">
              THE PROFESSORS
            </span>
          </motion.div>
        </div>

        {/* 2-Column Staggered Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {LEFT_COLUMN_GUESTS.map((guest, idx) => (
              <GuestCard key={guest.name} guest={guest} index={idx} />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {RIGHT_COLUMN_GUESTS.map((guest, idx) => (
              <GuestCard key={guest.name} guest={guest} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
