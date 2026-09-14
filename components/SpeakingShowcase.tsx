"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface EventImage {
  id: string;
  src: string;
  alt: string;
}

const EVENT_IMAGES: EventImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=1000&auto=format&fit=crop",
    alt: "Keynote speaking on stage in auditorium",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    alt: "Large corporate event audience and keynote stage",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1000&auto=format&fit=crop",
    alt: "Panel discussion with microphone interview",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000&auto=format&fit=crop",
    alt: "Keynote presentation at podium with stage screen",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop",
    alt: "Auditorium keynote speech with live lighting",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop",
    alt: "Leadership conference fireside chat",
  },
];

/* Larger, high-contrast partner logos in site palette */
function NyuLogo() {
  return (
    <div className="flex items-center gap-3.5 text-white/90 transition-colors hover:text-[#facc15]">
      {/* NYU Torch Icon */}
      <svg className="h-9 w-9 fill-current" viewBox="0 0 32 32">
        <path d="M16 2C15.2 4.5 13 7.5 13 10C13 12.2 14.8 14 17 14C17.6 14 18 13.6 18 13C18 11.5 17 10 17 8.5C18.5 9.5 20 11.2 20 13.5C20 16.5 17.5 19 14.5 19C11.5 19 9 16.5 9 13.5C9 8.5 14 4 16 2Z" />
        <path d="M12 21H20V23H12V21ZM13 24H19V26H13V24ZM14 27H18V30H14V27Z" />
      </svg>
      <span className="font-serif text-3xl font-black tracking-widest">NYU</span>
    </div>
  );
}

function BankOfAmericaLogo() {
  return (
    <div className="flex items-center gap-3 text-white/90 transition-colors hover:text-[#facc15]">
      {/* Bank of America Flag Ribbon */}
      <svg className="h-8 w-11 fill-current" viewBox="0 0 40 24">
        <path d="M0 0 L10 8 L10 14 L0 6 Z M13 10 L23 18 L23 24 L13 16 Z M13 0 L23 8 L23 14 L13 6 Z M26 10 L36 18 L36 24 L26 16 Z M26 0 L36 8 L36 14 L26 6 Z" />
      </svg>
      <span className="text-xs font-black uppercase tracking-widest sm:text-sm">
        Bank of America
      </span>
    </div>
  );
}

function MetaLogo() {
  return (
    <div className="flex items-center gap-3 text-white/90 transition-colors hover:text-[#facc15]">
      {/* Meta Infinity Icon */}
      <svg className="h-8 w-11 fill-current" viewBox="0 0 36 24">
        <path d="M18 13.8C15.6 10.4 13.1 8 9.8 8C5.2 8 1.5 11.5 1.5 16C1.5 20.5 5.2 24 9.8 24C13.5 24 16.1 21.6 18 18.2C19.9 21.6 22.5 24 26.2 24C30.8 24 34.5 20.5 34.5 16C34.5 11.5 30.8 8 26.2 8C22.9 8 20.4 10.4 18 13.8ZM9.8 20.5C7.2 20.5 5 18.5 5 16C5 13.5 7.2 11.5 9.8 11.5C12.1 11.5 14.1 13.3 15.8 16C14.1 18.7 12.1 20.5 9.8 20.5ZM26.2 20.5C23.9 20.5 21.9 18.7 20.2 16C21.9 13.3 23.9 11.5 26.2 11.5C28.8 11.5 31 13.5 31 16C31 18.5 28.8 20.5 26.2 20.5Z" />
      </svg>
      <span className="text-2xl font-bold tracking-tight">Meta</span>
    </div>
  );
}

function NordicForumLogo() {
  return (
    <div className="flex items-center gap-3 text-white/90 transition-colors hover:text-[#facc15]">
      {/* 4-point star icon */}
      <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
      </svg>
      <div className="flex flex-col text-left leading-none">
        <span className="text-xs font-black uppercase tracking-widest">Nordic</span>
        <span className="text-xs font-bold uppercase tracking-widest">Business</span>
        <span className="text-[10px] font-medium uppercase tracking-widest text-[#facc15]">Forum</span>
      </div>
    </div>
  );
}

function GoogleLogo() {
  return (
    <div className="flex items-center text-white/90 transition-colors hover:text-[#facc15]">
      <span className="font-serif text-3xl font-semibold tracking-tight">
        Google
      </span>
    </div>
  );
}

function BusinessChicksLogo() {
  return (
    <div className="flex items-center text-white/90 transition-colors hover:text-[#facc15]">
      <span className="font-serif text-3xl font-bold italic tracking-tighter">
        Business<span className="font-sans font-light italic">Chicks</span>
      </span>
    </div>
  );
}

function SpotifyLogo() {
  return (
    <div className="flex items-center gap-2.5 text-white/90 transition-colors hover:text-[#facc15]">
      <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
      <span className="text-2xl font-bold tracking-tight">Spotify</span>
    </div>
  );
}

function TedLogo() {
  return (
    <div className="flex items-center text-white/90 transition-colors hover:text-[#facc15]">
      <span className="text-4xl font-black tracking-tighter text-[#facc15]">
        TED<span className="text-xl font-bold tracking-normal text-white">x</span>
      </span>
    </div>
  );
}

function ForbesLogo() {
  return (
    <div className="flex items-center text-white/90 transition-colors hover:text-[#facc15]">
      <span className="font-serif text-3xl font-black tracking-widest">
        Forbes
      </span>
    </div>
  );
}

export default function SpeakingShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const amount = scrollContainerRef.current.clientWidth * 0.65;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full bg-black pt-28 text-white sm:py-36 lg:py-44 overflow-hidden border-t border-white/10">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP CAROUSEL: Keynote & Speaking Stage Images              */}
      {/* ------------------------------------------------------------- */}
      <div className="relative w-full">
        {/* Left Arrow Button */}
        <button
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          aria-label="Previous image"
          className={`absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#121216]/90 text-white shadow-2xl backdrop-blur-md transition-all sm:left-8 sm:h-14 sm:w-14 ${
            canScrollLeft
              ? "opacity-90 hover:scale-110 hover:border-[#facc15] hover:bg-[#facc15] hover:text-black hover:opacity-100"
              : "opacity-30 cursor-not-allowed"
          }`}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          aria-label="Next image"
          className={`absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#121216]/90 text-white shadow-2xl backdrop-blur-md transition-all sm:right-8 sm:h-14 sm:w-14 ${
            canScrollRight
              ? "opacity-90 hover:scale-110 hover:border-[#facc15] hover:bg-[#facc15] hover:text-black hover:opacity-100"
              : "opacity-30 cursor-not-allowed"
          }`}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>

        {/* Scrollable image row with larger card sizes */}
        <div
          ref={scrollContainerRef}
          className="flex w-full gap-5 overflow-x-auto px-6 py-4 scrollbar-none sm:gap-8 sm:px-12"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {EVENT_IMAGES.map((img) => (
            <motion.div
              key={img.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative h-72 w-92 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:h-96 sm:w-135 sm:rounded-3xl lg:h-[440px] lg:w-160"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 380px, (max-width: 1200px) 540px, 640px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. BOTTOM MARQUEE: Partner & Client Logos Strip (Larger Tags) */}
      {/* ------------------------------------------------------------- */}
      <div className="relative mt-20 w-full overflow-hidden sm:mt-28">
        {/* Soft edge fades matching dark background */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-linear-to-r from-black via-black/80 to-transparent sm:w-36" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-linear-to-l from-black via-black/80 to-transparent sm:w-36" />

        {/* Infinite scrolling track with large logos */}
        <div className="flex w-fit items-center gap-16 sm:gap-24">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex shrink-0 items-center gap-16 sm:gap-24"
          >
            <NyuLogo />
            <BankOfAmericaLogo />
            <MetaLogo />
            <NordicForumLogo />
            <GoogleLogo />
            <BusinessChicksLogo />
            <SpotifyLogo />
            <TedLogo />
            <ForbesLogo />
            <NyuLogo />
            <BankOfAmericaLogo />
            <MetaLogo />
            <NordicForumLogo />
            <GoogleLogo />
            <BusinessChicksLogo />
            <SpotifyLogo />
            <TedLogo />
            <ForbesLogo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
