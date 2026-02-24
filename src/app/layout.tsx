import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { MobileCTABar } from '@/components/layout/MobileCTABar';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pool Maintenance & Repair | Hammerhead Pools — Gilbert, Mesa, Chandler',
  description:
    'Locally owned pool maintenance, green pool cleanups, and equipment repairs serving Gilbert, Mesa, Chandler, Queen Creek, Scottsdale & Tempe. Same-week service available.',
  keywords: [
    'pool maintenance Gilbert AZ',
    'pool service Mesa AZ',
    'pool cleaning Chandler AZ',
    'pool repair Queen Creek',
    'green pool cleanup Gilbert',
    'weekly pool service East Valley',
    'Hammerhead Pools',
  ],
  openGraph: {
    title: 'Pool Maintenance & Repair | Hammerhead Pools — Gilbert, Mesa, Chandler',
    description:
      'Locally owned pool maintenance, cleanups, and repairs across Gilbert, Mesa, Chandler & Queen Creek. Same-week service available.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pool Maintenance & Repair | Hammerhead Pools — Gilbert, Mesa, Chandler',
    description:
      'Locally owned pool maintenance, cleanups, and repairs across Gilbert, Mesa, Chandler & Queen Creek. Same-week service available.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          <Navigation />
          {children}
          <Footer />
          <MobileCTABar />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
