'use client';

import { useState, useEffect, RefObject } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

export function useScrollProgress(
  elementRef: RefObject<HTMLElement | null>,
  options?: { start?: string; end?: string }
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!elementRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: elementRef.current,
      start: options?.start ?? 'top top',
      end: options?.end ?? 'bottom top',
      scrub: true,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => trigger.kill();
  }, [elementRef, options?.start, options?.end]);

  return progress;
}
