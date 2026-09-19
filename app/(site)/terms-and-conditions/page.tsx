"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TermsAndConditionsPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@theeverydayuniversity.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    { id: "acceptance-of-terms", num: "1", title: "Acceptance of Terms" },
    { id: "intellectual-property", num: "2", title: "Intellectual Property" },
    { id: "community-guidelines", num: "3", title: "Community Guidelines" },
    { id: "disclaimers", num: "4", title: "Disclaimers" },
    { id: "third-party-links", num: "5", title: "Third-Party Links" },
    { id: "changes-to-terms", num: "6", title: "Changes to Terms" },
    { id: "contact-us", num: "7", title: "Contact Us" },
  ];

  return (
    <main className="min-h-screen w-full bg-white text-neutral-900 antialiased selection:bg-yellow-200 selection:text-black">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO HEADER (Dark Header for Navbar Contrast)              */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full bg-black pt-32 pb-14 text-white sm:pt-40 sm:pb-20 border-b border-neutral-200">
        <div className="mx-auto max-w-4xl px-6 md:px-8 text-center sm:text-left">
          {/* Title */}
          <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Terms and Conditions
          </h1>

          {/* Effective Date & Switcher Tabs */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 pt-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#facc15]" />
              Effective Date: September 2026
            </div>

            {/* Document Switcher */}
            <div className="flex items-center rounded-full border border-white/20 bg-white/5 p-1 text-xs">
              <Link
                href="/privacy"
                className="rounded-full px-4 py-1.5 font-medium text-white/80 transition hover:text-white hover:bg-white/10"
              >
                Privacy Policy
              </Link>
              <span className="rounded-full bg-[#facc15] px-4 py-1.5 font-bold text-black shadow-sm">
                Terms and Conditions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN DOCUMENT BODY (White Background)                     */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          
          {/* Quick Table of Contents Jump Bar */}
          <div className="mb-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">
              Table of Contents
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="flex items-center gap-2.5 font-medium text-neutral-700 transition hover:text-black hover:translate-x-1"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-[11px] font-bold text-neutral-800">
                    {sec.num}
                  </span>
                  <span className="hover:underline underline-offset-4">{sec.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Document Content */}
          <div className="space-y-12 sm:space-y-16 text-neutral-800 leading-relaxed">
            
            {/* Section 1 */}
            <div id="acceptance-of-terms" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  1
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Acceptance of Terms
                </h2>
              </div>
              <p className="text-base sm:text-lg text-neutral-700">
                By accessing and using The Everyday University website, podcast, and associated 
                community channels, you accept and agree to be bound by the terms and provisions of this 
                agreement. If you do not agree to abide by these terms, please do not use our services.
              </p>
            </div>

            {/* Section 2 */}
            <div id="intellectual-property" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  2
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Intellectual Property
                </h2>
              </div>
              <p className="text-base sm:text-lg text-neutral-700">
                All content published on this website and podcast—including but not limited to audio 
                episodes, video clips, text, graphics, logos, and &ldquo;The Classrooms&rdquo; curriculum concepts—is 
                the exclusive property of The Everyday University and MC DASI. You may not reproduce, 
                distribute, or create derivative works from our content without explicit written permission. 
                Sharing our content via official social media links or embedding our public podcast players 
                is permitted and encouraged.
              </p>
            </div>

            {/* Section 3 */}
            <div id="community-guidelines" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  3
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Community Guidelines
                </h2>
              </div>
              <p className="text-base sm:text-lg text-neutral-700 mb-4">
                Our WhatsApp and Telegram channels are designed to be safe, respectful, and educational 
                spaces for our listeners. By joining, you agree to:
              </p>
              <ul className="space-y-3 text-base sm:text-lg text-neutral-700 pl-1 mb-5">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#facc15]" />
                  <span>Treat all members and guests with respect.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#facc15]" />
                  <span>Refrain from posting spam, unauthorized promotions, or malicious links.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#facc15]" />
                  <span>Avoid hate speech, harassment, or discriminatory remarks.</span>
                </li>
              </ul>
              <p className="text-base sm:text-lg text-neutral-700 font-medium">
                We reserve the right to moderate, suspend, or ban any user who violates these guidelines, 
                without prior notice.
              </p>
            </div>

            {/* Section 4 */}
            <div id="disclaimers" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  4
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Disclaimers
                </h2>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
                <p className="text-base sm:text-lg text-neutral-700">
                  The content provided by The Everyday University—including episodes, masterclasses, and 
                  community discussions—is for informational and educational purposes only. It does not 
                  constitute professional business, financial, legal, or medical advice. We make no guarantees 
                  regarding the accuracy, completeness, or practical outcome of the strategies and lessons 
                  discussed by our host or guests. You are solely responsible for how you choose to apply this 
                  information to your own life or business.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div id="third-party-links" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Third-Party Links
                </h2>
              </div>
              <p className="text-base sm:text-lg text-neutral-700">
                Our website and show notes may contain links to third-party websites or services that are 
                not owned or controlled by us. We assume no responsibility for the content, privacy 
                policies, or practices of any third-party sites.
              </p>
            </div>

            {/* Section 6 */}
            <div id="changes-to-terms" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  6
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Changes to Terms
                </h2>
              </div>
              <p className="text-base sm:text-lg text-neutral-700">
                We reserve the right to modify these Terms and Conditions at any time. We will notify users 
                of significant changes by updating the &ldquo;Effective Date&rdquo; at the top of this page. Continued use 
                of the website following any changes constitutes acceptance of the new terms.
              </p>
            </div>

            {/* Section 7 */}
            <div id="contact-us" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  7
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Contact Us
                </h2>
              </div>
              <p className="text-base sm:text-lg text-neutral-700 mb-6">
                For any questions regarding these Terms and Conditions, please reach out to us at:
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#facc15] text-black">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Official Inquiries
                    </span>
                    <a
                      href="mailto:hello@theeverydayuniversity.com"
                      className="font-bold text-neutral-900 hover:text-yellow-600 transition"
                    >
                      hello@theeverydayuniversity.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-neutral-800 active:scale-95 cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy Email"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
