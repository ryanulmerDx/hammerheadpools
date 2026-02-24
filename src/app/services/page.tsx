'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { SERVICES, CONTACT } from '@/lib/constants';
import { ServiceCard3D } from '@/components/three/ServiceCard3D';
import { RippleButton } from '@/components/ui/RippleButton';
import { SectionLabel } from '@/components/ui/SectionLabel';

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from(heroRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        delay: 0.2,
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1.0,
          ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-pool-deep pt-28">
      {/* Page hero */}
      <section className="relative py-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% -20%, rgba(34,211,238,0.12) 0%, transparent 60%)',
          }}
        />
        <div className="mx-auto max-w-6xl px-6">
          <div ref={heroRef} className="max-w-2xl">
            <SectionLabel>Our Services</SectionLabel>
            <h1
              className="mt-4 text-5xl font-extrabold text-white sm:text-6xl"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Everything Your Pool
              <br />
              <span className="text-gradient-water">Could Ever Need</span>
            </h1>
            <p
              className="mt-5 text-lg leading-relaxed"
              style={{ color: 'rgba(224,242,254,0.65)', fontFamily: 'var(--font-inter)' }}
            >
              From weekly chemical balancing to emergency pump replacement, we
              handle it all. Locally owned, personally invested — that&apos;s
              the HammerHead difference.
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-section">
        <div className="mx-auto max-w-6xl px-6">
          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2"
            style={{ perspective: '1200px' }}
          >
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                ref={(el) => { if (el) cardsRef.current[i] = el; }}
              >
                <ServiceCard3D service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers strip */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div
            className="rounded-2xl border border-water-cyan/20 px-7 py-6"
            style={{ background: 'rgba(34,211,238,0.06)' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <p
                className="text-xs font-semibold tracking-widest uppercase text-water-cyan"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                Current Offers
              </p>
              <p
                className="text-[11px] text-sky-light/40"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Valid through December 31, 2026
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: '50% Off Your 2nd Month', detail: 'Sign up for weekly cleaning' },
                { label: 'Refer a Friend — Both Save $50', detail: 'When your referral signs up' },
                { label: '3 Referrals = 1 Free Month', detail: 'Our top referral reward' },
              ].map((deal) => (
                <div
                  key={deal.label}
                  className="rounded-xl border border-water-cyan/15 px-4 py-3"
                  style={{ background: 'rgba(34,211,238,0.05)' }}
                >
                  <p
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {deal.label}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: 'rgba(224,242,254,0.5)', fontFamily: 'var(--font-inter)' }}
                  >
                    {deal.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-section bg-pool-mid">
        <div className="separator absolute left-0 right-0" />
        <div className="mx-auto max-w-3xl px-6">
          <SectionLabel>Questions</SectionLabel>
          <h2
            className="mt-4 mb-10 text-3xl font-extrabold text-white"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Frequently Asked
          </h2>
          <div className="flex flex-col gap-5">
            {FAQ.map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-xl px-6">
          <h2
            className="text-3xl font-extrabold text-white mb-4"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Ready to Get Started?
          </h2>
          <p
            className="mb-8 text-base"
            style={{ color: 'rgba(224,242,254,0.6)', fontFamily: 'var(--font-inter)' }}
          >
            Give us a call or send an email and we&apos;ll get you set up with a schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RippleButton href={CONTACT.phoneHref} variant="primary">
              {CONTACT.phone}
            </RippleButton>
            <RippleButton href={CONTACT.emailHref} variant="outline" external>
              Email Us
            </RippleButton>
          </div>
        </div>
      </section>
    </main>
  );
}

const FAQ = [
  {
    q: 'How often do you service pools?',
    a: 'We offer weekly maintenance visits — the most effective frequency for keeping water chemistry balanced and equipment running smoothly year-round in the Arizona heat.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We currently serve Gilbert, Mesa, Chandler, and Queen Creek. Not sure if we cover your neighborhood? Just give us a call.',
  },
  {
    q: 'What is included in weekly maintenance?',
    a: 'Every visit includes chemical testing and balancing, skimmer and basket cleaning, brushing walls and floor, and a visual inspection of all equipment.',
  },
  {
    q: 'Do you handle repairs on the same visit?',
    a: 'Minor repairs (cleaning, adjustments) are handled same-visit. For larger repairs like pump replacement or leak detection, we schedule a dedicated repair visit.',
  },
  {
    q: 'How much does the cartridge filter clean cost?',
    a: 'Our current special is $50 for a full cartridge filter clean — inspection, deep pressure rinse, reassembly, and flow test. This is a limited-time offer.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3
        className="text-base font-semibold text-white mb-2"
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        {q}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'rgba(224,242,254,0.6)', fontFamily: 'var(--font-inter)' }}
      >
        {a}
      </p>
    </div>
  );
}
