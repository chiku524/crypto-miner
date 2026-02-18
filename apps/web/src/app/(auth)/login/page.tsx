'use client';

import { Suspense } from 'react';
import { LoginForm } from './LoginForm';

function LoginFallback() {
  return (
    <div className="w-full max-w-sm animate-pulse rounded-2xl border border-white/10 bg-surface-900/50 p-8">
      <div className="mb-6 h-8 w-32 rounded bg-white/10" />
      <div className="h-8 w-48 rounded bg-white/10" />
      <div className="mt-6 space-y-4">
        <div className="h-12 rounded-lg bg-white/10" />
        <div className="h-12 rounded-lg bg-white/10" />
        <div className="h-12 rounded-xl bg-white/10" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-950 bg-grid px-4 py-24">
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
