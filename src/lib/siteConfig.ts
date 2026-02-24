/**
 * siteConfig.ts — Single source of truth for all site content.
 *
 * Edit phone, trust items, services, service areas, testimonials,
 * and how-it-works steps here. No need to touch individual components.
 */

export interface TrustItem {
  label: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export const siteConfig = {
  name: 'Hammerhead Pools',

  // ── Contact ────────────────────────────────────────────────────────────────
  contact: {
    phone: '(928) 243-4422',
    phoneHref: 'tel:9282434422',
    email: 'hammerheadpoolsaz@gmail.com',
    emailHref: 'mailto:hammerheadpoolsaz@gmail.com',
    instagram: 'https://instagram.com/hammerheadpoolsaz',
    facebook: 'https://facebook.com/hammerheadpoolsaz',
    hours: 'Monday – Friday',
  },

  // ── Trust items ────────────────────────────────────────────────────────────
  // Note: "Licensed & Insured*" — remove the asterisk once you can confirm
  // your license/insurance status with your state/county requirements.
  trustItems: [
    { label: 'Licensed & Insured*' }, // * Remove asterisk once confirmed
    { label: 'Locally Owned' },
    { label: '5-Star Service' }, // Add link to reviews when available
    { label: 'Serving the East Valley' },
  ] as TrustItem[],

  // ── Service areas (Local SEO) ──────────────────────────────────────────────
  serviceAreas: ['Gilbert', 'Mesa', 'Chandler', 'Queen Creek', 'Scottsdale', 'Tempe'],

  // ── Services ──────────────────────────────────────────────────────────────
  services: [
    {
      id: 'maintenance',
      title: 'Weekly Pool Maintenance',
      tagline: 'Swim-Ready Year-Round',
      description:
        'Chemical balancing, skimmer cleaning, brushing walls and floor — every week, without fail.',
      icon: 'droplet' as const,
      highlight: false,
      features: [
        'Chemical testing & balancing',
        'Skimmer & basket cleaning',
        'Wall & floor brushing',
        'Equipment inspection',
      ],
    },
    {
      id: 'repairs',
      title: 'Pool Equipment Repair',
      tagline: 'Fast Fixes, No Hassle',
      description:
        "Pumps, leaks, filters — we diagnose fast and fix right the first time so you're back in the water without delay.",
      icon: 'wrench' as const,
      highlight: true,
      features: [
        'Leak detection & repair',
        'Pump & motor replacement',
        'Filter system repairs',
        'Plumbing & valve work',
      ],
    },
    {
      id: 'green',
      title: 'Green Pool Cleanup',
      tagline: 'Crystal Clear Results',
      description:
        "Algae-infested pool? We shock, brush, and vacuum until it's safe and sparkling again.",
      icon: 'sparkles' as const,
      highlight: false,
      features: [
        'Algae shock treatment',
        'Full brush & vacuum',
        'Chemical rebalancing',
        'Follow-up check',
      ],
    },
    {
      id: 'filter',
      title: 'Filter & Pump Service',
      tagline: 'Special — Only $50',
      description:
        'Extend the life of your equipment with our $50 cartridge filter clean — our most popular add-on.',
      icon: 'filter' as const,
      highlight: false,
      features: [
        'Full cartridge inspection',
        'Deep pressure rinse',
        'Element reassembly',
        'Flow test & check',
      ],
    },
    {
      id: 'deepclean',
      title: 'One-Time Deep Clean',
      tagline: 'Fresh Start',
      description:
        "Moving in or starting fresh? We'll do a thorough one-time deep clean and reset your pool to pristine.",
      icon: 'star' as const,
      highlight: false,
      features: [
        'Full brush & vacuum',
        'Filter backwash',
        'Chemical reset',
        'Equipment check',
      ],
    },
  ],

  // ── Testimonials — update this array when new reviews come in ─────────────
  testimonials: [
    {
      name: 'Hunter',
      quote: "Hammerhead pools is the best pool company I've ever used hands down.",
      stars: 5,
      location: 'Gilbert, AZ',
    },
    {
      name: 'Andrea',
      quote: 'Our pool has never looked better thanks to the incredible work of our Pool Guy!',
      stars: 5,
      location: 'Mesa, AZ',
    },
    {
      name: 'Jerel',
      quote: "Josh does a terrific job for us! He's responsive and dependable.",
      stars: 5,
      location: 'Chandler, AZ',
    },
  ],

  // ── How It Works ───────────────────────────────────────────────────────────
  howItWorks: [
    {
      step: 1,
      title: 'Call or Request a Quote',
      description: "Give us a call or fill out our quick form — we'll respond the same day.",
    },
    {
      step: 2,
      title: 'We Assess Your Pool',
      description:
        "We evaluate your pool's condition and recommend the right service plan for your budget.",
    },
    {
      step: 3,
      title: 'We Service Weekly',
      description:
        'Sit back and enjoy your pool. We show up every week, rain or shine — guaranteed.',
    },
  ] as HowItWorksStep[],

  // ── Why Choose Hammerhead ──────────────────────────────────────────────────
  whyChoose: [
    'Same-week service available — no long wait lists',
    'Locally owned and operated in the East Valley',
    'Responsive communication — real answers, fast',
    'Transparent pricing with no surprise charges',
    'Serving Gilbert, Mesa, Chandler, Queen Creek & more',
    '$50 cartridge filter clean special',
  ],

  // ── Stats ──────────────────────────────────────────────────────────────────
  stats: [
    { value: '3', suffix: '+', label: 'Years Serving Arizona' },
    { value: '6', label: 'Cities Covered' },
    { value: '100', suffix: '%', label: 'Locally Owned & Operated' },
    { value: '50', suffix: '$', label: 'Filter Clean Special' },
  ],

  // ── Nav links ──────────────────────────────────────────────────────────────
  navLinks: [
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ],
};
