'use client';

import { Suspense } from 'react';
import { RegisterForm } from './RegisterForm';

function RegisterFallback() {
  return (
    <div className="w-full max-w-md animate-pulse rounded-2xl border border-white/10 bg-surface-900/50 p-8">
      <div className="mb-6 h-8 w-32 rounded bg-white/10" />
      <div className="h-8 w-48 rounded bg-white/10" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="h-32 rounded-xl bg-white/10" />
        <div className="h-32 rounded-xl bg-white/10" />
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-950 bg-grid px-4 py-24">
      <Suspense fallback={<RegisterFallback />}>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
