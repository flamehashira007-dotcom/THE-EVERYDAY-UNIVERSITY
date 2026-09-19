"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@theeverydayuniversity.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    { id: "introduction", num: "1", title: "Introduction" },
    { id: "information-we-collect", num: "2", title: "Information We Collect" },
    { id: "how-we-use", num: "3", title: "How We Use Your Information" },
    { id: "sharing-information", num: "4", title: "Sharing Your Information" },
    { id: "your-rights", num: "5", title: "Your Rights & Choices" },
    { id: "contact-us", num: "6", title: "Contact Us" },
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
            Privacy Policy
          </h1>

          {/* Effective Date & Switcher Tabs */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 pt-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#facc15]" />
              Effective Date: September 2026
            </div>

            {/* Document Switcher */}
            <div className="flex items-center rounded-full border border-white/20 bg-white/5 p-1 text-xs">
              <span className="rounded-full bg-[#facc15] px-4 py-1.5 font-bold text-black shadow-sm">
                Privacy Policy
              </span>
              <Link
                href="/terms-and-conditions"
                className="rounded-full px-4 py-1.5 font-medium text-white/80 transition hover:text-white hover:bg-white/10"
              >
                Terms and Conditions
              </Link>
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
            <div id="introduction" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  1
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Introduction
                </h2>
              </div>
              <p className="text-base sm:text-lg text-neutral-700">
                Welcome to The Everyday University (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed to protecting 
                your privacy and ensuring you have a positive experience on our website and within our 
                community. This Privacy Policy explains how we collect, use, and safeguard your personal 
                information when you visit our website, listen to our podcast, subscribe to our newsletter, 
                or join our official community channels (e.g., WhatsApp, Telegram).
              </p>
            </div>

            {/* Section 2 */}
            <div id="information-we-collect" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  2
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Information We Collect
                </h2>
              </div>
              <ul className="space-y-4 text-base sm:text-lg text-neutral-700">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-neutral-900" />
                  <div>
                    <strong className="text-neutral-900">Personal Information:</strong> We may collect your name, email address, and any other details you provide when you subscribe to our newsletter, fill out our contact/pitch forms, or join our community.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-neutral-900" />
                  <div>
                    <strong className="text-neutral-900">Usage Data:</strong> We automatically collect non-identifiable data regarding your interaction with our website, such as IP addresses, browser types, and pages visited, to help us improve the user experience.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-neutral-900" />
                  <div>
                    <strong className="text-neutral-900">Community Data:</strong> When you participate in our WhatsApp or Telegram groups, your profile name, phone number (on WhatsApp), and messages are visible to us and other community members in accordance with the respective platform&rsquo;s privacy settings.
                  </div>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="how-we-use" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  3
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  How We Use Your Information
                </h2>
              </div>
              <p className="text-base sm:text-lg text-neutral-700 mb-4">
                We use the collected data to:
              </p>
              <ul className="space-y-3 text-base sm:text-lg text-neutral-700 pl-1">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#facc15]" />
                  <span>Deliver our newsletter, podcast updates, and curated courses to your inbox.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#facc15]" />
                  <span>Respond to your inquiries, pitches, or sponsorship requests.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#facc15]" />
                  <span>Manage, moderate, and improve our listener community.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#facc15]" />
                  <span>Analyze website traffic to optimize our content and user experience.</span>
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div id="sharing-information" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  4
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Sharing Your Information
                </h2>
              </div>
              <p className="text-base sm:text-lg text-neutral-700">
                We do not sell, rent, or trade your personal information to third parties. We may share basic 
                data with trusted third-party service providers (such as email hosting or analytics 
                platforms) strictly for the purpose of operating our website and delivering our content.
              </p>
            </div>

            {/* Section 5 */}
            <div id="your-rights" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Your Rights &amp; Choices
                </h2>
              </div>
              <p className="text-base sm:text-lg text-neutral-700">
                You have the right to opt out of our newsletter at any time by clicking the &ldquo;unsubscribe&rdquo; link 
                at the bottom of our emails. You may also leave our community channels at any time or 
                contact us to request the deletion of your personal data from our records.
              </p>
            </div>

            {/* Section 6 */}
            <div id="contact-us" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  6
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Contact Us
                </h2>
              </div>
              <p className="text-base sm:text-lg text-neutral-700 mb-6">
                If you have any questions or concerns regarding this Privacy Policy, please contact us at:
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
