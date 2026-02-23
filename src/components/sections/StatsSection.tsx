'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { STATS } from '@/lib/constants';

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      statRefs.current.forEach((stat, i) => {
        if (!stat) return;

        if (!prefersReducedMotion) {
          // Float in from below
          gsap.from(stat, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: stat,
              start: 'top 90%',
              once: true,
            },
          });
        }

        // Count-up animation for the number
        const valueEl = stat.querySelector('[data-count]');
        if (!valueEl) return;

        const target = parseFloat(valueEl.getAttribute('data-count') || '0');
        const isDecimal = !Number.isInteger(target);

        // Use an object reference in the closure for clean onUpdate access
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: prefersReducedMotion ? 0 : 1.6,
          ease: 'power2.out',
          delay: prefersReducedMotion ? 0 : i * 0.12 + 0.4,
          onUpdate() {
            valueEl.textContent = isDecimal
              ? counter.val.toFixed(1)
              : Math.round(counter.val).toString();
          },
          scrollTrigger: {
            trigger: stat,
            start: 'top 90%',
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 bg-pool-mid">
      <div className="separator absolute top-0 left-0 right-0" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => {
                if (el) statRefs.current[i] = el;
              }}
              className="flex flex-col items-center text-center"
            >
              {/* Number display */}
              <div className="flex items-end gap-0.5">
                {stat.suffix === '$' && (
                  <span
                    className="text-2xl font-bold text-water-cyan mb-1"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    $
                  </span>
                )}
                <span
                  className="text-4xl font-extrabold text-white sm:text-5xl"
                  data-count={stat.value}
                  style={{ fontFamily: 'var(--font-outfit)', lineHeight: 1 }}
                >
                  {stat.value}
                </span>
                {stat.suffix && stat.suffix !== '$' && (
                  <span
                    className="text-2xl font-bold text-water-cyan mb-1"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p
                className="mt-2 text-xs font-medium tracking-wide uppercase"
                style={{ color: 'rgba(224,242,254,0.55)', fontFamily: 'var(--font-outfit)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="separator absolute bottom-0 left-0 right-0" />
    </section>
  );
}
