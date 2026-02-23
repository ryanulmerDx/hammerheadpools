interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="h-px w-6 bg-water-cyan" />
      <span
        className="text-xs font-semibold tracking-[0.3em] uppercase text-water-cyan"
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        {children}
      </span>
    </div>
  );
}
