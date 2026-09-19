"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const TIMELINE = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1];
const X_STOPS = ["0vw", "0vw", "0vw", "-100vw", "-100vw", "-200vw", "-200vw", "-200vw"];

function HeroSlide({
  image,
  heading,
  description,
  growProgress,
}: {
  image: string;
  heading: React.ReactNode;
  description: string;
  growProgress: MotionValue<number>;
}) {
  const scale = useTransform(growProgress, [0, 1], [0.65, 1]);
  const radius = useTransform(growProgress, [0, 1], [40, 0]);
  const textOpacity = useTransform(growProgress, [0.4, 1], [0, 1]);
  const textY = useTransform(growProgress, [0.4, 1], [30, 0]);

  return (
    <div className="relative h-screen w-screen shrink-0 overflow-hidden bg-black">
      <motion.div
        style={{
          scale,
          transformOrigin: "50% 100%",
          borderRadius: radius,
        }}
        className="relative h-full w-full overflow-hidden bg-[#0a0a0a] text-white border border-white/10"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        </div>

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 grid h-full grid-cols-1 items-end gap-3 sm:gap-6 md:gap-8 p-4 pb-8 sm:p-12 sm:pb-16 md:p-20 md:pb-20 lg:grid-cols-12"
        >
          <div className="lg:col-span-6">
            <h2 className="font-serif text-2xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              {heading}
            </h2>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl sm:rounded-3xl border border-white/15 bg-black/60 p-4 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
              <p className="text-xs sm:text-lg font-light leading-relaxed text-neutral-200 sm:text-xl">
                {description}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Knowledge Hub (4-Block Grid)                                      */
/* ------------------------------------------------------------------ */

const knowledgeGridBlocks = [
  {
    title: "Comprehensive Show Summaries",
    description:
      "Key takeaways, frameworks, and actionable checklists distilled from every podcast episode.",
  },
  {
    title: "Mastermind Discussions",
    description:
      "Deep-dive conversations focused on entrepreneurship, storytelling, leadership, and personal growth.",
  },
  {
    title: "Crowdsourced Playbooks",
    description:
      "Proven strategies and real-world wisdom shared directly by our ambitious listener community.",
  },
  {
    title: "Community Q&A Channels",
    description:
      "Connect in real-time on WhatsApp and Telegram to discuss episodes and share insights.",
  },
];

function KnowledgeHubSlide({ revealProgress }: { revealProgress: MotionValue<number> }) {
  const opacity = useTransform(revealProgress, [0, 1], [0, 1]);
  const y = useTransform(revealProgress, [0, 1], [24, 0]);

  return (
    <div className="flex h-screen w-screen shrink-0 items-center justify-center overflow-hidden bg-black px-3 sm:px-8 md:px-12 lg:px-16">
      <motion.div
        style={{ opacity, y }}
        className="flex flex-col lg:flex-row w-full max-w-7xl items-center justify-center gap-3 sm:gap-8 lg:gap-12 xl:gap-16 max-h-[96vh] sm:max-h-[94vh] py-2"
      >
        {/* Intro Section */}
        <div className="flex w-full lg:w-[35%] shrink-0 flex-col items-center text-center lg:items-start lg:text-left justify-center">
          <h2 className="mb-1.5 sm:mb-4 font-serif text-xl sm:text-4xl lg:text-5xl xl:text-6xl text-white tracking-tight leading-tight">
            Knowledge <span className="text-[#facc15]">Hub</span>
          </h2>
          <p className="mb-3 sm:mb-6 max-w-md text-[11px] sm:text-sm md:text-base font-light leading-relaxed text-neutral-300">
            Access all episode notes, frameworks, and community takeaways on the go, making it easier than ever to turn inspiration into daily action.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://whatsapp.com/channel/0029VbBhIhc6hENregzRy92m"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center justify-center rounded-full bg-[#facc15] px-5 sm:px-8 py-2 sm:py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-black shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-300 active:scale-95"
            >
              JOIN CHANNELS ↗
            </a>
          </div>
        </div>

        {/* 2x2 Knowledge Cards Grid */}
        <div className="grid w-full lg:w-[65%] grid-cols-2 gap-2 sm:gap-4 md:gap-5">
          {knowledgeGridBlocks.map((card) => (
            <div
              key={card.title}
              className="group rounded-xl sm:rounded-2xl border border-white/10 bg-zinc-900/80 p-2.5 sm:p-5 md:p-6 lg:p-7 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-yellow-400/40 hover:bg-zinc-800/90 flex flex-col justify-start"
            >
              <div className="mb-1.5 sm:mb-3.5 flex h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#facc15] to-[#eab308] text-[10px] sm:text-sm md:text-base font-black text-black shadow-md shadow-yellow-400/20 group-hover:scale-110 transition-transform shrink-0">
                ✓
              </div>
              <h4 className="mb-0.5 sm:mb-1.5 font-serif text-[11px] sm:text-base md:text-lg lg:text-xl text-white group-hover:text-[#facc15] transition-colors leading-snug line-clamp-2 sm:line-clamp-none">
                {card.title}
              </h4>
              <p className="text-[9px] sm:text-xs md:text-sm font-light leading-relaxed text-neutral-300 line-clamp-2 sm:line-clamp-none">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function CommunityCardsScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, TIMELINE, X_STOPS);

  const hero1Grow = useTransform(scrollYProgress, [0, 0.15], [0, 1], { clamp: true });
  const resourceReveal = useTransform(scrollYProgress, [0.3, 0.45], [0, 1], { clamp: true });
  const hero2Grow = useTransform(scrollYProgress, [0.75, 0.9], [0, 1], { clamp: true });

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <motion.div style={{ x }} className="flex h-screen">
          {/* Slide 1: The Podcast Community in your Pocket */}
          <HeroSlide
            image="/Copy of IMG_2145.JPG"
            heading={
              <>
                Your podcast community <br />
                <span className="italic text-[#facc15]">in your pocket</span>
              </>
            }
            description="Stay connected and access curated wisdom anytime, anywhere. Connect directly with fellow listeners, builders, and storytellers in our official WhatsApp and Telegram channels."
            growProgress={hero1Grow}
          />

          {/* Slide 2: Knowledge Hub */}
          <KnowledgeHubSlide revealProgress={resourceReveal} />

          {/* Slide 3: Live Meetups and Listener Discussions */}
          <HeroSlide
            image="/Copy of IMG_2357.JPG"
            heading={
              <>
                Live Meetups and <br className="hidden sm:inline" />
                <span className="italic text-[#facc15]">Listener Discussions</span>
              </>
            }
            description="Never miss a community gathering with our real-time updates on WhatsApp and Telegram, featuring live discussion rooms, virtual roundtables, and listener insights."
            growProgress={hero2Grow}
          />

        </motion.div>
      </div>
    </section>
  );
}