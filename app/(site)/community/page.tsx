import type { Metadata } from "next";
import {
  CommunityHero,
  CommunityVoices,
  CommunityResources,
  CommunityForum,
  CommunityCardsScroll,
  CommunityFaq,                               
} from "@/components/community";
import ContactModal from "@/components/ContactModal";
import ContactCalEmbed from "@/components/contact/ContactCalEmbed";

export const metadata: Metadata = {
  title: "The Everyday Community | The Everyday University",
  description:
    "At The Everyday University, the conversation doesn't end when the episode does. Welcome to a space for lifelong learners, builders, and storytellers to connect.",
};

export default function CommunityPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* 1. Hero Section */}
      <CommunityHero />

      {/* 2. Voices from Our Listeners (Testimonials) */}
      {/* <CommunityVoices /> */}

      {/* 3. Listener Resources (Resource Cards) */}
      <CommunityResources />

      {/* 4. Join the Conversation (Community CTA with WhatsApp & Telegram) */}
      <CommunityForum />

      {/* 5-7. Feature Scroll: Community in Pocket, Knowledge Hub, Live Meetups */}
      <CommunityCardsScroll />

      {/* 8. Frequently Asked Questions */}
      <CommunityFaq />

      {/* 9. Global Contact Modal */}
      <ContactModal />
    </main>
  );
}
