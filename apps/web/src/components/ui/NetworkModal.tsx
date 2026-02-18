'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { BlockchainNetwork } from '@crypto-miner/shared';

interface NetworkModalProps {
  network: BlockchainNetwork | null;
  onClose: () => void;
}

export function NetworkModal({ network, onClose }: NetworkModalProps) {
  return (
    <AnimatePresence>
      {network && (
      <motion.div
        key={network.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg rounded-2xl border border-white/10 bg-surface-900 p-6 shadow-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-3xl">
                {network.icon}
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold text-white">{network.name}</h2>
                <p className="text-sm text-gray-500">{network.symbol} · {network.algorithm}</p>
                <span
                  className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    network.status === 'live'
                      ? 'bg-accent-emerald/20 text-accent-emerald'
                      : network.status === 'coming-soon'
                        ? 'bg-gray-500/20 text-gray-400'
                        : 'bg-accent-amber/20 text-accent-amber'
                  }`}
                >
                  {network.status === 'live' ? 'Live' : network.status === 'coming-soon' ? 'Coming soon' : 'Request service'}
                </span>
                {network.environment === 'devnet' && (
                  <span className="ml-2 inline-block rounded-full bg-violet-500/20 px-2.5 py-0.5 text-xs text-violet-300">
                    Devnet
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">{network.description}</p>
          <div className="mt-6 grid gap-3 rounded-xl bg-surface-850/80 p-4 text-sm">
            {network.poolUrl && (
              <div>
                <span className="text-gray-500">Pool</span>
                <p className="font-mono text-white">{network.poolUrl}{network.poolPort ? `:${network.poolPort}` : ''}</p>
              </div>
            )}
            {network.rewardRate && (
              <div>
                <span className="text-gray-500">Est. reward rate</span>
                <p className="font-mono text-accent-cyan">{network.rewardRate}</p>
              </div>
            )}
            {network.minPayout && (
              <div>
                <span className="text-gray-500">Min. payout</span>
                <p className="font-mono text-white">{network.minPayout}</p>
              </div>
            )}
            {network.website && (
              <a
                href={network.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-cyan hover:underline"
              >
                Visit website →
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
