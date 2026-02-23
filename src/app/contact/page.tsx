'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { RippleButton } from '@/components/ui/RippleButton';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { CONTACT, SERVICE_AREAS } from '@/lib/constants';

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '', email: '', phone: '', area: '', message: '', service: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from(heroRef.current, { y: 40, opacity: 0, duration: 1.0, ease: 'power3.out', delay: 0.2 });
      gsap.from(formRef.current, { y: 40, opacity: 0, duration: 1.0, ease: 'power3.out', delay: 0.4 });
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: send to API route or email service (Resend, SendGrid, etc.)
    // For now: simulate success
    setSubmitted(true);
  };

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
            <SectionLabel>Get in Touch</SectionLabel>
            <h1
              className="mt-4 text-5xl font-extrabold text-white sm:text-6xl"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Let&apos;s Talk
              <br />
              <span className="text-gradient-water">About Your Pool</span>
            </h1>
            <p
              className="mt-5 text-base leading-relaxed"
              style={{ color: 'rgba(224,242,254,0.65)', fontFamily: 'var(--font-inter)' }}
            >
              Call, email, or fill out the form below. We respond quickly — usually
              within a few hours on business days.
            </p>
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <section className="pb-section">
        <div className="mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-[1fr_1.5fr]">

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <ContactCard
              icon="📞"
              title="Phone"
              value={CONTACT.phone}
              href={CONTACT.phoneHref}
            />
            <ContactCard
              icon="✉️"
              title="Email"
              value={CONTACT.email}
              href={CONTACT.emailHref}
            />
            <ContactCard
              icon="🕐"
              title="Hours"
              value={CONTACT.hours}
            />

            {/* Social */}
            <div className="glass-card rounded-xl p-6">
              <p
                className="text-xs font-semibold tracking-widest uppercase text-water-cyan mb-4"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                Follow Us
              </p>
              <div className="flex gap-3">
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-sky-light/70 hover:text-water-cyan transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Instagram · @hammerheadpoolsaz
                </a>
              </div>
            </div>

            {/* Service areas mini list */}
            <div className="glass-card rounded-xl p-6">
              <p
                className="text-xs font-semibold tracking-widest uppercase text-water-cyan mb-4"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                We Serve
              </p>
              <div className="flex flex-wrap gap-2">
                {SERVICE_AREAS.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-water-cyan/20 px-3 py-1 text-xs text-sky-light/70"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            {submitted ? (
              <div className="glass-card rounded-2xl p-10 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h2
                  className="text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  Message Received!
                </h2>
                <p
                  className="text-base"
                  style={{ color: 'rgba(224,242,254,0.65)', fontFamily: 'var(--font-inter)' }}
                >
                  Thanks for reaching out. We&apos;ll get back to you shortly.
                  In the meantime, feel free to call us at{' '}
                  <a href={CONTACT.phoneHref} className="text-water-cyan">
                    {CONTACT.phone}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-8 flex flex-col gap-5"
              >
                <h2
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  Send Us a Message
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Your Name *" required>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Jane Smith"
                    />
                  </FormField>
                  <FormField label="Email Address *" required>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="jane@example.com"
                    />
                  </FormField>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Phone Number">
                    <input
                      type="tel"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="(480) 555-0123"
                    />
                  </FormField>
                  <FormField label="Your City">
                    <select
                      name="area"
                      value={formState.area}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select area…</option>
                      {SERVICE_AREAS.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <FormField label="Service Interested In">
                  <select
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Choose a service…</option>
                    <option>Weekly Maintenance</option>
                    <option>Repairs</option>
                    <option>Cartridge Filter Clean ($50)</option>
                    <option>Other Pool Services</option>
                    <option>Not Sure — Need a Quote</option>
                  </select>
                </FormField>

                <FormField label="Message *" required>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="form-input resize-none"
                    placeholder="Tell us about your pool, what you need, any questions…"
                  />
                </FormField>

                <RippleButton variant="primary" className="mt-2 w-full justify-center">
                  Send Message
                </RippleButton>

                <p
                  className="text-xs text-center"
                  style={{ color: 'rgba(224,242,254,0.4)', fontFamily: 'var(--font-inter)' }}
                >
                  We typically respond within a few hours on business days.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Form input styles */}
      <style jsx global>{`
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: rgba(13, 59, 110, 0.4);
          border: 1px solid rgba(34, 211, 238, 0.15);
          color: #e0f2fe;
          font-size: 0.875rem;
          font-family: var(--font-inter);
          transition: border-color 0.2s;
          outline: none;
          -webkit-appearance: none;
        }
        .form-input:focus {
          border-color: rgba(34, 211, 238, 0.5);
          box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.08);
        }
        .form-input::placeholder {
          color: rgba(224, 242, 254, 0.3);
        }
        .form-input option {
          background: #0d3b6e;
          color: #e0f2fe;
        }
      `}</style>
    </main>
  );
}

function ContactCard({ icon, title, value, href }: {
  icon: string; title: string; value: string; href?: string;
}) {
  return (
    <div className="glass-card rounded-xl p-6 flex items-center gap-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <p
          className="text-xs font-semibold tracking-widest uppercase text-water-cyan"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          {title}
        </p>
        {href ? (
          <a
            href={href}
            className="text-sm text-white hover:text-water-cyan transition-colors mt-0.5 block"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-sky-light/80 mt-0.5" style={{ fontFamily: 'var(--font-inter)' }}>
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-semibold text-sky-light/70"
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
