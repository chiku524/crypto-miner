'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { DESKTOP_DOWNLOADS, detectPlatform, type Platform } from '@/lib/downloads';

const PLATFORM_LABELS: Record<Platform, string> = {
  win: 'Windows',
  mac: 'macOS',
  linux: 'Linux',
};

const PLATFORM_ICONS: Record<Platform, string> = {
  win: '🪟',
  mac: '🍎',
  linux: '🐧',
};

export default function DownloadPage() {
  const [suggested, setSuggested] = useState<Platform | null>(null);

  useEffect(() => {
    setSuggested(detectPlatform());
  }, []);

  const hasAnyDownload = DESKTOP_DOWNLOADS.win || DESKTOP_DOWNLOADS.mac || DESKTOP_DOWNLOADS.linux;

  return (
    <main className="min-h-screen bg-surface-950 bg-grid">
      <Nav />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <Link href="/" className="text-sm text-gray-500 transition hover:text-white">
          ← Back
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <h1 className="font-display text-3xl font-bold tracking-tight text-white">
            Download VibeMiner desktop
          </h1>
          <p className="mt-2 text-gray-400">
            Install the app on your computer for a dedicated mining experience. Same dashboard as the
            web—runs in its own window.
          </p>

          {hasAnyDownload ? (
            <div className="mt-10 space-y-4">
              {suggested && DESKTOP_DOWNLOADS[suggested] && (
                <p className="text-sm text-accent-cyan">
                  We detected {PLATFORM_LABELS[suggested]} — your download is below.
                </p>
              )}
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {(['win', 'mac', 'linux'] as const).map((platform) => {
                  const url = DESKTOP_DOWNLOADS[platform];
                  if (!url) return null;
                  const isSuggested = suggested === platform;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-3 rounded-xl border px-5 py-4 font-medium transition ${
                        isSuggested
                          ? 'border-accent-cyan/50 bg-accent-cyan/10 text-accent-cyan'
                          : 'border-white/10 bg-surface-900/50 text-gray-300 hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-2xl">{PLATFORM_ICONS[platform]}</span>
                      <span>
                        {PLATFORM_LABELS[platform]}
                        {isSuggested && (
                          <span className="ml-2 text-xs text-gray-500">(recommended)</span>
                        )}
                      </span>
                      <span className="text-gray-500">↓</span>
                    </a>
                  );
                })}
              </div>
              <p className="mt-6 text-sm text-gray-500">
                After installing, open VibeMiner and sign in with the same account you use on the
                web. Your dashboard and mining settings stay in sync.
              </p>
              <p className="mt-3 text-xs text-gray-600">
                Desktop installers are built and published by <a href="https://nico.builds" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition">nico.builds</a>. Same app you get from the web—packaged for your OS.
              </p>
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-white/10 bg-surface-900/30 p-8">
              <p className="text-gray-400">
                Desktop installers are not yet available from this page. You can still use{' '}
                <Link href="/dashboard" className="text-accent-cyan underline">
                  the web app
                </Link>{' '}
                in your browser. Check back later or build from source—see the project README.
              </p>
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
