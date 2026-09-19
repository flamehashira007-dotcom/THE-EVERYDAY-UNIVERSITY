"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is it free to join the community?",
    answer:
      "Yes! The Everyday University community channels on WhatsApp and Telegram are completely free for all listeners to join.",
  },
  {
    question: "What happens in the community channels?",
    answer:
      "We discuss recent episodes, share personal insights, network with other ambitious individuals, and occasionally drop exclusive updates and behind-the-scenes content.",
  },
  {
    question: "Who is this community for?",
    answer:
      "It’s for anyone who listens to the podcast and believes there is always something new to learn. Whether you are an entrepreneur, a creator, or a professional, if you are looking to navigate your journey with purpose, you belong here.",
  },
];

export default function CommunityFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Title Column */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-tight">
              Frequently <br className="hidden lg:inline" />
              Asked <span className="text-[#facc15]">Questions</span>
            </h2>
          </div>

          {/* Right Accordion Column */}
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl sm:rounded-2xl border border-white/10 bg-zinc-900/80 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-yellow-400/40"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between p-4 sm:p-6 text-left cursor-pointer group"
                  >
                    <span className="text-sm sm:text-lg font-bold text-white group-hover:text-[#facc15] transition-colors pr-3 sm:pr-4">
                      {item.question}
                    </span>
                    <div
                      className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                        isOpen
                          ? "bg-[#facc15] text-black rotate-45 border-transparent shadow-md shadow-yellow-400/20"
                          : "border-white/20 bg-white/5 text-white group-hover:border-[#facc15] group-hover:text-[#facc15]"
                      }`}
                    >
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-1 sm:pt-2 text-neutral-300 text-xs sm:text-base leading-relaxed border-t border-white/10 whitespace-pre-line font-light">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
