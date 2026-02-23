'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 768px)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    setIsMobile(mobileMq.matches);
    setPrefersReducedMotion(motionMq.matches);

    const handleMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const handleMotion = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);

    mobileMq.addEventListener('change', handleMobile);
    motionMq.addEventListener('change', handleMotion);

    return () => {
      mobileMq.removeEventListener('change', handleMobile);
      motionMq.removeEventListener('change', handleMotion);
    };
  }, []);

  return { isMobile, prefersReducedMotion };
}
