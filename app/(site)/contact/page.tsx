"use client";

import React from "react";
import {
  ContactHero,
  ContactForm,
  ContactCalEmbed,
} from "@/components/contact";

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