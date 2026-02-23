'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { RippleButton } from '@/components/ui/RippleButton';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SERVICE_AREAS, CONTACT, STATS } from '@/lib/constants';

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from(heroRef.current, {
        y: 40, opacity: 0, duration: 1.0, ease: 'power3.out', delay: 0.2,
      });

      sectionsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-pool-deep pt-28">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(34,211,238,0.1) 0%, transparent 60%)' }}
        />
        <div className="mx-auto max-w-6xl px-6">
          <div ref={heroRef} className="max-w-2xl">
            <SectionLabel>About Us</SectionLabel>
            <h1
              className="mt-4 text-5xl font-extrabold text-white sm:text-6xl"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Local. Trusted.
              <br />
              <span className="text-gradient-water">Personal.</span>
            </h1>
            <p
              className="mt-5 text-lg leading-relaxed"
              style={{ color: 'rgba(224,242,254,0.65)', fontFamily: 'var(--font-inter)' }}
            >
              HammerHead Pools is a locally-owned pool maintenance and repair
              company serving the greater Phoenix valley area. We&apos;re not a
              big corporate franchise — we&apos;re your neighbor, and we treat
              your pool like it&apos;s our own.
            </p>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-section">
        <div className="mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div
            ref={(el) => { if (el) sectionsRef.current[0] = el; }}
          >
            <SectionLabel>Our Story</SectionLabel>
            <h2
              className="mt-4 text-3xl font-extrabold text-white sm:text-4xl"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Why We Started
            </h2>
            <div
              className="mt-5 flex flex-col gap-4 text-base leading-relaxed"
              style={{ color: 'rgba(224,242,254,0.65)', fontFamily: 'var(--font-inter)' }}
            >
              <p>
                Josh started HammerHead Pools with a simple belief: pool owners
                deserve reliable, consistent service from someone who actually
                cares — not a revolving door of technicians who barely remember
                which pool is which.
              </p>
              <p>
                With over 3 years of hands-on experience in the Arizona desert,
                we understand the unique challenges our climate puts on pool
                chemistry, equipment, and surfaces. The blazing summers, the
                dust storms, the constant evaporation — we&apos;ve seen it all.
              </p>
              <p>
                Our goal is simple: give you back your time and peace of mind.
                When HammerHead is on your schedule, your pool is just always
                ready. No thinking required.
              </p>
            </div>
          </div>

          {/* Photo card */}
          <div
            ref={(el) => { if (el) sectionsRef.current[1] = el; }}
            className="relative rounded-2xl overflow-hidden"
            style={{ minHeight: '380px' }}
          >
            <Image
              src="/family-photo.webp"
              alt="Josh and family"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Stats overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pool-deep/95 to-transparent p-6">
              <div className="grid grid-cols-2 gap-4">
                {STATS.slice(0, 4).map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="text-2xl font-extrabold text-gradient-water"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      {stat.suffix === '$' ? `$${stat.value}` : `${stat.value}${stat.suffix ?? ''}`}
                    </div>
                    <p
                      className="mt-0.5 text-[10px] uppercase tracking-wide"
                      style={{ color: 'rgba(224,242,254,0.55)', fontFamily: 'var(--font-outfit)' }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-section bg-pool-mid">
        <div className="separator absolute left-0 right-0" />
        <div className="mx-auto max-w-6xl px-6">
          <div
            ref={(el) => { if (el) sectionsRef.current[2] = el; }}
            className="text-center mb-12"
          >
            <SectionLabel className="justify-center">What We Stand For</SectionLabel>
            <h2
              className="mt-4 text-3xl font-extrabold text-white"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Our Values
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {VALUES.map((val, i) => (
              <div
                key={val.title}
                ref={(el) => { if (el) sectionsRef.current[3 + i] = el; }}
                className="glass-card rounded-2xl p-7 text-center"
              >
                <div className="mb-4 text-3xl">{val.icon}</div>
                <h3
                  className="text-lg font-bold text-white mb-2"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {val.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(224,242,254,0.6)', fontFamily: 'var(--font-inter)' }}
                >
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <SectionLabel className="justify-center">Where We Work</SectionLabel>
          <h2
            className="mt-4 text-3xl font-extrabold text-white mb-8"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Service Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {SERVICE_AREAS.map((area) => (
              <span
                key={area}
                className="glass-card rounded-full px-5 py-2.5 text-sm font-medium text-sky-light/80"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {area}
              </span>
            ))}
          </div>
          <p
            className="mt-6 text-sm"
            style={{ color: 'rgba(224,242,254,0.45)', fontFamily: 'var(--font-inter)' }}
          >
            Not on the list? Give us a call — we may still be able to help.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-md px-6">
          <h2
            className="text-2xl font-extrabold text-white mb-4"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Ready to Meet Your Pool Guy?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RippleButton href={CONTACT.phoneHref} variant="primary">
              {CONTACT.phone}
            </RippleButton>
            <RippleButton href="/contact" variant="outline">
              Contact Us
            </RippleButton>
          </div>
        </div>
      </section>
    </main>
  );
}

const VALUES = [
  {
    icon: '🎯',
    title: 'Reliability',
    desc: 'When we say we\'ll be there, we\'re there. Your schedule matters, and we respect it.',
  },
  {
    icon: '💧',
    title: 'Attention to Detail',
    desc: 'We notice the things other companies miss — a slightly cloudy water day, a pump that sounds off.',
  },
  {
    icon: '🤝',
    title: 'Personal Service',
    desc: 'You get the same person every visit. Josh knows your pool, your preferences, your equipment.',
  },
];
