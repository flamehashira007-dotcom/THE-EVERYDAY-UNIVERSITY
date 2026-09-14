"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  "09:30 AM",
  "11:00 AM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM",
  "06:00 PM",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ContactCalEmbed() {
  // Calendar State
  const [selectedDate, setSelectedDate] = useState<number>(18);
  const [selectedMonth, setSelectedMonth] = useState<number>(8); // 8 = September
  const [selectedYear] = useState<number>(2026);
  const [selectedTime, setSelectedTime] = useState<string | null>("11:00 AM");
  const [bookingStep, setBookingStep] = useState<"select" | "details" | "confirmed">("select");

  // Form State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientTopic, setClientTopic] = useState("Podcast Launch Strategy");
  const [isBooking, setIsBooking] = useState(false);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Days calculation for September 2026 (Starts on Tuesday = index 2, 30 days)
  const totalDays = 30;
  const startDayIndex = 2; // Tuesday

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    setSelectedTime(null);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setBookingStep("confirmed");
    }, 700);
  };

  const resetBooking = () => {
    setBookingStep("select");
    setSelectedTime("11:00 AM");
    setClientName("");
    setClientEmail("");
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
              Direct Strategy Booking
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Schedule a Strategy Call
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-neutral-400"
          >
            Select a date and time slot below for an initial 30-minute broadcast consultation with our executive team.
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
              <ShieldCheck className="h-4 w-4 text-[#facc15]" /> 100% Confidential
            </span>
          </div>
        </div>

        {/* Interactive Booking Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0f] p-6 shadow-2xl sm:p-10"
        >
          {/* Top Live Bar */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white">Live Broadcast Calendar</span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-400">Timezone: Europe/London (GMT+1)</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-neutral-300">
              <Sparkles className="h-3 w-3 text-[#facc15]" />
              <span>Free 30-min strategy review</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {bookingStep === "confirmed" ? (
              /* Success Screen */
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
                    Strategy Call Confirmed!
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-300">
                    We&rsquo;ve scheduled your 30-minute consultation with <span className="text-white font-bold">{clientName || "our team"}</span>.
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
                      <span className="font-bold text-[#facc15]">{selectedTime} (GMT+1)</span>
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
              /* Contact Details Step */
              <motion.form
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleBookingSubmit}
                className="space-y-6 max-w-xl mx-auto py-4"
              >
                <div className="space-y-2 text-center pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#facc15]">
                    Step 2 of 2
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Confirm Your Details
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Meeting on <strong className="text-white">{monthNames[selectedMonth]} {selectedDate}, {selectedYear}</strong> at <strong className="text-[#facc15]">{selectedTime}</strong>.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                      Your Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-[#facc15]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                      Email Address (For Calendar Invite) *
                    </label>
                    <input
                      required
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="e.g. sarah@company.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-[#facc15]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                      What is the primary focus of your podcast?
                    </label>
                    <select
                      value={clientTopic}
                      onChange={(e) => setClientTopic(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#121218] px-4 py-3 text-sm text-white outline-none focus:border-[#facc15]"
                    >
                      <option value="Podcast Launch Strategy">Podcast Launch Strategy</option>
                      <option value="Full Production & Audio Editing">Full Production & Audio Editing</option>
                      <option value="Show Reboot & Audience Growth">Show Reboot & Audience Growth</option>
                      <option value="Executive Coaching & Hosting">Executive Coaching & Hosting</option>
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
              /* Calendar + Slot Selection Step */
              <motion.div
                key="select"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start"
              >
                {/* Left: Interactive Month Grid */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold text-white">
                      {monthNames[selectedMonth]} {selectedYear}
                    </h4>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedMonth((m) => (m === 0 ? 11 : m - 1))}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:text-white transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedMonth((m) => (m === 11 ? 0 : m + 1))}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:text-white transition-colors"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day Names */}
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-neutral-500">
                    {DAYS.map((d) => (
                      <div key={d} className="py-1">
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Days Matrix */}
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {/* Empty padding slots */}
                    {Array.from({ length: startDayIndex }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-10" />
                    ))}

                    {/* Active Days */}
                    {Array.from({ length: totalDays }).map((_, idx) => {
                      const dayNum = idx + 1;
                      const isPast = dayNum < 15;
                      const isSelected = selectedDate === dayNum;
                      const isWeekend = (idx + startDayIndex) % 7 === 0 || (idx + startDayIndex) % 7 === 6;

                      return (
                        <button
                          key={dayNum}
                          type="button"
                          disabled={isPast || isWeekend}
                          onClick={() => handleDateClick(dayNum)}
                          className={`flex h-10 w-full items-center justify-center rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? "bg-[#facc15] text-black shadow-lg font-extrabold scale-105"
                              : isPast || isWeekend
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

                {/* Right: Available Time Slots */}
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

                    {/* Time Slot Buttons */}
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

                  {/* Proceed to details button */}
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
        </motion.div>
      </div>
    </section>
  );
}
