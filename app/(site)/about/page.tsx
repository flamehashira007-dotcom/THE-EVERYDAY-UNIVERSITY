import React from "react";
import type { Metadata } from "next";
import {
  AboutHero,
  AboutShowcaseImage,
  AboutStatement,
  AboutValues,
  AboutGuests,
} from "@/components/about";
import CtaSection from "@/components/CtaSection";
import ContactCalEmbed from "@/components/contact/ContactCalEmbed";
import ContactModal from "@/components/ContactModal";

export const metadata: Metadata = {
  title: "About Our Story & Mission",
  description:
    "Learn about Dasi and the philosophy behind The Everyday University. Exploring the classrooms that don't have four walls and the teachers of everyday life.",
  openGraph: {
    title: "About Our Story & Mission | The Everyday University",
    description:
      "Learn about Dasi and the philosophy behind The Everyday University.",
  },
};

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
      {/* <AboutGuests /> */}

      {/* 6. CTA & Calendar Strategy Call */}
      <CtaSection />
      <ContactModal />
    </main>
  );
}
