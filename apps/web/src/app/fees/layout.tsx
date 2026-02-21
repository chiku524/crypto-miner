import { site } from '@/lib/site';
import type { Metadata } from 'next';

const base = site.baseUrl.replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'Fees & transparency',
  description: 'Network listing fees and miner withdrawal fees. Transparent pricing. VibeMiner by nico.builds.',
  alternates: { canonical: `${base}/fees` },
  openGraph: { url: `${base}/fees`, title: 'Fees & transparency | VibeMiner', description: 'Transparent fees for network listings and miner withdrawals. No hidden charges.' },
};

export default function FeesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
