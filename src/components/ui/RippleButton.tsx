'use client';

import { useRef, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';

interface RippleButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  external?: boolean;
  disabled?: boolean;
}

export function RippleButton({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
  external = false,
  disabled = false,
}: RippleButtonProps) {
  const elementRef = useRef<HTMLElement | null>(null);

  const triggerRipple = useCallback((e: React.MouseEvent) => {
    const el = elementRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2.2;

    const ripple = document.createElement('span');
    Object.assign(ripple.style, {
      position: 'absolute',
      borderRadius: '50%',
      pointerEvents: 'none',
      width: `${size}px`,
      height: `${size}px`,
      left: `${x - size / 2}px`,
      top: `${y - size / 2}px`,
      background: 'rgba(34, 211, 238, 0.35)',
      transform: 'scale(0)',
      zIndex: '0',
    });

    el.appendChild(ripple);

    gsap.to(ripple, {
      scale: 1,
      opacity: 0,
      duration: 0.75,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    });

    onClick?.();
  }, [onClick]);

  const baseStyles = [
    'relative inline-flex items-center justify-center gap-2',
    'rounded-full px-7 py-3.5',
    'text-sm font-semibold tracking-wide',
    'transition-all duration-300',
    'cursor-pointer select-none',
    'overflow-hidden',
  ].join(' ');

  const variantStyles: Record<string, string> = {
    primary:
      'bg-water-cyan text-pool-deep hover:bg-water-bright shadow-lg shadow-water-cyan/30 hover:shadow-water-cyan/50 hover:scale-[1.03] active:scale-[0.98]',
    outline:
      'border border-water-cyan/50 text-white hover:bg-water-cyan/10 hover:border-water-cyan hover:scale-[1.02] active:scale-[0.98]',
    ghost:
      'text-water-cyan hover:bg-water-cyan/10 hover:scale-[1.02] active:scale-[0.98]',
  };

  const finalClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const setRef = (el: HTMLAnchorElement | null) => {
    elementRef.current = el;
  };
  const setButtonRef = (el: HTMLButtonElement | null) => {
    elementRef.current = el;
  };

  if (href) {
    if (external) {
      return (
        <a
          ref={setRef}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={finalClassName}
          style={{ fontFamily: 'var(--font-outfit)' }}
          onClick={triggerRipple}
        >
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </a>
      );
    }
    return (
      <Link
        ref={setRef}
        href={href}
        className={finalClassName}
        style={{ fontFamily: 'var(--font-outfit)' }}
        onClick={triggerRipple}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Link>
    );
  }

  return (
    <button
      ref={setButtonRef}
      className={`${finalClassName} disabled:opacity-60 disabled:cursor-not-allowed`}
      style={{ fontFamily: 'var(--font-outfit)' }}
      onClick={disabled ? undefined : triggerRipple}
      disabled={disabled}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
