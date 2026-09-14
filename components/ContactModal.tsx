"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

const INQUIRY_TYPES = ["Guest Pitch", "Sponsorship", "General Inquiry"];

const SOCIALS = [
  { label: "YouTube", href: "https://www.youtube.com/@TheEverydayUniversity" },
  { label: "Instagram", href: "https://www.instagram.com/theeverydayuniversity" },
  { label: "TikTok", href: "https://www.tiktok.com/@the.everyday.univ" },
  { label: "Twitter", href: "https://x.com/everydayunivers" },
  { label: "Facebook", href: "https://www.facebook.com/people/The-Everyday-University/61574664033182/" },
];

const FACTS = [
  { value: "24h", label: "Avg. reply time" },
  { value: "100+", label: "Stories shared" },
  { value: "50K+", label: "Listeners" },
];

/* Animation variants */
const sectionReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const panelLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const panelRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const factPop = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
  },
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const underline =
    "border-b border-neutral-400 bg-transparent px-2 pb-1 text-black placeholder-neutral-400 outline-none transition focus:border-black font-semibold";

  return (
    <section id="contact" className="relative w-full bg-black px-4 py-20 text-white sm:py-28 lg:px-8">
      {/* Pill heading — reveal */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 mb-8 flex w-full justify-center select-none sm:mb-12"
      >
        <div className="relative inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3 shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/20 sm:px-10 sm:py-4">
          <Sparkles className="h-4 w-4 text-black" />
          <span className="text-xl font-extrabold tracking-tight text-black sm:text-3xl lg:text-4xl">
            Get in Touch
          </span>
        </div>
      </motion.div>

      {/* Dark shell — staggered left/right panels */}
      <motion.div
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto flex w-full max-w-7xl flex-col gap-6 rounded-[2.5rem] border border-white/10 bg-[#070709] p-4 shadow-2xl sm:p-6 lg:flex-row"
      >
        {/* Left info panel */}
        <motion.div
          variants={panelLeft}
          className="flex w-full flex-col justify-between rounded-[2rem] border border-white/5 bg-[#0e0e11] p-6 sm:p-8 lg:w-84 lg:shrink-0"
        >
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#facc15] animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#facc15]">
                Let’s connect
              </span>
            </div>
            <h3 className="mb-3 text-2xl font-extrabold tracking-tight text-white">
              Pitch a Story or Partner With Us
            </h3>
            <p className="mb-8 text-sm leading-relaxed text-neutral-400">
              Know someone whose story belongs in our classroom? Want to sponsor an episode? Fill out the form and our team will get back to you.
            </p>

            <div className="mb-8 space-y-3 text-sm">
              <a
                href="mailto:hello@theeverydayuniversity.com"
                className="block font-semibold text-white transition hover:text-[#facc15]"
              >
                hello@theeverydayuniversity.com
              </a>
            </div>

            {/* Facts Grid */}
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
              }}
              className="mb-8 grid grid-cols-3 gap-2 border-y border-white/10 py-5"
            >
              {FACTS.map((f) => (
                <motion.div key={f.label} variants={factPop}>
                  <div className="text-lg font-black text-[#facc15] sm:text-xl">
                    {f.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-neutral-500 font-semibold">
                    {f.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Socials */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            className="flex flex-wrap gap-2"
          >
            {SOCIALS.map((s) => (
              <motion.a
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-[#141419] px-3.5 py-1.5 text-xs font-semibold text-neutral-300 transition hover:border-[#facc15] hover:text-[#facc15]"
              >
                {s.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Form Card — Conversational Style */}
        <motion.div
          variants={panelRight}
          className="relative flex-1 rounded-[2rem] border border-neutral-800 bg-white p-6 text-lg font-medium leading-relaxed text-black sm:p-10 sm:text-2xl lg:text-[1.65rem]"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex min-h-[420px] flex-col items-center justify-center text-center space-y-6"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-[#facc15] shadow-xl">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-2 max-w-lg">
                  <h3 className="text-3xl font-extrabold text-black">
                    Message Sent!
                  </h3>
                  <p className="text-base font-normal leading-relaxed text-neutral-600">
                    Thank you, <strong className="font-semibold text-black">{name || "there"}</strong>. We’ve received your message and will follow up with you at <strong className="font-semibold text-black">{email}</strong>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setCompany("");
                    setEmail("");
                    setMessage("");
                  }}
                  className="rounded-full bg-black px-8 py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-[#facc15] hover:text-black transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full space-y-8">
                <div>
                  <p className="mb-6 font-bold text-neutral-900">
                    Hello, The Everyday University team!
                  </p>

                  {/* Name + company inline row */}
                  <div className="mb-8 flex flex-wrap items-baseline gap-x-3 gap-y-4">
                    <span className="shrink-0 text-neutral-700">My name is</span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="YOUR NAME"
                      className={`w-full sm:w-auto sm:min-w-40 sm:flex-1 text-base uppercase tracking-wider ${underline}`}
                    />
                    <span className="shrink-0 text-neutral-700">from</span>
                    <input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="COMPANY/ORGANIZATION - OPTIONAL"
                      className={`w-full sm:w-auto sm:min-w-48 sm:flex-1 text-base uppercase tracking-wider ${underline}`}
                    />
                  </div>

                  {/* Inquiring regarding dropdown/pills */}
                  <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-3">
                    <span className="shrink-0 text-neutral-700">I’m reaching out regarding:</span>
                    <div className="inline-flex flex-wrap gap-2">
                      {INQUIRY_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setInquiryType(type)}
                          className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition sm:text-sm cursor-pointer ${
                            inquiryType === type
                              ? "border-yellow-400 bg-yellow-400 text-black font-bold"
                              : "border-neutral-400 text-neutral-600 hover:border-neutral-700"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Details */}
                  <div className="mb-8 space-y-2">
                    <span className="block text-sm font-bold uppercase tracking-wider text-neutral-600">
                      Here are the details:
                    </span>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="TELL US ABOUT THE STORY, SPONSORSHIP, OR INQUIRY..."
                      rows={2}
                      className={`w-full resize-none text-sm uppercase tracking-wider placeholder-neutral-400 ${underline}`}
                    />
                  </div>

                  {/* Email row */}
                  <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-4">
                    <span className="shrink-0 text-neutral-700">Contact me back at:</span>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="YOUR EMAIL"
                      className={`w-full sm:w-80 text-base uppercase tracking-wider ${underline}`}
                    />
                    <span className="hidden sm:inline text-neutral-700">.</span>
                  </div>
                </div>

                {/* Submit button container pushed to the right */}
                <div className="flex w-full justify-end pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-[#facc15] text-xs font-bold tracking-[0.2em] text-black transition sm:h-36 sm:w-36 sm:text-sm hover:brightness-105 disabled:opacity-50 cursor-pointer uppercase"
                  >
                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                  </motion.button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}