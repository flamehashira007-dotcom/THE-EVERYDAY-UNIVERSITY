"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";

type TimelineEvent = {
  year: string;
  title: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
  blurImage: string;
  blurAlt: string;
  side: "left" | "right"; // which side the main photo sits on (desktop)
};

const EVENTS: TimelineEvent[] = [
  {
    year: "1992",
    title: "Born",
    location: "Botswana",
    description:
      "Born to a Nigerian mother and an English father. His mum is the hardest working person Steven's ever encountered - Nigerian, strong and courageous. Steven's dad is the most loving and caring man he's ever known - from Coventry.",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Family together",
    blurImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    blurAlt: "Portrait",
    side: "left",
  },
  {
    year: "1994",
    title: "Moves to Plymouth England",
    location: "Plymouth",
    description: "Growing up in Plymouth Steven went to Plymstock School.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Childhood",
    blurImage:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=800&auto=format&fit=crop",
    blurAlt: "Childhood portrait",
    side: "right",
  },
  {
    year: "2010",
    title: "Drops out of Manchester Metropolitan University",
    location: "Manchester",
    description:
      "Steven enrols in a Business Management Course at Manchester Metropolitan University. Drops out quickly at 18 years old and starts working on his first business idea.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "University building",
    blurImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    blurAlt: "Portrait",
    side: "left",
  },
];

/* ── Scroll-reveal wrapper (IntersectionObserver, no dependencies) ── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function PinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="inline-block shrink-0"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function BlurPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mb-10 h-48 w-44 md:h-64 md:w-60">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 176px, 240px"
        className="scale-110 object-cover blur-2xl [mask-image:radial-gradient(120%_120%_at_50%_50%,black_30%,transparent_75%)]"
      />
    </div>
  );
}

export default function Timeline() {
  return (
    <section className="relative bg-black font-oswald text-white">
      {/* ── Hero heading (smaller, cleaner) ─────────────── */}
      <Reveal>
        <div className="px-6 pb-16 pt-24 md:px-16 md:pt-32 lg:px-24">
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold uppercase leading-[1.02] tracking-tight">
            From Humble
            <br />
            Beginnings
          </h1>
        </div>
      </Reveal>

      {/* ── Timeline ────────────────────────────────────── */}
      <div className="relative">
        {/* centre line — full height, all screen sizes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/40"
        />

        {EVENTS.map((event) => (
          <article key={event.year} className="relative">
            {/* year — bolder, sits on the line */}
            <div className="relative z-10 flex justify-center">
              <Reveal>
                <h2 className="bg-black px-6 text-[clamp(3.25rem,8vw,6.5rem)] font-bold leading-none tracking-tight text-lime">
                  {event.year}
                </h2>
              </Reveal>
            </div>

            {/* wide horizontal spacing between columns */}
            <div className="mx-auto grid max-w-[90rem] grid-cols-1 items-center gap-14 px-6 pb-36 pt-16 md:grid-cols-2 md:gap-28 md:px-16 lg:gap-44 lg:px-24">
              {/* main photo */}
              <Reveal
                delay={100}
                className={
                  event.side === "right"
                    ? "md:order-2 lg:pl-16"
                    : "md:order-1 lg:pr-16"
                }
              >
                <div className="group relative aspect-[4/3] w-full [mask-image:radial-gradient(150%_150%_at_50%_50%,black_55%,transparent_100%)]">
                  <Image
                    src={event.image}
                    alt={event.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                  />
                </div>
              </Reveal>

              {/* text + blurred portrait */}
              <Reveal
                delay={200}
                className={
                  event.side === "right"
                    ? "md:order-1 lg:pr-16"
                    : "md:order-2 lg:pl-16"
                }
              >
                <BlurPhoto src={event.blurImage} alt={event.blurAlt} />

                <h3 className="max-w-md text-2xl font-semibold uppercase leading-tight md:text-4xl">
                  {event.title}
                </h3>

                <p className="mt-4 flex items-center gap-2 text-base uppercase tracking-wide text-lime">
                  <PinIcon />
                  {event.location}
                </p>

                <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                  {event.description}
                </p>
              </Reveal>
            </div>
          </article>
        ))}
      </div>

      {/* ── CTA ─────────────────────────────────────────── */}
      <Reveal>
        <div className="flex justify-center pb-28">
          <button className="rounded-full border-2 border-lime px-10 py-3 text-sm uppercase tracking-[0.2em] text-lime transition-all duration-300 hover:bg-lime hover:text-black">
            See full timeline
          </button>
        </div>
      </Reveal>
    </section>
  );
}