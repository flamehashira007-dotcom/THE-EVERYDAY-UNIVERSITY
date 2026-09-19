import React from "react";
import Hero from "@/components/Hero";
import VideoShowcase from "@/components/VideoShowcase";
import ShortShowcase from "@/components/ShortShowcase";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import SpeakingShowcase from "@/components/SpeakingShowcase";
import CtaSection from "@/components/CtaSection";
import ContactModal from "@/components/ContactModal";
import ContactCalEmbed from "@/components/contact/ContactCalEmbed";

const RootPage = () => {
  return (
    <>
      <Hero />
      <VideoShowcase />
      <ShortShowcase />
      <AboutSection />
      <GallerySection />
      <SpeakingShowcase />
      <CtaSection />
      <ContactCalEmbed />
      <ContactModal />
    </>
  );
};

export default RootPage;
