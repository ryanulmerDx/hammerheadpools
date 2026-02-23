'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface AnimatedHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  delay?: number;
  triggerOnScroll?: boolean;
}

export function AnimatedHeading({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  triggerOnScroll = true,
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1.0,
      delay,
      ease: 'power3.out',
      scrollTrigger: triggerOnScroll
        ? {
            trigger: el,
            start: 'top 88%',
            once: true,
          }
        : undefined,
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill());
    };
  }, [delay, triggerOnScroll]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      {children}
    </Tag>
  );
}
