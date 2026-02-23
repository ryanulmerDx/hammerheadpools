'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { siteConfig } from '@/lib/siteConfig';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { RippleButton } from '@/components/ui/RippleButton';

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from('.hiw-step', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-section"
      style={{ background: '#060f1e' }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-16">
          <SectionLabel className="justify-center">Simple Process</SectionLabel>
          <h2
            className="mt-4 text-4xl font-extrabold text-white sm:text-5xl"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            How It Works
          </h2>
          <p
            className="mt-4 max-w-lg mx-auto text-base"
            style={{ color: 'rgba(224,242,254,0.6)', fontFamily: 'var(--font-inter)' }}
          >
            Getting started is easy. We keep it simple so you can get back to enjoying your pool.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 relative">
          {siteConfig.howItWorks.map((step, i) => (
            <div key={step.step} className="hiw-step relative text-center sm:text-left">
              {/* Connector line between steps */}
              {i < siteConfig.howItWorks.length - 1 && (
                <div
                  className="hidden sm:block absolute top-8 left-[calc(100%-0.5rem)] w-[calc(100%-3.5rem)] h-px"
                  style={{
                    background:
                      'linear-gradient(to right, rgba(34,211,238,0.35), rgba(34,211,238,0.08))',
                  }}
                />
              )}

              {/* Step number circle */}
              <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full border border-water-cyan/30 bg-water-cyan/8 text-2xl font-extrabold text-water-cyan" style={{ fontFamily: 'var(--font-outfit)' }}>
                {step.step}
              </div>

              <h3
                className="text-lg font-bold text-white mb-3"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(224,242,254,0.62)', fontFamily: 'var(--font-inter)' }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <RippleButton href={siteConfig.contact.phoneHref} variant="primary">
            <PhoneIcon />
            Get Started — Call Now
          </RippleButton>
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
