'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { SectionLabel } from '@/components/ui/SectionLabel';

type GalleryImage = {
  id: number;
  caption: string;
  category: string;
  src?: string;
  seed?: string;
};

const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: '/photo-skimming.png', caption: 'Weekly skimming & surface cleaning', category: 'maintenance' },
  { id: 2, src: '/pool-clean.jpg', caption: 'Crystal clear after HammerHead service', category: 'maintenance' },
  { id: 3, src: '/photo-repairs.png', caption: 'Equipment repair & pump service', category: 'repairs' },
  { id: 4, src: '/photo-water-testing.png', caption: 'Chemical testing & water balancing', category: 'maintenance' },
  { id: 5, seed: 'aquapool5', caption: 'Green pool cleanup — algae treatment', category: 'cleaning' },
  { id: 6, seed: 'aquapool6', caption: 'Filter clean & cartridge service', category: 'repairs' },
  { id: 7, seed: 'aquapool7', caption: 'After chlorine wash treatment', category: 'cleaning' },
  { id: 8, seed: 'aquapool8', caption: 'Pump replacement complete', category: 'repairs' },
  { id: 9, seed: 'aquapool9', caption: 'Swim-ready for the weekend', category: 'maintenance' },
];

const CATEGORIES = ['all', 'maintenance', 'cleaning', 'repairs'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const filtered = activeCategory === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.from(item, {
          y: 30, opacity: 0, scale: 0.97,
          duration: 0.7, ease: 'power3.out',
          delay: i * 0.07,
          scrollTrigger: { trigger: item, start: 'top 90%', once: true },
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
      if (e.key === 'ArrowRight' && lightboxImage !== null) {
        setLightboxImage((prev) => prev !== null ? (prev + 1) % filtered.length : 0);
      }
      if (e.key === 'ArrowLeft' && lightboxImage !== null) {
        setLightboxImage((prev) => prev !== null ? (prev - 1 + filtered.length) % filtered.length : 0);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxImage, filtered.length]);

  return (
    <main className="min-h-screen bg-pool-deep pt-28">
      {/* Hero */}
      <section className="py-16 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel>Our Work</SectionLabel>
          <h1
            className="mt-4 text-5xl font-extrabold text-white sm:text-6xl"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            The HammerHead
            <br />
            <span className="text-gradient-water">Portfolio</span>
          </h1>
          <p
            className="mt-4 max-w-lg text-base"
            style={{ color: 'rgba(224,242,254,0.6)', fontFamily: 'var(--font-inter)' }}
          >
            Real pools, real results. Browse transformations from across our
            service areas in the greater Phoenix valley.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <div className="mx-auto max-w-6xl px-6 mb-8">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 capitalize ${
                activeCategory === cat
                  ? 'bg-water-cyan text-pool-deep'
                  : 'glass-card text-sky-light/70 hover:text-white hover:border-water-cyan/40'
              }`}
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery grid */}
      <section ref={gridRef} className="pb-section">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((img, i) => (
              <div
                key={img.id}
                ref={(el) => { if (el) itemsRef.current[i] = el; }}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
                style={{ aspectRatio: '4/3' }}
                onClick={() => setLightboxImage(i)}
              >
                <Image
                  src={img.src ?? `https://picsum.photos/seed/${img.seed}/800/600`}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-pool-deep/0 group-hover:bg-pool-deep/60 transition-all duration-300 flex items-end p-4">
                  <p
                    className="text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0"
                    style={{ fontFamily: 'var(--font-inter)', transitionDelay: '0.05s' }}
                  >
                    {img.caption}
                  </p>
                </div>
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase text-white/70 backdrop-blur-sm capitalize"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white p-2"
            onClick={() => setLightboxImage(null)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          {/* Prev / Next */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setLightboxImage((lightboxImage - 1 + filtered.length) % filtered.length); }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setLightboxImage((lightboxImage + 1) % filtered.length); }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div
            className="relative max-w-3xl w-full mx-8"
            style={{ aspectRatio: '4/3' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightboxImage]?.src ?? `https://picsum.photos/seed/${filtered[lightboxImage]?.seed}/1200/900`}
              alt={filtered[lightboxImage]?.caption ?? ''}
              fill
              className="object-cover rounded-xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 rounded-b-xl">
              <p className="text-sm text-white" style={{ fontFamily: 'var(--font-inter)' }}>
                {filtered[lightboxImage]?.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
