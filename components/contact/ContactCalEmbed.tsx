"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  CalendarCheck,
  Sparkles,
} from "lucide-react";

const TIME_SLOTS = [
  "12:00 PM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM",
  "06:00 PM",
  "07:30 PM",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ContactCalEmbed({
  calLink = process.env.NEXT_PUBLIC_CAL_LINK || "theeverydayuniversity/30min",
}: {
  calLink?: string;
}) {
  const [useOfficialEmbed, setUseOfficialEmbed] = useState<boolean>(true);
  const [embedReady, setEmbedReady] = useState(false);

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
          setEmbedReady(true);
        }
      } catch (e) {
        console.warn("Cal.com embed init notice:", e);
      }
    })();
  }, []);

  // Calendar State - dynamic fallback
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<number>(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [selectedTime, setSelectedTime] = useState<string | null>("12:00 PM");
  const [bookingStep, setBookingStep] = useState<"select" | "details" | "confirmed">("select");

  // Form State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientTopic, setClientTopic] = useState("Pitch a Guest / Story Idea");
  const [isBooking, setIsBooking] = useState(false);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const startDayIndex = new Date(selectedYear, selectedMonth, 1).getDay();
  const totalDays = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  const isDateInPast = (dayNum: number) => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const targetDate = new Date(selectedYear, selectedMonth, dayNum, 23, 59, 59);
    return targetDate < startOfToday;
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    setSelectedTime(null);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          inquiryType: clientTopic,
          message: `Scheduled Intro Call: ${monthNames[selectedMonth]} ${selectedDate}, ${selectedYear} at ${selectedTime} EST`,
        }),
      });
    } catch (err) {
      console.error("Booking sync error:", err);
    } finally {
      setIsBooking(false);
      setBookingStep("confirmed");
    }
  };

  const resetBooking = () => {
    setBookingStep("select");
    setSelectedTime("12:00 PM");
    setClientName("");
    setClientEmail("");
    setClientTopic("Pitch a Guest / Story Idea");
  };

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

        {/* Booking Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0f] p-4 sm:p-8 md:p-10 shadow-2xl"
        >
          {/* Top Live Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white">Live Booking Calendar</span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-400">Powered by Cal.com</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setUseOfficialEmbed(!useOfficialEmbed)}
                className="text-[11px] font-bold text-neutral-400 hover:text-[#facc15] transition-colors cursor-pointer underline underline-offset-4"
              >
                {useOfficialEmbed ? "Switch to Manual Mode" : "Switch to Cal.com Live Sync"}
              </button>
            </div>
          </div>

          {/* Mode 1: Live Cal.com Embed */}
          {useOfficialEmbed ? (
            <div className="min-h-[550px] w-full rounded-2xl overflow-hidden bg-[#07070a] p-2">
              <Cal
                calLink={calLink}
                style={{ width: "100%", height: "100%", minHeight: "550px", overflow: "hidden" }}
                config={{ layout: "month_view", theme: "dark" }}
              />
            </div>
          ) : (
            /* Mode 2: Interactive Dynamic Fallback Calendar */
            <AnimatePresence mode="wait">
              {bookingStep === "confirmed" ? (
                <motion.div
                  key="confirmed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center space-y-6 py-8"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#facc15] text-black shadow-2xl">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>

                  <div className="space-y-3 max-w-md">
                    <h3 className="text-3xl font-black text-white">
                      Intro Call Confirmed!
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-300">
                      We&rsquo;ve scheduled your 30-minute intro call with <span className="text-white font-bold">{clientName || "our team"}</span>.
                    </p>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left space-y-2 text-xs text-neutral-300 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Date:</span>
                        <span className="font-bold text-white">
                          {monthNames[selectedMonth]} {selectedDate}, {selectedYear}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Time:</span>
                        <span className="font-bold text-[#facc15]">{selectedTime} EST</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Location:</span>
                        <span className="font-bold text-white">Google Meet (Link emailed)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Confirmation Sent To:</span>
                        <span className="font-bold text-white">{clientEmail || "Your email"}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={resetBooking}
                    className="rounded-full bg-[#facc15] px-8 py-3 text-xs font-black uppercase tracking-wider text-black shadow-lg transition-all hover:bg-white cursor-pointer"
                  >
                    Schedule Another Call
                  </button>
                </motion.div>
              ) : bookingStep === "details" ? (
                <motion.form
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleBookingSubmit}
                  className="space-y-6 max-w-xl mx-auto py-4"
                >
                  <div className="border-b border-white/10 pb-4">
                    <h4 className="text-xl font-black text-white">Complete Your Booking</h4>
                    <p className="text-xs text-neutral-400 mt-1">
                      {monthNames[selectedMonth]} {selectedDate}, {selectedYear} at {selectedTime} EST
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-white/10 bg-[#121218] px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-[#facc15]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-white/10 bg-[#121218] px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-[#facc15]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Discussion Topic
                      </label>
                      <select
                        value={clientTopic}
                        onChange={(e) => setClientTopic(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#121218] px-4 py-3 text-sm text-white outline-none focus:border-[#facc15]"
                      >
                        <option value="Pitch a Guest / Story Idea">Pitch a Guest / Story Idea</option>
                        <option value="Sponsorship & Partnerships">Sponsorship & Partnerships</option>
                        <option value="Community Collaboration">Community Collaboration</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setBookingStep("select")}
                      className="flex-1 rounded-full border border-white/20 bg-white/5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-[#facc15] hover:text-[#facc15] transition-all cursor-pointer"
                    >
                      Back to Calendar
                    </button>
                    <button
                      type="submit"
                      disabled={isBooking}
                      className="flex-1 rounded-full bg-[#facc15] py-3 text-xs font-black uppercase tracking-wider text-black shadow-lg hover:bg-white transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isBooking ? "Confirming..." : "Confirm Booking"}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="select"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start"
                >
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-bold text-white">
                        {monthNames[selectedMonth]} {selectedYear}
                      </h4>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handlePrevMonth}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-neutral-500">
                      {DAYS.map((d) => (
                        <div key={d} className="py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center">
                      {Array.from({ length: startDayIndex }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-10" />
                      ))}

                      {Array.from({ length: totalDays }).map((_, idx) => {
                        const dayNum = idx + 1;
                        const isPast = isDateInPast(dayNum);
                        const isSelected = selectedDate === dayNum;

                        return (
                          <button
                            key={dayNum}
                            type="button"
                            disabled={isPast}
                            onClick={() => handleDateClick(dayNum)}
                            className={`flex h-10 w-full items-center justify-center rounded-xl text-xs font-bold transition-all ${
                              isSelected
                                ? "bg-[#facc15] text-black shadow-lg font-extrabold scale-105"
                                : isPast
                                ? "text-neutral-600 opacity-40 cursor-not-allowed"
                                : "border border-white/5 bg-white/[0.03] text-neutral-200 hover:border-[#facc15]/50 hover:bg-white/10 cursor-pointer"
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6 rounded-2xl border border-white/10 bg-[#0f0f16] p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#facc15]">
                            Available Slots
                          </p>
                          <h5 className="text-base font-bold text-white">
                            {monthNames[selectedMonth]} {selectedDate}, {selectedYear}
                          </h5>
                        </div>
                        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-neutral-300">
                          30 MIN
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 pt-1">
                        {TIME_SLOTS.map((slot) => {
                          const isSelected = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`rounded-xl py-2.5 px-3 text-xs font-bold transition-all ${
                                isSelected
                                  ? "border border-[#facc15] bg-[#facc15] text-black shadow-md"
                                  : "border border-white/10 bg-white/5 text-neutral-300 hover:border-white/30 hover:text-white"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={!selectedTime}
                      onClick={() => setBookingStep("details")}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#facc15] py-3.5 text-xs font-black uppercase tracking-wider text-black shadow-lg transition-all hover:scale-[1.02] hover:bg-white disabled:opacity-40 cursor-pointer"
                    >
                      <CalendarCheck className="h-4 w-4" />
                      <span>Next: Add Details</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}
