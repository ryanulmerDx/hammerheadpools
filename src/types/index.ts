export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: 'droplet' | 'wrench' | 'sparkles' | 'filter' | 'star';
  highlight: boolean;
  features?: string[];
}

export interface TrustItem {
  label: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  quote: string;
  stars: number;
  location?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  suffix?: string;
  label: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}
