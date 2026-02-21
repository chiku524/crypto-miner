import { site } from '@/lib/site';
import type { Metadata } from 'next';

const base = site.baseUrl.replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'Mining pools',
  description: 'How VibeMiner connects you to mining pools. One-click mining, no config. Start from the dashboard.',
  alternates: { canonical: `${base}/pools` },
};

export default function PoolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
