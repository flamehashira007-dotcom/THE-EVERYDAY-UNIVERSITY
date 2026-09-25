"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRouter } from "next/navigation";
import { getLenis } from "@/lib/lenis";

interface LinkItem {
  id: string;
  label: string;
  href: string;
}

const links: LinkItem[] = [
  { id: "01", label: "The Classrooms", href: "/classrooms" },
  { id: "02", label: "Community", href: "/community" },
  { id: "03", label: "About", href: "/about" },
  { id: "04", label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@TheEverydayUniversity",
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/1vLkx0lHA6eOtqFjiOKRR1",
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/theeverydayuniversity",
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@the.everyday.univ",
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/everydayunivers",
    icon: (
      <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/The-Everyday-University/61574664033182/",
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

const LOGO_YELLOW = "#facc15 ";

const curtain = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const } },
  exit: { scaleY: 0, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] as const, delay: 0.25 } },
};

const boing = { type: "spring", stiffness: 220, damping: 14, mass: 0.9 } as const;

const linkList = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const linkItem = {
  hidden: { y: -40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: boing },
  exit: { y: -20, opacity: 0, transition: { duration: 0.25 } },
};

const popIn = {
  hidden: { y: -60, opacity: 0, scale: 0.8 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { ...boing, delay: 0.4 } },
  exit: { y: -30, opacity: 0, scale: 0.9, transition: { duration: 0.25 } },
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { ...boing, delay: 0.7 } },
  exit: { y: 20, opacity: 0, transition: { duration: 0.25 } },
};

function offsetWithin(el: HTMLElement, container: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && node !== container) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

export default function MenuOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pillHeight, setPillHeight] = useState(0);

  const pillTop = useMotionValue(0);
  const pillSkew = useMotionValue(0);
  const pillScaleX = useMotionValue(0.92);

  const pillTopSpring = useSpring(pillTop, { stiffness: 300, damping: 24, mass: 0.7 });
  const pillSkewSpring = useSpring(pillSkew, { stiffness: 200, damping: 14, mass: 0.4 });
  const pillScaleXSpring = useSpring(pillScaleX, { stiffness: 300, damping: 22 });

  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleLinkEnter = (i: number) => (e: React.SyntheticEvent<HTMLElement>) => {
    const row = e.currentTarget;
    const ul = row.closest("ul");
    if (!ul) return;

    const top = offsetWithin(row, ul);
    const rowHeight = row.offsetHeight;

    if (hoveredIndex !== null && hoveredIndex !== i) {
      const direction = i > hoveredIndex ? 1 : -1;
      pillSkew.set(direction * 16);
      requestAnimationFrame(() => {
        pillSkew.set(0);
      });
    }

    pillTop.set(top);
    pillScaleX.set(1);
    setPillHeight((prev) => prev || rowHeight);
    setHoveredIndex(i);
  };

  const handleNavigate = (href: string) => {
    onClose();
    if (href.startsWith("#")) {
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) {
          getLenis()?.scrollTo(href, { offset: 0 });
        }
      }, 700);
    } else {
      setTimeout(() => {
        router.push(href);
      }, 350);
    }
  };

  return (
    <motion.div
      variants={curtain}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ transformOrigin: "top" }}
      className="fixed inset-0 z-50 flex flex-col bg-black"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 md:px-12">
        <motion.a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("/");
          }}
          variants={popIn}
          className="font-bebas-neue text-xl sm:text-3xl font-bold tracking-tight text-white md:text-4xl cursor-pointer transition hover:opacity-90"
        >
          The <span style={{ color: LOGO_YELLOW }}>Everyday</span> University
        </motion.a>

        <motion.button
          onClick={onClose}
          aria-label="Close menu"
          variants={popIn}
          whileHover={{ rotate: 90, backgroundColor: LOGO_YELLOW }}
          whileTap={{ scale: 0.9 }}
          transition={boing}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black transition-colors"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </motion.button>
      </div>

      {/* Main Navigation */}
      <div className="flex flex-1 items-center px-6 md:px-12">
        <div className="hidden w-[38%] lg:block" />

        <motion.nav
          variants={linkList}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full lg:w-[62%]"
        >
          <ul
            className="relative px-2"
            onMouseLeave={() => {
              setHoveredIndex(null);
              pillScaleX.set(0.92);
              pillSkew.set(0);
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setHoveredIndex(null);
                pillScaleX.set(0.92);
                pillSkew.set(0);
              }
            }}
          >
            {/* Logo-Yellow Capsule with Skew Animation */}
            <motion.div
              initial={false}
              animate={{
                opacity: hoveredIndex !== null ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
              style={{
                y: pillTopSpring,
                skewX: pillSkewSpring,
                scaleX: pillScaleXSpring,
                height: pillHeight,
                transformOrigin: "center center",
                backgroundColor: LOGO_YELLOW,
              }}
              className="pointer-events-none absolute -left-6 -right-6 top-0 z-0 rounded-full shadow-lg"
            />

            <hr
              className={`relative z-10 mb-1 border-white/15 transition-opacity duration-300 ${
                hoveredIndex === 0 ? "opacity-0" : "opacity-100"
              }`}
            />
            {links.map((link, i) => {
              const dividerHidden = hoveredIndex === i || hoveredIndex === i + 1;
              const isHovered = hoveredIndex === i;

              return (
                <li key={link.id}>
                  <motion.div
                    variants={linkItem}
                    onMouseEnter={handleLinkEnter(i)}
                    onFocus={handleLinkEnter(i)}
                    className="relative z-10"
                  >
                    <button
                      onClick={() => handleNavigate(link.href)}
                      className="group relative flex w-full items-center rounded-full px-6 py-6 text-left md:px-8 md:py-7"
                    >
                      <span
                        className="w-10 shrink-0 text-2xl font-semibold transition-colors duration-300 md:w-14"
                        style={{
                          color: isHovered ? "#111111" : "rgba(255, 255, 255, 0.4)",
                        }}
                      >
                        {link.id}
                      </span>

                      <span
                        className="pl-6 text-5xl font-bold tracking-tight transition-colors duration-300 md:pl-0 md:text-7xl lg:text-8xl"
                        style={{
                          color: isHovered ? "#111111" : "#FFFFFF",
                        }}
                      >
                        {link.label}
                      </span>
                    </button>
                  </motion.div>

                  {i < links.length - 1 && (
                    <hr
                      className={`relative z-10 mb-1 border-white/15 transition-opacity duration-300 ${
                        dividerHidden ? "opacity-0" : "opacity-100"
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </motion.nav>
      </div>

      {/* Footer with Social Icons */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-white/40 md:flex-row md:px-12"
      >
        <p>© The Everyday University 2026. All Rights Reserved.</p>
        <div className="flex items-center gap-6">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.href}
              aria-label={s.name}
              className="flex items-center gap-2 transition hover:text-[#facc15 ]"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}