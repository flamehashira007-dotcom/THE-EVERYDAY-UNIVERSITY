"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Background image moves slower — classic parallax */
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section ref={sectionRef} className="bg-black px-4 lg:px-12 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto w-full overflow-hidden rounded-[2.5rem] min-h-110 sm:min-h-175 flex items-center justify-center border border-white/10 will-change-transform"
      >
        {/* BG — parallax */}
        <motion.div
          className="absolute inset-0 z-0 transform-gpu will-change-transform"
          style={{ y: bgY, scale: bgScale }}
        >
          <Image src="/3DS.png" alt="" fill priority className="object-cover" />
        </motion.div>

        {/* Card — float up with staggered buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex items-center justify-center w-full px-4 py-16 sm:py-20"
        >
          <div className="w-full max-w-3xl rounded-3xl border border-yellow-400/20 bg-black/75 backdrop-blur-md px-6 py-12 text-center sm:px-14 sm:py-16 shadow-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-[#facc15]"
            >
              The Everyday University
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-bebas-neue text-3xl leading-[1.05] tracking-tight text-white sm:text-5xl font-black uppercase"
            >
              Every guest is a <span className="text-[#facc15]">professor.</span>
              <br />
              Every conversation is a <span className="text-[#facc15]">classroom.</span>
              <br />
              Every story is a <span className="text-[#facc15]">lesson.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/classrooms"
                className="flex items-center justify-center rounded-full bg-[#facc15] px-8 py-3.5 text-xs font-black uppercase tracking-wider text-black shadow-lg transition-all hover:scale-105 hover:bg-white"
              >
                Watch the Latest Episode
              </Link>
              <Link
                href="/about"
                className="flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-[#facc15] hover:text-[#facc15]"
              >
                Explore the Stories
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}