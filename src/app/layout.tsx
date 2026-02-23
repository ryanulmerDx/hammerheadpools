import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';

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
  title: 'HammerHead Pools | Pool Service in Gilbert, Mesa, Chandler & Beyond',
  description:
    "Locally-owned Arizona pool maintenance and repair. Weekly maintenance, repairs, filter cleaning, and more. Serving Gilbert, Mesa, Chandler, Queen Creek, San Tan Valley, Scottsdale, and Paradise Valley.",
  keywords: [
    'pool cleaning',
    'pool maintenance',
    'Gilbert pool service',
    'Mesa pool cleaning',
    'Chandler pool repair',
    'Arizona pool company',
    'HammerHead Pools',
  ],
  openGraph: {
    title: 'HammerHead Pools | Arizona Pool Cleaning & Maintenance',
    description:
      "We keep your pool perfect so you don't have to. Serving the greater Phoenix valley area.",
    type: 'website',
    locale: 'en_US',
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
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
