'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { siteConfig } from '@/lib/siteConfig';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      // Stagger the why-choose bullets from the left
      gsap.from('.why-item', {
        x: -30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Testimonial cards drift in from different angles
      const origins: Array<{ x?: number; y?: number; rotation?: number }> = [
        { x: -50, rotation: -4 },
        { y: 60 },
        { x: 50, rotation: 4 },
      ];

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          ...(origins[i] ?? origins[1]),
          opacity: 0,
          duration: 1.3,
          ease: 'power4.out',
          delay: i * 0.18,
          scrollTrigger: {
            trigger: card,
            start: 'top 87%',
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

        {/* ── Why Choose ───────────────────────────────────────────────────── */}
        <div className="grid gap-14 lg:grid-cols-2 items-start mb-24">
          <div>
            <SectionLabel>Why Hammerhead</SectionLabel>
            <h2
              className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Why Choose
              <br />
              <span className="text-gradient-water">Hammerhead Pools?</span>
            </h2>
            <p
              className="mt-5 text-base leading-relaxed"
              style={{ color: 'rgba(224,242,254,0.6)', fontFamily: 'var(--font-inter)' }}
            >
              We&apos;re not a big franchise — we&apos;re your neighbors. Here&apos;s what
              makes the difference.
            </p>
          </div>

          {/* Bullets — edit in siteConfig.whyChoose */}
          <ul className="flex flex-col gap-4 mt-2">
            {siteConfig.whyChoose.map((item) => (
              <li key={item} className="why-item flex items-start gap-3">
                <CheckIcon />
                <span
                  className="text-base leading-relaxed"
                  style={{ color: 'rgba(224,242,254,0.80)', fontFamily: 'var(--font-inter)' }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Testimonials — edit in siteConfig.testimonials ───────────────── */}
        <div className="text-center mb-12">
          <SectionLabel className="justify-center">Happy Customers</SectionLabel>
          <h2
            className="mt-4 text-3xl font-extrabold text-white sm:text-4xl"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            What Arizona Pool Owners Say
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {siteConfig.testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="glass-card rounded-2xl p-8 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <StarIcon key={si} />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-base leading-relaxed flex-1"
                style={{ color: 'rgba(224,242,254,0.85)', fontFamily: 'var(--font-inter)' }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-water-cyan/10">
                <div className="h-9 w-9 rounded-full bg-water-cyan/20 border border-water-cyan/30 flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-sm font-bold text-water-cyan"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {t.name[0]}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {t.name}
                  </p>
                  {t.location && (
                    <p className="text-xs" style={{ color: 'rgba(224,242,254,0.45)', fontFamily: 'var(--font-inter)' }}>
                      {t.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#22d3ee"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0 mt-0.5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#22d3ee" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
