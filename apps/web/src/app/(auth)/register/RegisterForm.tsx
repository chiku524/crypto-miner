'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { register, type AccountType } from '@/lib/auth';

type Step = 'choose' | 'miner' | 'network';

function getReturnTo(searchParams: ReturnType<typeof useSearchParams>): string {
  const returnTo = searchParams.get('returnTo');
  if (!returnTo || typeof returnTo !== 'string') return '/dashboard';
  if (!returnTo.startsWith('/')) return '/dashboard';
  return returnTo;
}

export function RegisterForm() {
  const [step, setStep] = useState<Step>('choose');
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [networkName, setNetworkName] = useState('');
  const [networkWebsite, setNetworkWebsite] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = useMemo(() => getReturnTo(searchParams), [searchParams]);

  function chooseType(type: AccountType) {
    setAccountType(type);
    setStep(type === 'user' ? 'miner' : 'network');
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (!accountType) {
      setError('Account type missing.');
      setLoading(false);
      return;
    }
    const result = await register({
      email,
      password,
      accountType,
      displayName: accountType === 'user' ? displayName : undefined,
      networkName: accountType === 'network' ? networkName : undefined,
      networkWebsite: accountType === 'network' ? networkWebsite : undefined,
    });
    setLoading(false);
    if ('error' in result) {
      setError(result.error);
      return;
    }
    router.push(returnTo);
    router.refresh();
  }

  if (step === 'choose') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-surface-900/50 p-8"
      >
        <Link href="/" className="mb-6 inline-flex items-center gap-2 font-display text-lg font-semibold text-gray-300 hover:text-white">
          <span className="text-xl">◇</span>
          VibeMiner
        </Link>
        <h1 className="font-display text-2xl font-bold text-white">Create an account</h1>
        <p className="mt-1 text-sm text-gray-400">Choose your account type. You can&apos;t change this later.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => chooseType('user')}
            className="rounded-xl border border-white/10 bg-surface-850/80 p-6 text-left transition hover:border-accent-cyan/30 hover:bg-surface-850"
          >
            <span className="text-3xl">⛏</span>
            <h2 className="mt-3 font-display font-semibold text-white">Miner</h2>
            <p className="mt-1 text-sm text-gray-400">I want to mine and earn. Personal account for hashrate and payouts.</p>
          </button>
          <button
            type="button"
            onClick={() => chooseType('network')}
            className="rounded-xl border border-white/10 bg-surface-850/80 p-6 text-left transition hover:border-accent-cyan/30 hover:bg-surface-850"
          >
            <span className="text-3xl">◇</span>
            <h2 className="mt-3 font-display font-semibold text-white">Network</h2>
            <p className="mt-1 text-sm text-gray-400">I represent a blockchain. Register to request mining service and get listed.</p>
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account? <Link href={`/login${returnTo !== '/dashboard' ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`} className="text-accent-cyan hover:underline">Sign in</Link>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm rounded-2xl border border-white/10 bg-surface-900/50 p-8"
    >
      <button
        type="button"
        onClick={() => setStep('choose')}
        className="mb-4 text-sm text-gray-400 hover:text-white"
      >
        ← Change account type
      </button>
      <h1 className="font-display text-2xl font-bold text-white">
        {accountType === 'user' ? 'Miner account' : 'Network account'}
      </h1>
      <p className="mt-1 text-sm text-gray-400">
        {accountType === 'user'
          ? 'Create your personal mining account.'
          : 'Register your blockchain to request our mining service.'}
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {accountType === 'user' && (
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-400">Display name (optional)</label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-surface-850 px-4 py-2.5 text-white placeholder-gray-500 focus:border-accent-cyan/50 focus:outline-none"
              placeholder="Miner alias"
            />
          </div>
        )}
        {accountType === 'network' && (
          <>
            <div>
              <label htmlFor="networkName" className="block text-sm font-medium text-gray-400">Network / chain name</label>
              <input
                id="networkName"
                type="text"
                value={networkName}
                onChange={(e) => setNetworkName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-surface-850 px-4 py-2.5 text-white placeholder-gray-500 focus:border-accent-cyan/50 focus:outline-none"
                placeholder="e.g. My Chain"
              />
            </div>
            <div>
              <label htmlFor="networkWebsite" className="block text-sm font-medium text-gray-400">Website (optional)</label>
              <input
                id="networkWebsite"
                type="url"
                value={networkWebsite}
                onChange={(e) => setNetworkWebsite(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-surface-850 px-4 py-2.5 text-white placeholder-gray-500 focus:border-accent-cyan/50 focus:outline-none"
                placeholder="https://..."
              />
            </div>
          </>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-white/10 bg-surface-850 px-4 py-2.5 text-white placeholder-gray-500 focus:border-accent-cyan/50 focus:outline-none"
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
            minLength={6}
            className="mt-1 w-full rounded-lg border border-white/10 bg-surface-850 px-4 py-2.5 text-white placeholder-gray-500 focus:border-accent-cyan/50 focus:outline-none"
            placeholder="••••••••"
          />
          <p className="mt-1 text-xs text-gray-500">At least 6 characters</p>
        </div>
        {error && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
            <span className="mt-1 block text-xs text-gray-500">Please check your details and try again.</span>
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-accent-cyan py-2.5 font-medium text-surface-950 transition hover:brightness-110 disabled:opacity-50"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account? <Link href={`/login${returnTo !== '/dashboard' ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`} className="text-accent-cyan hover:underline">Sign in</Link>
      </p>
    </motion.div>
  );
}
