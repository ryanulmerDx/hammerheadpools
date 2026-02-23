export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: 'droplet' | 'wrench' | 'sparkles' | 'filter';
  highlight: boolean;
  features?: string[];
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
