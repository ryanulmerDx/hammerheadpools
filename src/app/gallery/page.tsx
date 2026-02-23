'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { RippleButton } from '@/components/ui/RippleButton';
import { CONTACT } from '@/lib/constants';

// ─── Before/After transformation pairs ────────────────────────────────────────
const TRANSFORMATIONS = [
  {
    id: 1,
    before: { src: '/pool-before-green.webp', label: 'Green algae · debris-filled',      pos: 'object-top'    },
    after:  { src: '/pool-after-1.webp',      label: 'Crystal clear · swim-ready',       pos: 'object-top'    },
    title:   'Green Pool Rescue',
    outcome: 'Algae cleared and chemistry fully balanced — swim-ready within days.',
  },
  {
    id: 2,
    before: { src: '/pool-before-algae.webp', label: 'Heavy algae & floor staining',     pos: 'object-center' },
    after:  { src: '/pool-after-luxury.webp', label: 'Sparkling · waterfall flowing',    pos: 'object-center' },
    title:   'Luxury Pool Restoration',
    outcome: 'Black algae and deep floor stains fully cleared. Waterfall and spa restored.',
  },
  {
    id: 3,
    before: { src: '/filters-dirty.webp',     label: 'Clogged · end-of-life cartridges', pos: 'object-center' },
    after:  { src: '/filters-clean.webp',     label: 'Deep-cleaned · like new',          pos: 'object-center' },
    title:   'Filter Deep Clean',
    outcome: 'Four cartridges restored to factory performance — no replacement needed.',
  },
];

// ─── Standalone action shots ───────────────────────────────────────────────────
const ACTION_SHOTS = [
  { id: 1, src: '/josh-water-testing.webp',  caption: 'On-site water chemistry — every single visit' },
  { id: 2, src: '/josh-filter-service.jpg',  caption: 'Filter cartridge removal & inspection' },
  { id: 3, src: '/filters-comparison.webp',  caption: 'Clean vs end-of-life — the difference is visible' },
];

export default function GalleryPage() {
  const pairsRef   = useRef<HTMLDivElement[]>([]);
  const actionsRef = useRef<HTMLDivElement[]>([]);
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    [...pairsRef.current, ...actionsRef.current].forEach((el, i) => {
      if (!el) return;
      gsap.from(el, {
        y: 30, opacity: 0, scale: 0.97,
        duration: 0.7, ease: 'power3.out',
        delay: i * 0.06,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <main className="min-h-screen bg-pool-deep pt-28">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel>Our Work</SectionLabel>
          <h1
            className="mt-4 text-5xl font-extrabold text-white sm:text-6xl"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Real Pools.
            <br />
            <span className="text-gradient-water">Real Results.</span>
          </h1>
          <p
            className="mt-4 max-w-lg text-base"
            style={{ color: 'rgba(224,242,254,0.6)', fontFamily: 'var(--font-inter)' }}
          >
            Every transformation below is a real HammerHead job in the Phoenix
            valley. Before on the left. After on the right. No touch-ups.
          </p>
        </div>
      </section>

      {/* ── Transformations ─────────────────────────────────────────── */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-8">
            {TRANSFORMATIONS.map((pair, i) => (
              <div
                key={pair.id}
                ref={(el) => { if (el) pairsRef.current[i] = el; }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                {/* Photos side by side */}
                <div className="grid grid-cols-2 h-56 sm:h-80 relative">

                  {/* BEFORE */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={pair.before.src}
                      alt={`Before: ${pair.title}`}
                      fill
                      className={`object-cover ${pair.before.pos}`}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 600px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                    <span
                      className="absolute top-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-white/90 backdrop-blur-sm"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      Before
                    </span>
                    <p
                      className="absolute bottom-3 left-3 text-[11px] text-white/60 leading-tight max-w-[90%]"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {pair.before.label}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="absolute inset-y-0 left-1/2 w-px bg-white/25 z-10 -translate-x-px" />

                  {/* AFTER */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={pair.after.src}
                      alt={`After: ${pair.title}`}
                      fill
                      className={`object-cover ${pair.after.pos}`}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 600px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span
                      className="absolute top-3 right-3 rounded-full bg-water-cyan/90 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-pool-deep backdrop-blur-sm"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      After
                    </span>
                    <p
                      className="absolute bottom-3 right-3 text-right text-[11px] text-white/60 leading-tight max-w-[90%]"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {pair.after.label}
                    </p>
                  </div>
                </div>

                {/* Caption */}
                <div className="px-5 py-4 flex items-start gap-4">
                  <div>
                    <h3
                      className="font-bold text-white text-base"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      {pair.title}
                    </h3>
                    <p
                      className="mt-0.5 text-sm leading-relaxed"
                      style={{ color: 'rgba(224,242,254,0.55)', fontFamily: 'var(--font-inter)' }}
                    >
                      {pair.outcome}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── On the Job ──────────────────────────────────────────────── */}
      <section className="pb-section">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel>On the Job</SectionLabel>
          <h2
            className="mt-3 mb-8 text-2xl font-extrabold text-white"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Every Visit, Start to Finish
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {ACTION_SHOTS.map((shot, i) => (
              <div
                key={shot.id}
                ref={(el) => { if (el) actionsRef.current[i] = el; }}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
                style={{ aspectRatio: '4/3' }}
                onClick={() => setLightbox({ src: shot.src, caption: shot.caption })}
              >
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-pool-deep/0 group-hover:bg-pool-deep/55 transition-all duration-300 flex items-end p-4">
                  <p
                    className="text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0"
                    style={{ fontFamily: 'var(--font-inter)', transitionDelay: '0.05s' }}
                  >
                    {shot.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="pb-20 md:pb-section text-center">
        <div className="mx-auto max-w-md px-6">
          <p
            className="text-lg font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Ready for results like these?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <RippleButton href={CONTACT.phoneHref} variant="primary">
              {CONTACT.phone}
            </RippleButton>
            <RippleButton href="/contact" variant="outline">
              Get a Free Quote
            </RippleButton>
          </div>
        </div>
      </section>

      {/* ── Lightbox ────────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white p-2"
            onClick={() => setLightbox(null)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-w-3xl w-full mx-8"
            style={{ aspectRatio: '4/3' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.caption}
              fill
              className="object-cover rounded-xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 rounded-b-xl">
              <p className="text-sm text-white" style={{ fontFamily: 'var(--font-inter)' }}>
                {lightbox.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
