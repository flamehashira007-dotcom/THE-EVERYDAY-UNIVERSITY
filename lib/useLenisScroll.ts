"use client";

import { useEffect, useState, useCallback, useRef, type RefObject } from "react";
import { getLenis } from "./lenis";

interface LenisScrollData {
  velocity: number;
  direction: number; // 1 = down, -1 = up
  progress: number;  // 0–1 normalized scroll progress of target element
  isScrolling: boolean;
}

/**
 * Hook into the global Lenis instance for scroll-velocity & direction data.
 * Optionally pass a `targetRef` to also get normalised scroll progress for
 * that element (0 when the element enters the viewport from below, 1 when
 * it leaves from the top).
 */
export function useLenisScroll(targetRef?: RefObject<HTMLElement | null>): LenisScrollData {
  const [data, setData] = useState<LenisScrollData>({
    velocity: 0,
    direction: 1,
    progress: 0,
    isScrolling: false,
  });

  const rafId = useRef<number>(0);
  const latest = useRef(data);

  const update = useCallback(() => {
    const lenis = getLenis();
    if (!lenis) return;

    let progress = 0;
    if (targetRef?.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when bottom edge enters viewport, 1 when top edge leaves
      progress = Math.min(1, Math.max(0, 1 - (rect.top + rect.height) / (vh + rect.height)));
    }

    const next: LenisScrollData = {
      velocity: lenis.velocity,
      direction: lenis.direction,
      progress,
      isScrolling: Boolean(lenis.isScrolling),
    };

    // Only update state when values actually changed (avoid re-render storms)
    const prev = latest.current;
    if (
      prev.velocity !== next.velocity ||
      prev.direction !== next.direction ||
      Math.abs(prev.progress - next.progress) > 0.001 ||
      prev.isScrolling !== next.isScrolling
    ) {
      latest.current = next;
      setData(next);
    }
  }, [targetRef]);

  useEffect(() => {
    const tick = () => {
      update();
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [update]);

  return data;
}
