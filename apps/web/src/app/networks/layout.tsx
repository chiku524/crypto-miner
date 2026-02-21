import { site } from '@/lib/site';
import type { Metadata } from 'next';
import { NetworksNavClient } from './NetworksNavClient';

const base = site.baseUrl.replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'Networks',
  description: 'Browse mainnet and devnet networks. Mine Monero, Kaspa, Ergo and more. One-click mining with VibeMiner.',
  alternates: { canonical: `${base}/networks` },
};

/**
 * Nav uses NetworksNavClient so the logo links to /app in desktop and / on web.
 * Shell is always visible so the Networks page is never blank.
 */
export default function NetworksLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-surface-950 bg-grid">
      <NetworksNavClient />
      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        {children}
      </div>
    </main>
  );
}
