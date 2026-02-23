'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { RippleButton } from '@/components/ui/RippleButton';
import { CONTACT } from '@/lib/constants';

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-section overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(13,59,110,0.8) 0%, rgba(10,35,66,1) 70%)',
        }}
      />
      {/* Subtle animated water rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-water-cyan/5"
            style={{
              width: `${400 + i * 200}px`,
              height: `${400 + i * 200}px`,
              animation: `pulse ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 1.3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div ref={contentRef}>
          <p
            className="text-xs font-semibold tracking-[0.4em] uppercase text-water-cyan mb-5"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Get Started Today
          </p>

          <h2
            className="text-4xl font-extrabold text-white leading-tight sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Ready for a Pool
            <br />
            <span className="text-gradient-water">You&apos;re Proud Of?</span>
          </h2>

          <p
            className="mt-6 max-w-lg mx-auto text-base leading-relaxed"
            style={{ color: 'rgba(224,242,254,0.65)', fontFamily: 'var(--font-inter)' }}
          >
            Join homeowners across Gilbert, Mesa, Chandler, and beyond who trust
            HammerHead Pools to keep their pools perfect — week after week.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <RippleButton href={CONTACT.phoneHref} variant="primary" className="text-base px-8 py-4">
              <PhoneIcon />
              Call (928) 243-4422
            </RippleButton>
            <RippleButton href={CONTACT.emailHref} variant="outline" className="text-base px-8 py-4" external>
              <MailIcon />
              Send an Email
            </RippleButton>
          </div>

          {/* Trust signals */}
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {[
              '3+ Years of Experience',
              'Locally Owned & Operated',
              '7 Cities Served',
            ].map((signal) => (
              <div key={signal} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-water-cyan" />
                <span
                  className="text-sm"
                  style={{ color: 'rgba(224,242,254,0.55)', fontFamily: 'var(--font-inter)' }}
                >
                  {signal}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.1; transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
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

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
