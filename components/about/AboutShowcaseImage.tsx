"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface AboutShowcaseImageProps {
  src?: string;
  alt?: string;
}

export default function AboutShowcaseImage({
  src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop",
  alt = "MC DASI - The Everyday University",
}: AboutShowcaseImageProps) {
  return (
    <section className="relative w-full px-6 pb-24 md:px-12 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:aspect-16/9 md:aspect-21/10 lg:h-[680px]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Subtle bottom vignette */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </section>
  );
}
