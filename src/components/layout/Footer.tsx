import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS, SERVICE_AREAS, CONTACT } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="relative bg-pool-deep border-t border-water-cyan/10 pb-16 md:pb-0">
      {/* Top separator glow */}
      <div className="separator" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            {/* Mascot */}
            <div className="mb-4 h-20 w-20 rounded-full bg-white overflow-hidden shadow-lg shadow-water-cyan/15">
              <Image
                src="/logo-mascot.png"
                alt="HammerHead Pools mascot"
                width={80}
                height={80}
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Wordmark — inverted to white for dark background */}
            <div className="mb-4">
              <Image
                src="/logo-wordmark.jpg"
                alt="HammerHead Pools"
                width={180}
                height={60}
                className="h-8 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-sm text-sky-light/60 leading-relaxed max-w-xs">
              Locally-owned Arizona pool maintenance and repair. We keep your
              pool perfect so you don&apos;t have to.
            </p>
            {/* Social links */}
            <div className="flex gap-3 mt-5">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-water-cyan/20 hover:border-water-cyan/60 hover:bg-water-cyan/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-water-cyan/20 hover:border-water-cyan/60 hover:bg-water-cyan/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-xs font-semibold tracking-widest uppercase text-water-cyan mb-5"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Pages
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sky-light/60 hover:text-water-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3
              className="text-xs font-semibold tracking-widest uppercase text-water-cyan mb-5"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Service Areas
            </h3>
            <ul className="flex flex-col gap-3">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="text-sm text-sky-light/60">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-xs font-semibold tracking-widest uppercase text-water-cyan mb-5"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="text-sm text-sky-light/60 hover:text-water-cyan transition-colors flex items-center gap-2"
                >
                  <span className="text-water-cyan">📞</span>
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.emailHref}
                  className="text-sm text-sky-light/60 hover:text-water-cyan transition-colors flex items-center gap-2 break-all"
                >
                  <span className="text-water-cyan shrink-0">✉️</span>
                  {CONTACT.email}
                </a>
              </li>
              <li className="text-sm text-sky-light/60">
                <span className="text-water-cyan">🕐</span>{' '}
                {CONTACT.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="separator mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sky-light/40">
          <span>
            © {new Date().getFullYear()} HammerHead Pools. All rights reserved.
          </span>
          <span>Gilbert, AZ · Locally Owned &amp; Operated</span>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#22d3ee"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#22d3ee"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
