import type { Metadata } from 'next';
import { site } from '@/lib/site';

const base = site.baseUrl.replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'Download desktop app',
  description: 'Download VibeMiner for Windows, macOS (Apple Silicon), and Linux. Same mining dashboard, native app with auto-updates. By nico.builds.',
  alternates: { canonical: `${base}/download` },
  openGraph: { url: `${base}/download`, title: 'Download VibeMiner | Desktop app', description: 'Download VibeMiner for Windows, macOS, and Linux. One-click mining, auto-updates.' },
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
