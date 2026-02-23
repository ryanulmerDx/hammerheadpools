'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, CONTACT } from '@/lib/constants';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'py-3 backdrop-blur-xl border-b border-water-cyan/10 shadow-lg'
          : 'py-5'
      }`}
      style={{
        backgroundColor:
          scrolled || menuOpen ? 'rgba(10, 35, 66, 0.92)' : 'transparent',
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-10 w-10 rounded-full bg-white overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-md shadow-water-cyan/20">
            <Image
              src="/logo-mascot.webp"
              alt="HammerHead Pools mascot"
              width={40}
              height={40}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
          <span
            className="font-heading text-lg font-bold text-white"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            HammerHead{' '}
            <span className="text-water-cyan">Pools</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-water-cyan'
                    : 'text-sky-light/80 hover:text-water-cyan'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-water-cyan text-pool-deep hover:bg-water-bright transition-all duration-300 shadow-lg shadow-water-cyan/25 hover:shadow-water-cyan/40 hover:scale-[1.03] active:scale-[0.98]"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            <PhoneIcon />
            Call Now
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sky-light/80 hover:text-water-cyan transition-colors text-base py-1"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold bg-water-cyan text-pool-deep hover:bg-water-bright transition-all duration-300 mt-2"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            <PhoneIcon />
            {CONTACT.phone}
          </a>
        </div>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
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
