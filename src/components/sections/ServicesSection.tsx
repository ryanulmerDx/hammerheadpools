'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { SERVICES } from '@/lib/constants';
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

      // Staggered float-in with slight 3D perspective tilt from below
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 70,
          opacity: 0,
          rotateX: 12,
          duration: 1.1,
          ease: 'power3.out',
          delay: i * 0.13,
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

        {/* Cards grid */}
        <div
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: '1200px' }}
        >
          {SERVICES.map((service, i) => (
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
          <RippleButton href="/services" variant="outline">
            See Full Service List
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
