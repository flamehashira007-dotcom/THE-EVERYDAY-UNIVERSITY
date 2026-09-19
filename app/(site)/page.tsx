import React from "react";
import Hero from "@/components/Hero";
import VideoShowcase from "@/components/VideoShowcase";
import ShortShowcase from "@/components/ShortShowcase";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import SpeakingShowcase from "@/components/SpeakingShowcase";
import CtaSection from "@/components/CtaSection";
import ContactModal from "@/components/ContactModal";

const RootPage = () => {
  return (
    <>
      <Hero />
      <VideoShowcase />
      <ShortShowcase />
      <AboutSection />
      <GallerySection />
      <CtaSection />
      <ContactModal />
      <SpeakingShowcase />
    </>
  );
};

export default RootPage;
