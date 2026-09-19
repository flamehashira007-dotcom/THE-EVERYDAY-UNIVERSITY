"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "The Classrooms", href: "/classrooms" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@TheEverydayUniversity" },
  { label: "Instagram", href: "https://www.instagram.com/theeverydayuniversity" },
  { label: "TikTok", href: "https://www.tiktok.com/@the.everyday.univ" },
  { label: "Twitter", href: "https://x.com/everydayunivers" },
  { label: "Facebook", href: "https://www.facebook.com/people/The-Everyday-University/61574664033182/" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="w-full bg-black px-6 py-12 text-white md:px-12 lg:py-16">
      <div className="w-full space-y-6">
        {/* ============================================================ */}
        {/* 1. TOP PILLS ROW: Quick Links                                */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 sm:gap-4"
        >
          {QUICK_LINKS.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
            >
              <Link
                href={item.href}
                className="flex h-14 items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-xs sm:text-sm font-bold tracking-wide text-black shadow-sm transition-all hover:bg-neutral-100 text-center"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* ============================================================ */}
        {/* 2. MAIN 2 FEATURE CARDS                                      */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* ----------------- LEFT CARD: Newsletter (Yellow BG) ----------------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#facc15] p-8 text-black shadow-2xl sm:p-10"
          >
            {/* Header info */}
            <div className="text-center">
              <h3 className="text-2xl font-black tracking-tight text-black sm:text-3xl">
                The Everyday University Newsletter
              </h3>
              <p className="mt-2 text-sm font-medium text-black/80">
                Join the classroom. Get the latest lessons and stories sent straight to your inbox.
              </p>
            </div>

            {/* Illustration: Envelope graphic in bold black lineart */}
            <div className="my-8 flex items-center justify-center py-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="relative"
              >
                <svg
                  viewBox="0 0 260 220"
                  className="h-44 w-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.25)] sm:h-52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Shadow beneath */}
                  <ellipse
                    cx="130"
                    cy="200"
                    rx="105"
                    ry="12"
                    fill="#000000"
                    fillOpacity="0.3"
                  />
                  <polygon
                    points="45,160 120,205 215,160 130,200"
                    fill="#000000"
                    opacity="0.25"
                  />

                  {/* Letter paper sliding out with "R" */}
                  <g>
                    <polygon
                      points="60,55 200,55 200,140 60,140"
                      fill="#eab308"
                      stroke="#000000"
                      strokeWidth="4.5"
                      strokeLinejoin="round"
                    />
                    {/* Folded top flap on letter */}
                    <polygon
                      points="60,55 88,83 88,55"
                      fill="#ca8a04"
                      stroke="#000000"
                      strokeWidth="3.5"
                    />
                    {/* Bold "R" emblem on the letter */}
                    <path
                      d="M98 75 H138 Q154 75 154 91 Q154 103 142 107 L158 126 H140 L126 109 H114 V126 H98 V75 Z M114 87 V99 H136 Q140 99 140 93 Q140 87 136 87 Z"
                      fill="#000000"
                    />
                  </g>

                  {/* Envelope Base Body */}
                  <polygon
                    points="40,110 130,175 220,110 220,175 40,175"
                    fill="#fde047"
                    stroke="#000000"
                    strokeWidth="4.5"
                    strokeLinejoin="round"
                  />

                  {/* Front envelope flap folds */}
                  <polygon
                    points="40,110 130,170 40,175"
                    fill="#eab308"
                    stroke="#000000"
                    strokeWidth="4.5"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="220,110 130,170 220,175"
                    fill="#ca8a04"
                    stroke="#000000"
                    strokeWidth="4.5"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="40,175 130,135 220,175"
                    fill="#facc15"
                    stroke="#000000"
                    strokeWidth="4.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Bottom Form: Pill Input with Submit Button */}
            <form onSubmit={handleNewsletterSubmit} className="w-full">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full rounded-full bg-white py-3.5 pl-6 pr-14 text-sm font-medium text-black placeholder-neutral-500 shadow-md outline-none transition focus:ring-2 focus:ring-black"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all hover:bg-neutral-800 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>

          {/* ----------------- RIGHT CARD: Archive (White BG) ----------------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-8 text-black shadow-2xl sm:p-10"
          >
            {/* Header info */}
            <div className="text-center">
              <h3 className="text-2xl font-black tracking-tight text-black sm:text-3xl">
                Archive
              </h3>
              <p className="mt-2 font-serif text-sm italic text-neutral-700">
                Where legends speak and dreams take flight.
              </p>
            </div>

            {/* Illustration: Isometric Book / Ledger graphic */}
            <div className="my-8 flex items-center justify-center py-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="relative"
              >
                <svg
                  viewBox="0 0 260 220"
                  className="h-44 w-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] sm:h-52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Shadow beneath */}
                  <ellipse
                    cx="130"
                    cy="195"
                    rx="95"
                    ry="12"
                    fill="#000000"
                    fillOpacity="0.85"
                  />

                  {/* Bookmark ribbon tags at top */}
                  <polygon points="90,40 100,25 106,44" fill="#ffffff" stroke="#000000" strokeWidth="2.5" />
                  <polygon points="106,36 116,20 122,40" fill="#facc15" stroke="#000000" strokeWidth="2.5" />
                  <polygon points="124,38 136,24 140,42" fill="#ffffff" stroke="#000000" strokeWidth="2.5" />

                  {/* Pages Side / Edge (Ribbed layers) */}
                  <path
                    d="M80 82 L150 178 L170 162 L98 68 Z"
                    fill="#e4e4e7"
                    stroke="#000000"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  {/* Book Spine (Left side) */}
                  <path
                    d="M80 82 L98 68 L172 135 L150 152 Z"
                    fill="#000000"
                    stroke="#000000"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  {/* Bottom book pages thickness */}
                  <path
                    d="M150 178 L192 142 L170 128 L126 162 Z"
                    fill="#ffffff"
                    stroke="#000000"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />

                  {/* Top Cover Surface */}
                  <polygon
                    points="95,70 172,135 220,95 145,35"
                    fill="#ffffff"
                    stroke="#000000"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />

                  {/* Inner cover border */}
                  <polygon
                    points="108,72 168,124 206,92 148,44"
                    fill="#f4f4f5"
                    stroke="#000000"
                    strokeWidth="2"
                  />

                  {/* Bold "R" Brand Badge on Cover */}
                  <g transform="translate(138, 72) rotate(14) scale(0.65)">
                    <path
                      d="M0 0 H36 Q50 0 50 14 Q50 24 40 28 L54 44 H38 L26 30 H14 V44 H0 V0 Z M14 10 V20 H34 Q38 20 38 15 Q38 10 34 10 Z"
                      fill="#000000"
                    />
                  </g>
                </svg>
              </motion.div>
            </div>

            {/* Bottom Button: Pill "Take Me There" */}
            <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
              <Link
                href="/classrooms"
                className="flex h-12 w-full items-center justify-center rounded-full border border-black bg-transparent text-xs font-black uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white"
              >
                <span className="font-bold tracking-widest text-black transition-colors hover:text-white">
                  Take Me There
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* 3. BOTTOM UTILITY BAR: Legal / Copyright / Socials           */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center justify-between gap-4 rounded-full border border-neutral-200 bg-white p-5 text-xs text-neutral-600 shadow-sm sm:flex-row"
        >
          {/* Left: Policy links */}
          <div className="flex flex-wrap items-center gap-6">
            <a href="#privacy" className="font-semibold text-black transition hover:opacity-70">
              Privacy Policy
            </a>
            <a href="#terms" className="font-semibold text-black transition hover:opacity-70">
              Terms and Conditions
            </a>
          </div>

          {/* Center: Copyright */}
          <div className="font-medium text-neutral-700">
            &copy; 2026 THE EVERYDAY UNIVERSITY
          </div>

          {/* Right: Socials with exact provided URLs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-black transition hover:text-[#facc15]"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}