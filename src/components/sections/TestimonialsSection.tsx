'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { TESTIMONIALS } from '@/lib/constants';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      // Each card drifts in from a slightly different direction with natural momentum
      const origins = [
        { x: -50, rotation: -4 },   // first: from left, tilted left
        { y: 60, rotation: 0 },      // middle: straight up
        { x: 50, rotation: 4 },      // last: from right, tilted right
      ];

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const origin = origins[i] ?? origins[1];
        gsap.from(card, {
          ...origin,
          opacity: 0,
          duration: 1.3,
          ease: 'power4.out',
          delay: i * 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
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
        <div className="text-center mb-14">
          <SectionLabel className="justify-center">Happy Customers</SectionLabel>
          <h2
            className="mt-4 text-4xl font-extrabold text-white sm:text-5xl"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            What Arizona Pool Owners
            <br />
            <span className="text-gradient-water">Say About Us</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <div
              key={testimonial.name}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="glass-card rounded-2xl p-8 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: testimonial.stars }).map((_, si) => (
                  <StarIcon key={si} />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-base leading-relaxed flex-1"
                style={{ color: 'rgba(224,242,254,0.85)', fontFamily: 'var(--font-inter)' }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-water-cyan/10">
                <div className="h-9 w-9 rounded-full bg-water-cyan/20 border border-water-cyan/30 flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-sm font-bold text-water-cyan"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {testimonial.name[0]}
                  </span>
                </div>
                <div>
                  <p
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {testimonial.name}
                  </p>
                  {testimonial.location && (
                    <p
                      className="text-xs"
                      style={{ color: 'rgba(224,242,254,0.45)', fontFamily: 'var(--font-inter)' }}
                    >
                      {testimonial.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Area grid */}
        <div className="mt-16 text-center">
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            style={{ color: 'rgba(224,242,254,0.4)', fontFamily: 'var(--font-outfit)' }}
          >
            Proudly Serving
          </p>
          <AreasList />
        </div>
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="#22d3ee"
      stroke="none"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function AreasList() {
  const areas = [
    'Gilbert', 'Mesa', 'Chandler', 'Queen Creek',
    'San Tan Valley', 'Scottsdale', 'Paradise Valley',
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {areas.map((area, i) => (
        <span key={area}>
          <span
            className="text-sm text-white font-medium"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {area}
          </span>
          {i < areas.length - 1 && (
            <span className="ml-3 text-water-cyan/40">·</span>
          )}
        </span>
      ))}
    </div>
  );
}
