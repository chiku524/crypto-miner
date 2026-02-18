import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register your blockchain or as a miner on VibeMiner. Request listing or start mining. VibeMiner by nico.builds.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
