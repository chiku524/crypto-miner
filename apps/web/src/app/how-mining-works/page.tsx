import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { HowMiningWorksContent } from './HowMiningWorksContent';

const base = site.baseUrl.replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'How one-click mining works',
  description:
    'Learn how VibeMiner one-click mining works: choose a network, start a session, track hashrate and earnings, and withdraw securely. No terminal, no config files.',
  alternates: { canonical: `${base}/how-mining-works` },
  openGraph: {
    url: `${base}/how-mining-works`,
    title: 'How one-click mining works | VibeMiner',
    description: 'Choose a network, start mining, earn and withdraw. No terminal required.',
  },
};

export default function HowMiningWorksPage() {
  return <HowMiningWorksContent />;
}
