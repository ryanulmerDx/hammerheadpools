'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import type { Service } from '@/types';

interface ServiceCard3DProps {
  service: Service;
}

export function ServiceCard3D({ service }: ServiceCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    // GSAP quickTo for silky-smooth tilt lerping
    const setRotateX = gsap.quickTo(card, 'rotateX', {
      duration: 0.5,
      ease: 'power2.out',
    });
    const setRotateY = gsap.quickTo(card, 'rotateY', {
      duration: 0.5,
      ease: 'power2.out',
    });
    const setScale = gsap.quickTo(card, 'scale', {
      duration: 0.4,
      ease: 'power2.out',
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Normalize cursor position to -1 → 1
      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);

      setRotateX(-ny * 10); // tilt up/down
      setRotateY(nx * 10);  // tilt left/right
      setScale(1.03);

      // Move the cursor glow highlight
      if (glowRef.current) {
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        glowRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(34,211,238,0.18), transparent 60%)`;
      }
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setScale(1);
      if (glowRef.current) {
        glowRef.current.style.background = 'transparent';
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="glass-card relative overflow-hidden rounded-2xl p-8 cursor-pointer will-change-transform h-full"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Cursor follow glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
      />

      {/* Highlight ring for featured card */}
      {service.highlight && (
        <div className="absolute inset-0 rounded-2xl border border-water-cyan/40 pointer-events-none" />
      )}

      {/* Highlight badge */}
      {service.highlight && (
        <div
          className="absolute top-4 right-4 rounded-full bg-water-cyan/20 border border-water-cyan/40 px-3 py-1 text-[10px] font-semibold tracking-widest uppercase text-water-cyan"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          Popular
        </div>
      )}

      {/* Content — slightly elevated for 3D depth */}
      <div style={{ transform: 'translateZ(20px)' }}>
        {/* Icon */}
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-water-cyan/10 border border-water-cyan/20">
          <ServiceIcon icon={service.icon} />
        </div>

        <h3
          className="text-xl font-bold text-white mb-1"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          {service.title}
        </h3>
        <p
          className="text-sm font-semibold text-water-cyan mb-3"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          {service.tagline}
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'rgba(224,242,254,0.65)', fontFamily: 'var(--font-inter)' }}
        >
          {service.description}
        </p>

        {/* Feature list */}
        {service.features && (
          <ul className="mt-5 flex flex-col gap-2">
            {service.features.map((feat) => (
              <li key={feat} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-water-cyan flex-shrink-0" />
                <span
                  className="text-xs"
                  style={{ color: 'rgba(224,242,254,0.55)', fontFamily: 'var(--font-inter)' }}
                >
                  {feat}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-water-cyan/50 to-transparent" />
    </div>
  );
}

function ServiceIcon({ icon }: { icon: Service['icon'] }) {
  const props = {
    width: 22,
    height: 22,
    fill: 'none',
    stroke: '#22d3ee',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (icon) {
    case 'droplet':
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );
    case 'wrench':
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M12 3l1.912 5.813L19.5 9.5l-5.588 1.688L12 17l-1.912-5.812L4.5 9.5l5.588-1.687z" />
          <path d="M5 3l.65 2 2 .65-2 .65L5 9l-.65-2.35L2 6l2.35-.65z" />
          <path d="M19 13l.65 2 2 .65-2 .65L19 19l-.65-2.35L16 16l2.35-.65z" />
        </svg>
      );
    case 'filter':
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      );
  }
}
