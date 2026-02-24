'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { RippleButton } from '@/components/ui/RippleButton';
import { siteConfig } from '@/lib/siteConfig';

const DEALS = [
  {
    id: 'second-month',
    badge: 'New Customers',
    headline: '50% Off Your 2nd Month',
    description:
      'Sign up for weekly cleaning and your second month of service is half price — no catch, no commitment.',
    icon: <DropIcon />,
    accent: '#22d3ee',
  },
  {
    id: 'refer-friend',
    badge: 'Referral Bonus',
    headline: 'Refer a Friend — You Both Save $50',
    description:
      'Send a friend our way and when they sign up, you each get $50 off your next invoice. Everyone wins.',
    icon: <PeopleIcon />,
    accent: '#00c6fb',
  },
  {
    id: 'three-referrals',
    badge: 'Top Referrer',
    headline: '3 Referrals = 1 Free Month',
    description:
      'Refer three friends who sign up for service and your next month is completely on us.',
    icon: <StarIcon />,
    accent: '#38bdf8',
  },
] as const;

export function SpecialDealsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from('.deal-card', {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-section bg-pool-deep">
      {/* Subtle cyan glow at top */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(34,211,238,0.3), transparent)',
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-14">
          <SectionLabel className="justify-center">Limited Time</SectionLabel>
          <h2
            className="mt-4 text-4xl font-extrabold text-white sm:text-5xl"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Special Offers
          </h2>
          <p
            className="mt-4 max-w-md mx-auto text-base"
            style={{ color: 'rgba(224,242,254,0.6)', fontFamily: 'var(--font-inter)' }}
          >
            Exclusive deals for new customers and loyal clients who spread the word.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {DEALS.map((deal) => (
            <div
              key={deal.id}
              className="deal-card glass-card rounded-2xl p-7 flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Glow accent */}
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-[0.07] pointer-events-none"
                style={{ background: deal.accent, filter: 'blur(32px)' }}
              />

              {/* Badge */}
              <span
                className="self-start rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
                style={{
                  fontFamily: 'var(--font-outfit)',
                  background: `${deal.accent}18`,
                  color: deal.accent,
                  border: `1px solid ${deal.accent}30`,
                }}
              >
                {deal.badge}
              </span>

              {/* Icon */}
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl"
                style={{ background: `${deal.accent}14` }}
              >
                <span style={{ color: deal.accent }}>{deal.icon}</span>
              </div>

              {/* Copy */}
              <div>
                <h3
                  className="text-lg font-bold text-white leading-snug"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {deal.headline}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'rgba(224,242,254,0.6)', fontFamily: 'var(--font-inter)' }}
                >
                  {deal.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Expiry + CTA */}
        <div className="mt-12 flex flex-col items-center gap-5">
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: 'rgba(224,242,254,0.35)', fontFamily: 'var(--font-outfit)' }}
          >
            All offers valid through December 31, 2026
          </p>
          <RippleButton href={siteConfig.contact.phoneHref} variant="primary">
            <PhoneIcon />
            Claim Your Deal — Call Now
          </RippleButton>
        </div>
      </div>
    </section>
  );
}

function DropIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
