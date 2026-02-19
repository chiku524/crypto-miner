import type { Metadata } from 'next';
import { site } from '@/lib/site';

const base = site.baseUrl.replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'Mining dashboard',
  description: 'Choose a network and start mining. Mainnet and devnet. One-click start, no terminal. VibeMiner by nico.builds.',
  alternates: { canonical: `${base}/dashboard` },
  openGraph: { url: `${base}/dashboard`, title: 'Mining dashboard | VibeMiner', description: 'Choose a network and start mining. One-click, no terminal.' },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
