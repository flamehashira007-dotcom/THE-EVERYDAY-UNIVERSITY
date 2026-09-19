"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

import { extractYouTubeId } from "@/lib/youtube";
export { extractYouTubeId };

export default function ClassroomModal({
  isOpen,
  onClose,
  videoUrl,
  title,
}: ClassroomModalProps) {
  const youtubeId = extractYouTubeId(videoUrl);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        >
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-3xl bg-[#0a0a0e] border border-white/15 p-4 sm:p-6 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#facc15] text-xs font-black text-black">
                  ▶
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white truncate">
                  {title || "Classroom Player"}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-[#facc15] hover:text-black text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Video Frame */}
            <div className="relative mt-4 aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner">
              {youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-neutral-400">
                  Video unavailable
                </div>
              )}
            </div>

            {/* Footer Quick Actions */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-neutral-400">
              <span>The Everyday University • Official Classroom Stream</span>
              {youtubeId && (
                <a
                  href={`https://www.youtube.com/watch?v=${youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#facc15] hover:underline font-bold"
                >
                  Watch on YouTube ↗
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
