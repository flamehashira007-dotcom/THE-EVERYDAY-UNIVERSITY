"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const WORDS = [
  { text: "OUR STORY; ", highlight: true },
  { text: "EVERY GREAT PERSON HAS A STORY. ", highlight: false },
  { text: "BUT TOO OFTEN, WE ONLY HEAR THE PART THAT MADE THEM ", highlight: false },
  { text: "SUCCESSFUL. ", highlight: true },
  {
    text: "WE RARELY HEAR THE STRUGGLES, THE FAILURES, THE SACRIFICES, THE LESSONS, AND THE PEOPLE WHO HELPED SHAPE THEM. ",
    highlight: false,
  },
  { text: "I CREATED ", highlight: false },
  { text: "THE EVERYDAY UNIVERSITY ", highlight: true },
  { text: "BECAUSE I BELIEVE THE WORLD IS FULL OF ", highlight: false },
  { text: "CLASSROOMS THAT DON'T HAVE FOUR WALLS—", highlight: true },
  {
    text: "AND SOME OF THE GREATEST TEACHERS NEVER STOOD IN FRONT OF A CLASSROOM. THIS ISN'T JUST A PODCAST ABOUT SUCCESSFUL PEOPLE. ",
    highlight: false,
  },
  { text: "IT'S A UNIVERSITY OF LIFE.", highlight: true },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const patternRef = useRef<HTMLDivElement | null>(null);
  const patternRefMobile = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: patternProgress } = useScroll({
    target: patternRef,
    offset: ["start end", "start 65%"],
  });

  const { scrollYProgress: patternProgressMobile } = useScroll({
    target: patternRefMobile,
    offset: ["start end", "start 65%"],
  });

  /* Enhanced parallax — text moves slower than page */
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  /* Steven cutout — horizontal parallax and subtle scale */
  const stevenX = useTransform(scrollYProgress, [0, 1], [180, -40]);
  const stevenScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  const patternReveal = useTransform(patternProgress, [0, 1], [100, 0], {
    clamp: true,
  });
  const patternClipPath = useTransform(
    patternReveal,
    (v) => `inset(${v}% 0 0 0)`
  );

  const patternRevealMobile = useTransform(
    patternProgressMobile,
    [0, 1],
    [100, 0],
    { clamp: true }
  );
  const patternClipPathMobile = useTransform(
    patternRevealMobile,
    (v) => `inset(${v}% 0 0 0)`
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen h-auto w-full flex-col justify-center overflow-hidden bg-black py-16 text-white md:min-h-screen md:py-0"
    >
      {/* Content Layout - Text only — parallax y offset */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex h-full w-full flex-col justify-between px-4 sm:px-8 md:px-12 lg:flex-row lg:items-center lg:px-16 xl:px-24 transform-gpu will-change-transform"
      >
        {/* Left Side Text Content */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="my-auto w-full pt-4 pb-[38vh] sm:pb-[44vh] lg:py-8 lg:w-[58%] lg:pb-8 xl:w-[54%]"
        >
          <h2 className="font-bebas-neue text-lg xs:text-xl sm:text-2xl md:text-[1.65rem] lg:text-[1.85rem] xl:text-[2.15rem] uppercase leading-[1.2] sm:leading-[1.12] tracking-tight">
            {WORDS.map((w, i) => (
              <motion.span
                key={i}
                variants={word}
                className={
                  w.highlight
                    ? "font-black text-[#facc15] tracking-normal drop-shadow-[0_0_1px_#facc15]"
                    : "font-normal text-white"
                }
              >
                {w.text}
              </motion.span>
            ))}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.9,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          >
            <Link
              href="/about"
              className="group mt-4 sm:mt-6 inline-flex w-fit items-center gap-2 sm:gap-3 font-bebas-neue text-base sm:text-lg lg:text-xl uppercase font-bold tracking-wide text-[#facc15]"
            >
              <span className="relative">
                Read Our Full Story
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#facc15] transition-all duration-300 group-hover:w-full" />
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Dasi Cutout — pinned flush to bottom */}
      <motion.div
        style={{ x: stevenX, scale: stevenScale }}
        className="pointer-events-none absolute bottom-0 right-0 z-20 h-[52vh] w-full sm:h-[62vh] sm:w-[85%] lg:right-[2%] lg:h-[88vh] lg:w-[48%] xl:right-[4%] xl:w-[45%] transform-gpu will-change-transform"
      >
        <Image
          src="/dasi.png"
          alt="Dasi - The Everyday University"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 48vw"
          className="object-contain object-bottom"
          priority
        />
      </motion.div>

      {/* Desktop Pattern */}
      <motion.div
        ref={patternRef}
        style={{ clipPath: patternClipPath }}
        className="pointer-events-none absolute right-0 bottom-0 z-0 hidden h-14 w-full overflow-hidden md:block lg:h-16 lg:w-[55%] xl:w-[58%]"
      >
        <Image
          src="/pattern.svg"
          alt=""
          fill
          className="object-cover object-bottom"
        />
      </motion.div>

      {/* Mobile Pattern */}
      <motion.div
        ref={patternRefMobile}
        style={{ clipPath: patternClipPathMobile }}
        className="pointer-events-none absolute bottom-0 left-0 z-0 block h-8 w-full overflow-hidden sm:h-10 md:hidden"
      >
        <Image
          src="/pattern.svg"
          alt=""
          fill
          className="object-cover object-bottom"
        />
      </motion.div>
    </section>
  );
}