import React from "react";
import type { Metadata } from "next";
import {
  ContactHero,
  ContactForm,
  ContactCalEmbed,
} from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Pitch a guest, discuss sponsorship opportunities, or book an intro strategy call with The Everyday University team.",
  openGraph: {
    title: "Contact & Booking | The Everyday University",
    description:
      "Pitch a guest, discuss sponsorship opportunities, or book an intro call.",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* 1. Minimal Header & Quick Contacts */}
      <ContactHero />

      {/* 2. Contact & Project Brief Form */}
      <ContactForm />

      {/* 3. Direct Cal.com Strategy Call Booking */}
      <ContactCalEmbed />
    </main>
  );
}