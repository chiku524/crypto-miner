'use client';

import dynamic from 'next/dynamic';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';

const NetworksShowcase = dynamic(
  () => import('@/components/NetworksShowcase').then((m) => ({ default: m.NetworksShowcase })),
  { ssr: true }
);

const HowItWorks = dynamic(
  () => import('@/components/HowItWorks').then((m) => ({ default: m.HowItWorks })),
  { ssr: true }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-950 bg-grid">
      <Nav />
      <Hero />
      <NetworksShowcase />
      <HowItWorks />
      <CTA />
      <Footer />
      <BackToTop />
    </main>
  );
}
