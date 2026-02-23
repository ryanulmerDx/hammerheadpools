'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { siteConfig } from '@/lib/siteConfig';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { RippleButton } from '@/components/ui/RippleButton';

export function ServiceAreasSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from('.area-chip', {
        scale: 0.85,
        opacity: 0,
        duration: 0.55,
        ease: 'back.out(1.7)',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const areas = siteConfig.serviceAreas;
  // Build a natural-sounding list for the SEO paragraph
  const areaList = areas.slice(0, -1).join(', ') + ', and ' + areas[areas.length - 1];

  return (
    <section
      ref={sectionRef}
      className="relative py-section"
      style={{ background: '#060f1e' }}
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SectionLabel className="justify-center">Service Area</SectionLabel>

        <h2
          className="mt-4 text-4xl font-extrabold text-white sm:text-5xl"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          Proudly Serving
          <br />
          <span className="text-gradient-water">the Phoenix Valley</span>
        </h2>

        {/* Local SEO paragraph — naturally includes city names */}
        <p
          className="mt-6 max-w-2xl mx-auto text-base leading-relaxed"
          style={{ color: 'rgba(224,242,254,0.65)', fontFamily: 'var(--font-inter)' }}
        >
          Hammerhead Pools provides professional pool service in {areaList}.
          Whether you need weekly pool maintenance in Phoenix, a green pool cleanup in
          Scottsdale, or pool equipment repairs in Mesa — our team is nearby and ready
          to help the same week.
        </p>

        {/* City chips */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {areas.map((area) => (
            <div
              key={area}
              className="area-chip rounded-full border border-water-cyan/25 bg-water-cyan/6 px-5 py-2.5"
            >
              <span
                className="text-sm font-semibold text-white"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {area}
              </span>
            </div>
          ))}
        </div>

        <p
          className="mt-7 text-sm"
          style={{ color: 'rgba(224,242,254,0.38)', fontFamily: 'var(--font-inter)' }}
        >
          Not sure if we cover your area? Give us a call — we may serve nearby neighborhoods too.
        </p>

        <div className="mt-8">
          <RippleButton href={siteConfig.contact.phoneHref} variant="outline">
            <PhoneIcon />
            {siteConfig.contact.phone}
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
