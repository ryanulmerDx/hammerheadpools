import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection';
import { SpecialDealsSection } from '@/components/sections/SpecialDealsSection';
import { ServiceAreasSection } from '@/components/sections/ServiceAreasSection';
import { UrgencyCTASection } from '@/components/sections/UrgencyCTASection';
import { ContactFormSection } from '@/components/sections/ContactFormSection';

export default function HomePage() {
  return (
    <main>
      {/* 200vh scroll-driven 3D hero — new SEO headline + trust row + 2 CTAs */}
      <HeroSection />

      {/* Quick-scan trust stats */}
      <StatsSection />

      {/* 5 service cards — each with benefit bullets + Call for Service link */}
      <ServicesSection />

      {/* 3-step process to reduce friction */}
      <HowItWorksSection />

      {/* "Why Choose" bullets + testimonials */}
      <TrustSection />

      {/* Before / after visual proof */}
      <BeforeAfterSection />

      {/* Special offers — new customer + referral deals */}
      <SpecialDealsSection />

      {/* Local SEO — city list with natural language paragraph */}
      <ServiceAreasSection />

      {/* Urgency CTA — same-week availability hook */}
      <UrgencyCTASection />

      {/* Contact form — id="contact" anchors the hero CTA "Request a Free Quote" */}
      <ContactFormSection />
    </main>
  );
}
