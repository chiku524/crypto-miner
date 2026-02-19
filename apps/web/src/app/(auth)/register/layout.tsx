import type { Metadata } from 'next';
import { site } from '@/lib/site';

const base = site.baseUrl.replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register your blockchain or as a miner on VibeMiner. Request listing or start mining. VibeMiner by nico.builds.',
  alternates: { canonical: `${base}/register` },
  openGraph: { url: `${base}/register`, title: 'Register | VibeMiner' },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
