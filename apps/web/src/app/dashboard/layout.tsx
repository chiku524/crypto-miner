import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mining dashboard',
  description: 'Choose a network and start mining. Mainnet and devnet. One-click start, no terminal. VibeMiner by nico.builds.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
