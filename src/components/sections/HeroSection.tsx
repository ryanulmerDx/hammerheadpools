'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from '@/lib/gsap';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { RippleButton } from '@/components/ui/RippleButton';
import { siteConfig } from '@/lib/siteConfig';

// Dynamic import — Three.js must NOT run on the server
const WaterScene = dynamic(
  () => import('@/components/three/WaterScene').then((m) => ({ default: m.WaterScene })),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-pool-deep" />,
  }
);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const { isMobile, prefersReducedMotion } = useMediaQuery();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(
        [eyebrowRef.current, headlineRef.current, subRef.current, ctaRef.current, trustRef.current],
        {
          y: 36,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.16,
          delay: 0.3,
        }
      );
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">

      {/* ── Background: 3D Water Scene (desktop) or CSS gradient (mobile) ── */}
      <div className="absolute inset-0">
        {!isMobile ? (
          // scrollProgress fixed at 0 — camera holds at the underwater position,
          // water shader and bubbles animate on their own loop
          <WaterScene scrollProgress={0} />
        ) : (
          <div className="w-full h-full hero-mobile-bg" />
        )}
      </div>

      {/* ── Overlay gradient for text legibility ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(4,14,30,0.30) 0%, rgba(4,14,30,0.10) 40%, rgba(4,14,30,0.75) 100%)',
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
          HammerHead Pools · Phoenix Valley
        </p>

        {/* Headline */}
        <div ref={headlineRef}>
          <h1
            className="font-heading font-extrabold leading-tight tracking-tight text-white max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Phoenix Pool Maintenance &amp; Repairs
            <span
              className="block text-gradient-water mt-1"
              style={{ paddingBottom: '0.05em' }}
            >
              Fast, Reliable, Local
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="mt-6 max-w-lg text-lg font-light leading-relaxed"
          style={{ color: 'rgba(224,242,254,0.80)', fontFamily: 'var(--font-inter)' }}
        >
          Weekly service, green pool cleanups, and equipment repairs across
          Phoenix, Scottsdale &amp; Mesa.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="mt-9 flex flex-col sm:flex-row gap-4 items-center"
        >
          <RippleButton href={siteConfig.contact.phoneHref} variant="primary" className="text-sm px-7 py-3.5">
            <PhoneIcon />
            Call Now — Same Week Service
          </RippleButton>
          <RippleButton href="#contact" variant="outline" className="text-sm px-7 py-3.5">
            Request a Free Quote
          </RippleButton>
        </div>

        {/* Trust row */}
        <div
          ref={trustRef}
          className="mt-8 flex flex-wrap justify-center gap-2.5"
        >
          {siteConfig.trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 rounded-full border border-water-cyan/20 bg-black/20 px-3.5 py-1.5 backdrop-blur-sm"
            >
              <CheckIcon />
              <span
                className="text-[11px] font-medium"
                style={{ color: 'rgba(224,242,254,0.78)', fontFamily: 'var(--font-outfit)' }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom edge fade into next section ───────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0a2342)' }}
      />
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
