'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cleanLayerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // Heading entrance
      if (!prefersReducedMotion && headingRef.current) {
        gsap.from(headingRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 88%',
            once: true,
          },
        });
      }

      // ── Clip-path scrub reveal: dirty → clean ─────────────────────────────
      // The clean-pool layer starts fully clipped (hidden on the right).
      // As the user scrolls through this section, the clip slides left → right,
      // revealing the clean pool underneath.
      gsap.fromTo(
        cleanLayerRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          ease: prefersReducedMotion ? 'none' : 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 35%',
            scrub: 1.5,
          },
        }
      );

      // Divider line tracks with the clip animation
      gsap.fromTo(
        dividerRef.current,
        { left: '0%' },
        {
          left: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 35%',
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-section bg-pool-mid">
      <div className="separator absolute top-0 left-0 right-0" />

      <div className="mx-auto max-w-6xl px-6">
        <div ref={headingRef} className="max-w-2xl mb-12">
          <SectionLabel>The Difference</SectionLabel>
          <h2
            className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            See What a{' '}
            <span className="text-gradient-water">HammerHead Clean</span>
            <br />
            Actually Looks Like
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: 'rgba(224,242,254,0.6)', fontFamily: 'var(--font-inter)' }}
          >
            Scroll to reveal the transformation. Every pool we service gets this
            level of care — every single visit.
          </p>
        </div>

        {/* Before/After container */}
        <div className="relative h-[55vh] min-h-[320px] max-h-[600px] overflow-hidden rounded-2xl">

          {/* BEFORE layer — murky green pool (always visible, base layer) */}
          <div className="absolute inset-0">
            {/* CSS gradient simulating a dirty, neglected pool */}
            <div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(160deg, #2d4a1e 0%, #1a3a10 20%, #0f2d12 45%, #1c3a1a 70%, #0a2010 100%)',
              }}
            />
            {/* Murky water texture overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 40%, rgba(40,80,20,0.6) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(20,50,10,0.8) 0%, transparent 50%)',
              }}
            />
            {/* Algae/dirt particles */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(60,100,30,0.8) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            {/* Before label */}
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span
                className="rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold tracking-widest uppercase text-white/80 backdrop-blur-sm"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                Before
              </span>
            </div>
            {/* Descriptive overlay */}
            <div className="absolute bottom-5 left-5">
              <p className="text-xs text-white/50" style={{ fontFamily: 'var(--font-inter)' }}>
                Neglected · Algae Growth · Imbalanced Chemistry
              </p>
            </div>
          </div>

          {/* AFTER layer — crystal clear pool (clip-path animated) */}
          <div
            ref={cleanLayerRef}
            className="absolute inset-0"
            style={{
              clipPath: 'inset(0 100% 0 0)',
              willChange: 'clip-path',
            }}
          >
            {/* CSS gradient simulating a pristine pool */}
            <div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(160deg, #0d3b6e 0%, #1a5f9e 20%, #22d3ee 50%, #00c6fb 75%, #0d3b6e 100%)',
              }}
            />
            {/* Caustic light pattern */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 40% 35%, rgba(34,211,238,0.4) 0%, transparent 50%), radial-gradient(ellipse at 65% 65%, rgba(0,198,251,0.3) 0%, transparent 40%)',
              }}
            />
            {/* Subtle wave shimmer */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.15) 40px, rgba(255,255,255,0.15) 41px)',
                transform: 'rotate(-8deg) scale(1.2)',
              }}
            />
            {/* After label */}
            <div className="absolute top-5 right-5">
              <span
                className="rounded-full bg-water-cyan/90 px-3 py-1.5 text-xs font-bold tracking-widest uppercase text-pool-deep backdrop-blur-sm"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                After HammerHead
              </span>
            </div>
            {/* Descriptive overlay */}
            <div className="absolute bottom-5 right-5 text-right">
              <p className="text-xs text-white/70" style={{ fontFamily: 'var(--font-inter)' }}>
                Crystal Clear · Balanced · Swim-Ready
              </p>
            </div>
          </div>

          {/* Vertical divider line */}
          <div
            ref={dividerRef}
            className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-20 pointer-events-none"
            style={{ left: '0%', transform: 'translateX(-50%)' }}
          >
            {/* Handle icon */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-xl">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0a2342"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M9 3L4 8l5 5M15 3l5 5-5 5" />
              </svg>
            </div>
          </div>
        </div>

        <p
          className="mt-5 text-center text-sm"
          style={{ color: 'rgba(224,242,254,0.45)', fontFamily: 'var(--font-inter)' }}
        >
          Scroll through this section to see the full transformation
        </p>
      </div>

      <div className="separator absolute bottom-0 left-0 right-0" />
    </section>
  );
}
