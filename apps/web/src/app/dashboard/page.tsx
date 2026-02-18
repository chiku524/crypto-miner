'use client';

import { Suspense } from 'react';
import { DashboardContent } from './DashboardContent';
import { DashboardSkeleton, NetworkListSkeleton } from '@/components/ui/Skeleton';

function DashboardFallback() {
  return (
    <main className="min-h-screen bg-surface-950 bg-grid">
      <header className="sticky top-0 z-10 border-b border-white/5 bg-surface-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="h-8 w-24 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 h-8 w-48 animate-pulse rounded bg-white/10" />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="mb-4 h-12 rounded-xl bg-white/5" />
            <div className="mb-4 h-10 w-full rounded-xl bg-white/5" />
            <NetworkListSkeleton />
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/5 bg-surface-900/30 p-8">
              <DashboardSkeleton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-surface-950 bg-grid">
      <Suspense fallback={<DashboardFallback />}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
