'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2.0,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll position into GSAP ticker
    function onFrame(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(onFrame);

    // Tell ScrollTrigger to update when Lenis scrolls
    lenis.on('scroll', () => ScrollTrigger.update());

    // Prevent GSAP from adding extra lag smoothing
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(onFrame);
    };
  }, []);

  return lenisRef;
}
