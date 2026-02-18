import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to VibeMiner to access your miner dashboard or network dashboard. VibeMiner by nico.builds.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
