"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  ShieldCheck,
} from "lucide-react";

export default function ContactCalEmbed({
  calLink = process.env.NEXT_PUBLIC_CAL_LINK || "theeverydayuniversity/30min",
}: {
  calLink?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();
        if (cal) {
          cal("ui", {
            theme: "dark",
            styles: {
              branding: {
                brandColor: "#facc15",
              },
            },
            hideEventTypeDetails: false,
            layout: "month_view",
          });
          setIsLoaded(true);
        }
      } catch (e) {
        console.warn("Cal.com embed init notice:", e);
      }
    })();
  }, []);

  return (
    <section id="cal-booking" className="relative w-full border-t border-white/10 bg-black px-4 py-20 sm:px-6 md:px-12 md:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <CalendarIcon className="h-3.5 w-3.5 text-[#facc15]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#facc15]">
              PARTNERSHIPS & PITCHES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Let’s Work Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-neutral-400"
          >
            Select a date and time slot below for an initial 30-minute intro call with our team to discuss guest pitches, sponsorships, or community collaborations.
          </motion.p>

          {/* Quick Perks */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-semibold text-neutral-300">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#facc15]" /> 30-Min Session
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Video className="h-4 w-4 text-[#facc15]" /> Google Meet / Zoom
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#facc15]" /> Podcast Inquiries
            </span>
          </div>
        </div>

        {/* Official Cal.com Booking Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0f] p-4 sm:p-6 md:p-8 shadow-2xl"
        >
          {/* Cal.com Official Embed */}
          <div className="min-h-[600px] w-full rounded-2xl overflow-hidden bg-[#07070a]">
            <Cal
              calLink={calLink}
              style={{ width: "100%", height: "100%", minHeight: "600px", overflow: "scroll" }}
              config={{ layout: "month_view", theme: "dark" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
