'use client';

import { useRef, useState } from 'react';
import { siteConfig } from '@/lib/siteConfig';
import { SectionLabel } from '@/components/ui/SectionLabel';

const SERVICE_OPTIONS = [
  'Weekly Maintenance',
  'Pool Equipment Repair',
  'Green Pool Cleanup',
  'Filter / Pump Service',
  'One-Time Deep Clean',
  'Other',
];

// TODO: Wire up email sending.
// Options: Resend (resend.com), SendGrid, or Formspree (formspree.io — zero-config).
// Example with Formspree: replace onSubmit handler to POST to your form endpoint.
// The form fields use standard name attributes so any service can pick them up.

export function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with your real submission logic (API route, Formspree, etc.)
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative py-section"
      style={{ background: '#061224' }}
    >
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center mb-12">
          <SectionLabel className="justify-center">Free Quote</SectionLabel>
          <h2
            className="mt-4 text-4xl font-extrabold text-white sm:text-5xl"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Request a Free Quote
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: 'rgba(224,242,254,0.58)', fontFamily: 'var(--font-inter)' }}
          >
            Fill in your details and we&apos;ll get back to you the same day.
          </p>
        </div>

        {submitted ? (
          <SuccessState />
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-8 flex flex-col gap-5"
          >
            {/* Name */}
            <FormField label="Your Name" required>
              <input
                type="text"
                name="name"
                required
                placeholder="Jane Smith"
                className="form-input"
              />
            </FormField>

            {/* Phone */}
            <FormField label="Phone Number" required>
              <input
                type="tel"
                name="phone"
                required
                placeholder="(555) 000-0000"
                className="form-input"
              />
            </FormField>

            {/* Email — optional */}
            <FormField label="Email Address" hint="Optional">
              <input
                type="email"
                name="email"
                placeholder="jane@example.com"
                className="form-input"
              />
            </FormField>

            {/* Service */}
            <FormField label="Service Needed" required>
              <select name="service" required className="form-input">
                <option value="">Select a service…</option>
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </FormField>

            {/* City */}
            <FormField label="Your City" required>
              <input
                type="text"
                name="city"
                required
                placeholder="Phoenix, Scottsdale, Mesa…"
                className="form-input"
              />
            </FormField>

            {/* Message — optional */}
            <FormField label="Anything else?" hint="Optional">
              <textarea
                name="message"
                rows={3}
                placeholder="Pool size, current issue, preferred schedule…"
                className="form-input resize-none"
              />
            </FormField>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-water-cyan text-pool-deep text-sm font-bold py-4 tracking-wide hover:bg-water-bright transition-colors duration-200 cursor-pointer"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Send Request
            </button>

            <p
              className="text-center text-xs"
              style={{ color: 'rgba(224,242,254,0.35)', fontFamily: 'var(--font-inter)' }}
            >
              Or call us directly at{' '}
              <a
                href={siteConfig.contact.phoneHref}
                className="text-water-cyan hover:underline"
              >
                {siteConfig.contact.phone}
              </a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function FormField({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-sm font-semibold text-white flex items-center gap-2"
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        {label}
        {hint && (
          <span
            className="text-xs font-normal"
            style={{ color: 'rgba(224,242,254,0.38)' }}
          >
            ({hint})
          </span>
        )}
        {required && <span className="text-water-cyan">*</span>}
      </label>
      {children}
    </div>
  );
}

function SuccessState() {
  return (
    <div className="glass-card rounded-2xl p-12 text-center flex flex-col items-center gap-6">
      <div className="h-16 w-16 rounded-full bg-water-cyan/20 border border-water-cyan/30 flex items-center justify-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div>
        <h3
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          Request Sent!
        </h3>
        <p
          className="text-base"
          style={{ color: 'rgba(224,242,254,0.65)', fontFamily: 'var(--font-inter)' }}
        >
          Thanks for reaching out. We&apos;ll get back to you the same day.
        </p>
      </div>
      <p className="text-sm" style={{ color: 'rgba(224,242,254,0.42)', fontFamily: 'var(--font-inter)' }}>
        Need to reach us sooner?{' '}
        <a
          href={siteConfig.contact.phoneHref}
          className="text-water-cyan hover:underline font-semibold"
        >
          Call {siteConfig.contact.phone}
        </a>
      </p>
    </div>
  );
}
