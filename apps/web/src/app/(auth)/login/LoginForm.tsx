'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/lib/auth';

function getReturnTo(searchParams: ReturnType<typeof useSearchParams>): string {
  const returnTo = searchParams.get('returnTo');
  if (!returnTo || typeof returnTo !== 'string') return '/dashboard';
  if (!returnTo.startsWith('/')) return '/dashboard';
  return returnTo;
}

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = useMemo(() => getReturnTo(searchParams), [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if ('error' in result) {
      setError(result.error);
      return;
    }
    router.push(returnTo);
    router.refresh();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm rounded-2xl border border-white/10 bg-surface-900/50 p-8"
    >
      <Link href="/" className="mb-6 inline-flex items-center gap-2 font-display text-lg font-semibold text-gray-300 hover:text-white">
        <span className="text-xl">◇</span>
        VibeMiner
      </Link>
      <h1 className="font-display text-2xl font-bold text-white">Sign in</h1>
      <p className="mt-1 text-sm text-gray-400">Access your miner or network account.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-white/10 bg-surface-850 px-4 py-2.5 text-white placeholder-gray-500 focus:border-accent-cyan/50 focus:outline-none focus:ring-1 focus:ring-accent-cyan/50"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-white/10 bg-surface-850 px-4 py-2.5 text-white placeholder-gray-500 focus:border-accent-cyan/50 focus:outline-none focus:ring-1 focus:ring-accent-cyan/50"
            placeholder="••••••••"
          />
        </div>
        {error && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
            <span className="mt-1 block text-xs text-gray-500">Check your email and password, or try again.</span>
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-accent-cyan py-2.5 font-medium text-surface-950 transition hover:brightness-110 disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-400">
        Don&apos;t have an account?{' '}
        <Link href={`/register${returnTo !== '/dashboard' ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`} className="text-accent-cyan hover:underline">Register</Link>
      </p>
    </motion.div>
  );
}
