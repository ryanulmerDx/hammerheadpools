'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { siteConfig } from '@/lib/siteConfig';
import { ServiceCard3D } from '@/components/three/ServiceCard3D';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { RippleButton } from '@/components/ui/RippleButton';

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 70,
          opacity: 0,
          rotateX: 12,
          duration: 1.1,
          ease: 'power3.out',
          delay: i * 0.11,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-section bg-pool-deep section-glow">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="max-w-2xl">
          <SectionLabel>What We Do</SectionLabel>
          <h2
            className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Expert Pool Care,
            <br />
            <span className="text-gradient-water">Every Single Week</span>
          </h2>
          <p
            className="mt-4 text-base leading-relaxed max-w-lg"
            style={{ color: 'rgba(224,242,254,0.65)', fontFamily: 'var(--font-inter)' }}
          >
            From routine weekly maintenance to emergency repairs — we handle
            everything so your pool is always swim-ready.
          </p>
        </div>

        {/* Cards grid — 5 services: 3-col on lg (wraps to 3+2) */}
        <div
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: '1200px' }}
        >
          {siteConfig.services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
            >
              <ServiceCard3D service={service} />
            </div>
          ))}
        </div>

        {/* Bottom CTA row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-5">
          <RippleButton href={siteConfig.contact.phoneHref} variant="primary">
            <PhoneIcon />
            Call for Service
          </RippleButton>
          <p
            className="text-sm"
            style={{ color: 'rgba(224,242,254,0.5)', fontFamily: 'var(--font-inter)' }}
          >
            Serving Gilbert, Mesa, Chandler &amp; more
          </p>
        </div>
      </div>
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
