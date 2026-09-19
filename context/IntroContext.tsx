"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { getLenis } from "@/lib/lenis";

interface IntroContextType {
  isIntroActive: boolean;
  isCurtainOpening: boolean;
  introPhase: "idle" | "playing" | "curtain" | "finished";
  setIntroPhase: (phase: "idle" | "playing" | "curtain" | "finished") => void;
  finishIntro: () => void;
  skipIntro: () => void;
}

const IntroContext = createContext<IntroContextType>({
  isIntroActive: false,
  isCurtainOpening: false,
  introPhase: "idle",
  setIntroPhase: () => {},
  finishIntro: () => {},
  skipIntro: () => {},
});

export const IntroProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [introPhase, setIntroPhase] = useState<
    "idle" | "playing" | "curtain" | "finished"
  >("idle");
  const [isIntroActive, setIsIntroActive] = useState<boolean>(false);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return;

    const hasSeen = sessionStorage.getItem("the_everyday_university_intro_seen");
    const isHomePage = pathname === "/";

    if (isHomePage && !hasSeen) {
      setIsIntroActive(true);
      setIntroPhase("playing");
      // Lock native scrolling and Lenis smooth scroll
      document.body.style.overflow = "hidden";
      const lenis = getLenis();
      if (lenis) lenis.stop();
    } else {
      setIsIntroActive(false);
      setIntroPhase("finished");
    }
  }, [pathname]);

  const finishIntro = useCallback(() => {
    sessionStorage.setItem("the_everyday_university_intro_seen", "true");
    setIsIntroActive(false);
    setIntroPhase("finished");
    document.body.style.overflow = "";
    const lenis = getLenis();
    if (lenis) lenis.start();
  }, []);

  const skipIntro = useCallback(() => {
    setIntroPhase("curtain");
  }, []);

  const isCurtainOpening = introPhase === "curtain";

  return (
    <IntroContext.Provider
      value={{
        isIntroActive,
        isCurtainOpening,
        introPhase,
        setIntroPhase,
        finishIntro,
        skipIntro,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
};

export const useIntro = () => useContext(IntroContext);

