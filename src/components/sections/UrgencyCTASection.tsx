'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { siteConfig } from '@/lib/siteConfig';
import { RippleButton } from '@/components/ui/RippleButton';

export function UrgencyCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{ background: '#0d3b6e' }}
    >
      {/* Subtle bottom glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 110%, rgba(34,211,238,0.14) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div ref={contentRef}>
          <p
            className="text-xs font-semibold tracking-[0.4em] uppercase text-water-cyan mb-4"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Available This Week
          </p>

          <h2
            className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Need Pool Service This Week?
          </h2>

          <p
            className="mt-4 text-base max-w-md mx-auto"
            style={{ color: 'rgba(224,242,254,0.70)', fontFamily: 'var(--font-inter)' }}
          >
            We often have same-week availability. Call now and we&apos;ll get back
            to you the same day.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <RippleButton
              href={siteConfig.contact.phoneHref}
              variant="primary"
              className="text-base px-8 py-4"
            >
              <PhoneIcon />
              Call Now — {siteConfig.contact.phone}
            </RippleButton>
            <RippleButton href="#contact" variant="outline" className="text-base px-8 py-4">
              Request a Quote
            </RippleButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
