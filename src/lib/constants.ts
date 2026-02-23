// Re-exports from siteConfig for backward compatibility.
// For new code, import directly from '@/lib/siteConfig'.
export { siteConfig } from './siteConfig';

import { siteConfig } from './siteConfig';
import type { NavLink, StatItem } from '@/types';

export const CONTACT = siteConfig.contact;
export const SERVICES = siteConfig.services;
export const TESTIMONIALS = siteConfig.testimonials;
export const SERVICE_AREAS = siteConfig.serviceAreas;
export const STATS: StatItem[] = siteConfig.stats;
export const NAV_LINKS: NavLink[] = siteConfig.navLinks;
