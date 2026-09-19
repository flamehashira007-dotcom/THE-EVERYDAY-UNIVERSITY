"use client";

import React from "react";
import {
  AboutHero,
  AboutShowcaseImage,
  AboutStatement,
  AboutValues,
  AboutGuests,
} from "@/components/about";
import CtaSection from "@/components/CtaSection";
import ContactModal from "@/components/ContactModal";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* 1. Hero Text Header */}
      <AboutHero />

      {/* 2. Full-Window Image Banner */}
      <AboutShowcaseImage />

      {/* 3. Editorial Two-Column Statement */}
      <AboutStatement />

      {/* 4. Values Manifesto & 3D Glass Artwork */}
      <AboutValues />

      {/* 5. Guests & Testimonials */}
      <AboutGuests />

      {/* 6. CTA & Contact Form */}
      <CtaSection />
      <ContactModal />
    </main>
  );
}