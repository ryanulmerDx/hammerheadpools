import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <main>
      {/* 200vh scroll-driven 3D hero narrative */}
      <HeroSection />

      {/* Quick trust stats (years, cities, etc.) */}
      <StatsSection />

      {/* 3D tilt service cards with float-in animations */}
      <ServicesSection />

      {/* Scroll-driven clip-path before/after reveal */}
      <BeforeAfterSection />

      {/* Drifting testimonial cards */}
      <TestimonialsSection />

      {/* Final conversion CTA */}
      <CTASection />
    </main>
  );
}
