import React from "react";
import type { Metadata } from "next";
import {
  AboutHero,
  AboutShowcaseImage,
  AboutStatement,
  AboutValues,
  AboutMission,
  AboutGuests,
} from "@/components/about";
import CtaSection from "@/components/CtaSection";
import ContactCalEmbed from "@/components/contact/ContactCalEmbed";
import ContactModal from "@/components/ContactModal";

export const metadata: Metadata = {
  title: "About Our Story & Mission",
  description:
    "Learn about MC DASI and the philosophy behind The Everyday University. Exploring the classrooms that don't have four walls and the teachers of everyday life.",
  openGraph: {
    title: "About Our Story & Mission | The Everyday University",
    description:
      "Learn about MC DASI and the philosophy behind The Everyday University.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* 1. Hero Text Header */}
      <AboutHero />

      {/* 2. Full-Window Image Banner */}
      <AboutShowcaseImage />

      {/* 3. Editorial Two-Column Statement / Founder Letter */}
      <AboutStatement />

      {/* 4. The Vision (Philosophy Grid) */}
      <AboutValues />

      {/* 5. The Mission & Sign-Off */}
      <AboutMission />

      {/* 6. Guests & Testimonials */}
      {/* <AboutGuests /> */}

      {/* 6. CTA & Calendar Strategy Call */}
      <CtaSection />
      <ContactCalEmbed />
      <ContactModal />
    </main>
  );
}