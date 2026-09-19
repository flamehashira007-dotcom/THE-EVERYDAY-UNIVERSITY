"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const ITEMS = [
  {
    title: "THE PODCAST\nEPISODES",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop",
    href: "/classrooms",
  },
  {
    title: "BUSINESS &\nENTREPRENEURSHIP",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
    href: "/classrooms",
  },
  {
    title: "THE PROFESSORS\n(GUESTS)",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
    href: "/about",
  },
  {
    title: "EDUCATION &\nLESSONS",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop",
    href: "/classrooms",
  },
  {
    title: "TECHNOLOGY &\nINNOVATION",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    href: "/classrooms",
  },
  {
    title: "COMMUNITY &\nENTERTAINMENT",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
    href: "/community",
  },
];

/* Each gallery item uses smooth GPU transforms */
function GalleryItem({ item, index }: { item: typeof ITEMS[number]; index: number }) {
  const itemRef = useRef<HTMLAnchorElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  /* Parallax for desktop screens only to prevent mobile stutter */
  const speed = index % 2 === 0 ? 25 : 40;
  const imageY = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.03]);

  return (
    <motion.a
      ref={itemRef}
      key={item.title}
      href={item.href}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.08,
      }}
      className="group relative aspect-square overflow-hidden block bg-neutral-950 will-change-transform"
    >
      {/* Background image — Desktop parallax, Mobile static optimized */}
      <motion.div
        className="absolute inset-0 transform-gpu"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={item.image}
          alt={item.title.replace("\n", " ")}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-all duration-500 ease-out group-hover:grayscale"
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-black/40 transition-opacity duration-500 group-hover:from-black/90 pointer-events-none" />

      {/* Title & Arrow Hover */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
        <span className="mb-4 inline-block w-fit text-4xl md:text-5xl leading-none text-white opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#facc15]">
          →
        </span>
        <h3 className="font-bebas-neue text-2xl uppercase leading-[0.95] tracking-tight text-white transition-colors duration-300 group-hover:text-[#facc15] sm:text-3xl md:text-4xl whitespace-pre-line drop-shadow-md">
          {item.title}
        </h3>
      </div>
    </motion.a>
  );
}

export default function GallerySection() {
  return (
    <section id="Classrooms" className="relative w-full bg-black text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {ITEMS.map((item, i) => (
          <GalleryItem key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}