import type { Metadata } from 'next';
import { site } from '@/lib/site';

const base = site.baseUrl.replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to VibeMiner to access your miner dashboard or network dashboard. VibeMiner by nico.builds.',
  alternates: { canonical: `${base}/login` },
  openGraph: { url: `${base}/login`, title: 'Sign in | VibeMiner' },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
