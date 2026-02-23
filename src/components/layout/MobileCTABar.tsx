'use client';

import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';

// Fixed bottom bar visible only on mobile (< md).
// Ensures a call or quote request is always one tap away.
export function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div
        className="flex border-t"
        style={{
          background: 'rgba(4, 14, 30, 0.97)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'rgba(34, 211, 238, 0.18)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <Link
          href={siteConfig.contact.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-semibold text-white active:bg-white/5 transition-colors"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          <PhoneIcon />
          Call Now
        </Link>

        <div style={{ width: '1px', background: 'rgba(34, 211, 238, 0.18)' }} />

        <Link
          href="/contact"
          className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-semibold active:bg-white/5 transition-colors"
          style={{ color: '#22d3ee', fontFamily: 'var(--font-outfit)' }}
        >
          <QuoteIcon />
          Get Quote
        </Link>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
