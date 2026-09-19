"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@theeverydayuniversity.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    { id: "information-we-collect", num: "1", title: "Information We Collect" },
    { id: "how-we-use", num: "2", title: "How We Use Your Information" },
    { id: "cookies-analytics", num: "3", title: "Cookies and Analytics" },
    { id: "third-party-services", num: "4", title: "Third-Party Services" },
    { id: "social-media-embedded", num: "5", title: "Social Media and Embedded Content" },
    { id: "how-we-protect", num: "6", title: "How We Protect Your Information" },
    { id: "how-long-we-keep", num: "7", title: "How Long We Keep Information" },
    { id: "your-choices", num: "8", title: "Your Choices" },
    { id: "childrens-privacy", num: "9", title: "Children's Privacy" },
    { id: "links-to-other-websites", num: "10", title: "Links to Other Websites" },
    { id: "changes-to-privacy-policy", num: "11", title: "Changes to This Privacy Policy" },
    { id: "contact-us", num: "12", title: "Contact Us" },
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
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-white/90">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#facc15]" />
                Effective Date: September 20, 2026
              </span>
              <span className="text-white/60">•</span>
              <span className="text-white/70">Last Updated: September 20, 2026</span>
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
          
          {/* Welcome Intro Box */}
          <div className="mb-10 rounded-2xl border border-neutral-200 bg-neutral-50/80 p-6 sm:p-8 text-neutral-700 leading-relaxed space-y-4">
            <p className="text-base sm:text-lg font-medium text-neutral-900">
              Welcome to <strong>The Everyday University</strong> (“we,” “us,” or “our”). We respect your privacy and are committed to protecting the information you provide when you visit our website, interact with our content, subscribe to our communications, or use our services.
            </p>
            <p className="text-sm sm:text-base text-neutral-600">
              This Privacy Policy explains what information we collect, how we use it, and the choices you have regarding your information.
            </p>
          </div>

          {/* Quick Table of Contents Jump Bar */}
          <div className="mb-12 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
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
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[11px] font-bold text-neutral-800">
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
            <div id="information-we-collect" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  1
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Information We Collect
                </h2>
              </div>
              <p className="mb-4">
                Depending on how you interact with our website, we may collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-5">
                <li><strong>Contact information</strong>, such as your name and email address.</li>
                <li><strong>Information you voluntarily provide</strong>, such as messages, comments, feedback, guest inquiries, or submissions.</li>
                <li><strong>Transaction information</strong> if you purchase products, services, tickets, or other offerings through our website. Payment information may be processed directly by third-party payment providers.</li>
                <li><strong>Technical information</strong>, such as IP address, browser type, device type, pages visited, and general website usage information.</li>
                <li><strong>Cookies and similar technologies</strong> used to remember preferences, understand website traffic, and improve the user experience.</li>
              </ul>
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs sm:text-sm text-neutral-600">
                We do not intentionally collect sensitive personal information unless it is necessary for a specific service and you voluntarily provide it.
              </div>
            </div>

            {/* Section 2 */}
            <div id="how-we-use" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  2
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  How We Use Your Information
                </h2>
              </div>
              <p className="mb-4">We may use information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Operate and maintain The Everyday University website.</li>
                <li>Respond to questions, inquiries, and requests.</li>
                <li>Send newsletters, announcements, or other communications you have requested.</li>
                <li>Improve our website, content, products, and services.</li>
                <li>Understand how visitors use our website.</li>
                <li>Promote podcasts, interviews, events, educational content, and related offerings.</li>
                <li>Process purchases or registrations.</li>
                <li>Prevent fraud, abuse, or unauthorized activity.</li>
                <li>Comply with applicable legal obligations.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="cookies-analytics" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  3
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Cookies and Analytics
                </h2>
              </div>
              <p className="mb-3">
                The Everyday University may use cookies, analytics tools, and similar technologies to understand website traffic and improve our services.
              </p>
              <p className="mb-3">
                These technologies may collect information such as pages viewed, approximate location, device information, and how visitors interact with the website.
              </p>
              <p>
                You may be able to control cookies through your browser or device settings.
              </p>
            </div>

            {/* Section 4 */}
            <div id="third-party-services" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  4
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Third-Party Services
                </h2>
              </div>
              <p className="mb-4">
                We may use third-party providers to help operate our website and business, including services for:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5 text-sm">
                <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-800" /> Website hosting
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-800" /> Analytics
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-800" /> Email / newsletters
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-800" /> Payment processing
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-800" /> Video & podcast hosting
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-800" /> Social media & marketing
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2 col-span-1 sm:col-span-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-800" /> Event registration
                </div>
              </div>
              <p className="mb-3 text-sm text-neutral-600">
                These third parties may process information according to their own privacy policies.
              </p>
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs sm:text-sm font-medium text-amber-900">
                We do not sell your personal information to third parties for their independent marketing purposes.
              </div>
            </div>

            {/* Section 5 */}
            <div id="social-media-embedded" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Social Media and Embedded Content
                </h2>
              </div>
              <p className="mb-3">
                Our website may contain links to or embedded content from platforms such as YouTube, Instagram, Facebook, TikTok, LinkedIn, and other services.
              </p>
              <p className="text-neutral-600">
                When you interact with those platforms, they may collect information according to their own privacy policies. We encourage you to review the privacy policies of any third-party platform you use.
              </p>
            </div>

            {/* Section 6 */}
            <div id="how-we-protect" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  6
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  How We Protect Your Information
                </h2>
              </div>
              <p className="mb-3">
                We take reasonable administrative, technical, and organizational measures to protect personal information from unauthorized access, disclosure, alteration, or destruction.
              </p>
              <p className="text-neutral-600">
                However, no website or internet transmission can be guaranteed to be completely secure.
              </p>
            </div>

            {/* Section 7 */}
            <div id="how-long-we-keep" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  7
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  How Long We Keep Information
                </h2>
              </div>
              <p>
                We retain personal information only for as long as reasonably necessary to fulfill the purposes described in this Privacy Policy, provide our services, maintain appropriate business records, resolve disputes, and comply with legal obligations.
              </p>
            </div>

            {/* Section 8 */}
            <div id="your-choices" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  8
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Your Choices
                </h2>
              </div>
              <p className="mb-3">You may:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Unsubscribe</strong> from marketing emails by using the unsubscribe link included in the communication.</li>
                <li><strong>Contact us</strong> to request access to or correction of personal information we maintain about you.</li>
                <li><strong>Request deletion</strong> of your personal information, subject to applicable legal or business requirements.</li>
                <li><strong>Adjust browser settings</strong> to manage cookies and tracking preferences.</li>
              </ul>
              <p className="text-sm text-neutral-600">
                To make a privacy-related request, contact us using the information below.
              </p>
            </div>

            {/* Section 9 */}
            <div id="childrens-privacy" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  9
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Children&apos;s Privacy
                </h2>
              </div>
              <p className="mb-3">
                The Everyday University is not intended to knowingly collect personal information from children under the age of 13 without appropriate parental consent.
              </p>
              <p className="text-neutral-600">
                If you believe a child has provided personal information to us without appropriate consent, please contact us so that we can review and take appropriate action.
              </p>
            </div>

            {/* Section 10 */}
            <div id="links-to-other-websites" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  10
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Links to Other Websites
                </h2>
              </div>
              <p className="mb-3">
                Our website may contain links to websites operated by other organizations or individuals.
              </p>
              <p className="text-neutral-600">
                We are not responsible for the privacy practices, security, or content of third-party websites. We encourage visitors to review the privacy policies of those websites.
              </p>
            </div>

            {/* Section 11 */}
            <div id="changes-to-privacy-policy" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  11
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Changes to This Privacy Policy
                </h2>
              </div>
              <p className="mb-3">
                We may update this Privacy Policy from time to time to reflect changes in our website, services, technology, or legal requirements.
              </p>
              <p className="text-neutral-600">
                When we make changes, we will update the &ldquo;Last Updated&rdquo; date at the top of this policy.
              </p>
            </div>

            {/* Section 12 */}
            <div id="contact-us" className="scroll-mt-32">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-[#facc15]">
                  12
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Contact Us
                </h2>
              </div>
              <p className="mb-5">
                If you have questions about this Privacy Policy or want to make a privacy-related request, please contact:
              </p>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
                  <div>
                    <h3 className="font-bold text-lg text-neutral-900">The Everyday University</h3>
                    <p className="text-xs text-neutral-500 uppercase tracking-wider font-mono mt-0.5">Location: Maryland, USA</p>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs font-bold text-[#facc15] hover:bg-neutral-800 transition cursor-pointer self-start sm:self-auto"
                  >
                    <span>{copied ? "✓ Copied Email" : "Copy Email"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-neutral-500">Email Address</span>
                    <a href="mailto:hello@theeverydayuniversity.com" className="font-semibold text-neutral-900 hover:text-yellow-600 hover:underline">
                      hello@theeverydayuniversity.com
                    </a>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-neutral-500">Official Website</span>
                    <a href="https://theeverydayuniversity.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-neutral-900 hover:text-yellow-600 hover:underline">
                      https://theeverydayuniversity.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Back Link */}
          <div className="mt-16 sm:mt-24 border-t border-neutral-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} The Everyday University. All rights reserved.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-bold text-neutral-900 hover:text-yellow-600 transition"
            >
              ← Back to Homepage
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
