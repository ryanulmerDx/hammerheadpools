import type { Service, Testimonial, NavLink, StatItem } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'maintenance',
    title: 'Weekly Maintenance',
    tagline: 'Swim-Ready Year-Round',
    description:
      'Chemical balancing, skimmer cleaning, brushing walls and floor — every week, without fail. Your pool will always be ready when you are.',
    icon: 'droplet',
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
    title: 'Repairs',
    tagline: 'Fast Fixes, No Hassle',
    description:
      'Leaks, pump replacements, equipment failures — we diagnose fast and fix right the first time so you\'re back in the water without delay.',
    icon: 'wrench',
    highlight: true,
    features: [
      'Leak detection & repair',
      'Pump & motor replacement',
      'Filter system repairs',
      'Plumbing & valve work',
    ],
  },
  {
    id: 'other',
    title: 'Pool Services',
    tagline: 'Complete Care',
    description:
      'Filter cleaning, light replacement, chlorine washing, acid washing — full-service pool care for everything beyond weekly maintenance.',
    icon: 'sparkles',
    highlight: false,
    features: [
      'Filter cleaning & replacement',
      'Light replacement',
      'Chlorine & acid washing',
      'Algae treatment',
    ],
  },
  {
    id: 'filter',
    title: 'Cartridge Filter Cleans',
    tagline: 'Special — Only $50',
    description:
      'Extend the life of your filter equipment while keeping your water crystal clear. Our $50 cartridge filter clean special won\'t last forever.',
    icon: 'filter',
    highlight: false,
    features: [
      'Full cartridge inspection',
      'Deep pressure rinse',
      'Element reassembly',
      'Flow test & check',
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Hunter',
    quote:
      'Hammerhead pools is the best pool company I\'ve ever used hands down.',
    stars: 5,
    location: 'Gilbert, AZ',
  },
  {
    name: 'Andrea',
    quote:
      'Our pool has never looked better thanks to the incredible work of our Pool Guy!',
    stars: 5,
    location: 'Mesa, AZ',
  },
  {
    name: 'Jerel',
    quote: 'Josh does a terrific job for us! He\'s responsive and dependable.',
    stars: 5,
    location: 'Chandler, AZ',
  },
];

export const SERVICE_AREAS = [
  'Gilbert',
  'Mesa',
  'Chandler',
  'Queen Creek',
  'San Tan Valley',
  'Scottsdale',
  'Paradise Valley',
];

export const STATS: StatItem[] = [
  { value: '3', suffix: '+', label: 'Years Serving Arizona' },
  { value: '7', label: 'Cities Covered' },
  { value: '100', suffix: '%', label: 'Locally Owned & Operated' },
  { value: '50', suffix: '$', label: 'Filter Clean Special' },
];

export const CONTACT = {
  phone: '(928) 243-4422',
  phoneHref: 'tel:9282434422',
  email: 'hammerheadpoolsaz@gmail.com',
  emailHref: 'mailto:hammerheadpoolsaz@gmail.com',
  instagram: 'https://instagram.com/hammerheadpoolsaz',
  facebook: 'https://facebook.com/hammerheadpoolsaz',
  hours: 'Monday – Friday',
};
