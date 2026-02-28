import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { HowMiningWorksContent } from './HowMiningWorksContent';

const base = site.baseUrl.replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'How mining & nodes work',
  description:
    'Learn how VibeMiner works: mine PoW networks, run PoS nodes, track hashrate and earnings, withdraw securely. No terminal, no config files.',
  alternates: { canonical: `${base}/how-mining-works` },
  openGraph: {
    url: `${base}/how-mining-works`,
    title: 'How mining & nodes work | VibeMiner',
    description: 'Mine or run nodes—choose a network, start, earn. No terminal required.',
  },
};

export default function HowMiningWorksPage() {
  return <HowMiningWorksContent />;
}
