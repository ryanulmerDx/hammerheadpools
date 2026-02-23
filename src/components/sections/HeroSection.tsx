'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { RippleButton } from '@/components/ui/RippleButton';
import { CONTACT, SERVICE_AREAS } from '@/lib/constants';

// Dynamic import — Three.js must NOT run on the server
const WaterScene = dynamic(
  () => import('@/components/three/WaterScene').then((m) => ({ default: m.WaterScene })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-pool-deep" />
    ),
  }
);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isMobile, prefersReducedMotion } = useMediaQuery();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── Scrub scroll progress into the 3D camera ──────────────────────────
      // End = 100vh past section start (= exactly when sticky section un-sticks)
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight}`,
        scrub: 1.2,
        onUpdate: (self) => setScrollProgress(self.progress),
      });

      // ── Fade scroll indicator out as user starts scrolling ─────────────────
      if (indicatorRef.current) {
        gsap.to(indicatorRef.current, {
          opacity: 0,
          y: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=80',
            scrub: true,
          },
        });
      }

      if (prefersReducedMotion) return;

      // ── Text entrance animations (play once, not scrubbed) ─────────────────
      const staggerElements = [
        eyebrowRef.current,
        headlineRef.current,
        subRef.current,
        ctaRef.current,
      ];

      gsap.from(staggerElements, {
        y: 36,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.18,
        delay: 0.3,
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Short version of areas for the eyebrow
  const areaDisplay = SERVICE_AREAS.slice(0, 4).join(' · ');

  return (
    // 200vh outer — the scroll distance. Sticky inner pins content for first 100vh.
    <section ref={sectionRef} className="relative" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Background: 3D Water Scene (desktop) or CSS gradient (mobile) ── */}
        <div className="absolute inset-0">
          {!isMobile ? (
            <WaterScene scrollProgress={scrollProgress} />
          ) : (
            <div className="w-full h-full hero-mobile-bg" />
          )}
        </div>

        {/* ── Overlay gradient for text legibility ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,35,66,0.25) 0%, rgba(10,35,66,0.1) 40%, rgba(10,35,66,0.7) 100%)',
          }}
        />

        {/* ── Text content ─────────────────────────────────────────────────── */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">

          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            className="mb-5 text-xs font-semibold tracking-[0.35em] uppercase text-water-cyan"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {areaDisplay}
          </p>

          {/* Headline */}
          <div ref={headlineRef}>
            <h1
              className="font-heading text-6xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl md:text-[7rem] lg:text-[8rem]"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              <span className="block">HammerHead</span>
              <span
                className="block text-gradient-water"
                style={{ paddingBottom: '0.05em' }}
              >
                Pools
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <p
            ref={subRef}
            className="mt-7 max-w-sm text-lg font-light leading-relaxed sm:max-w-md sm:text-xl"
            style={{ color: 'rgba(224,242,254,0.82)', fontFamily: 'var(--font-inter)' }}
          >
            We Keep Your Pool Perfect,{' '}
            <br className="hidden sm:block" />
            So You Don&apos;t Have To
          </p>

          {/* CTA buttons */}
          <div
            ref={ctaRef}
            className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
          >
            <RippleButton href={CONTACT.phoneHref} variant="primary">
              <PhoneIcon />
              {CONTACT.phone}
            </RippleButton>
            <RippleButton href="/services" variant="outline">
              Explore Services
            </RippleButton>
          </div>

          {/* Promo badge */}
          <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-water-cyan/30 bg-water-cyan/10 px-4 py-2 backdrop-blur-sm">
            <span className="text-xs text-water-cyan font-semibold" style={{ fontFamily: 'var(--font-outfit)' }}>
              Special Offer
            </span>
            <span className="text-xs" style={{ color: 'rgba(224,242,254,0.7)' }}>
              Cartridge Filter Cleans — Only $50
            </span>
          </div>
        </div>

        {/* ── Scroll indicator ─────────────────────────────────────────────── */}
        <div
          ref={indicatorRef}
          className="scroll-indicator absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
          style={{ color: 'rgba(224,242,254,0.5)' }}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ fontFamily: 'var(--font-outfit)' }}>
            Scroll
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>

        {/* ── Bottom edge fade ─────────────────────────────────────────────── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, #0a2342)',
          }}
        />
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
