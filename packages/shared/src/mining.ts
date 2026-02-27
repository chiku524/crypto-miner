/**
 * Mining integration: algorithm → miner mapping and pool connection helpers.
 * Used by the desktop app to spawn the correct miner binary and construct Stratum connection args.
 */

import type { BlockchainNetwork } from './types';

export type MinerType = 'xmrig' | 'lolminer' | 'kaspaminer' | 'cpuminer-gr';

/** Algorithm name (normalized lowercase) → miner binary to use */
export const ALGORITHM_TO_MINER: Record<string, MinerType> = {
  randomx: 'xmrig',
  ghostrider: 'xmrig',
  gr: 'xmrig',
  kheavyhash: 'kaspaminer',
  autolykos2: 'lolminer',
};

/**
 * Get the miner type for a network based on its algorithm.
 */
export function getMinerTypeForNetwork(network: BlockchainNetwork): MinerType | null {
  const algo = (network.algorithm || '').toLowerCase().replace(/\s+/g, '');
  if (algo.includes('ghostrider') || algo === 'gr') return 'xmrig';
  if (algo.includes('randomx') || algo === 'rx') return 'xmrig';
  if (algo.includes('kheavyhash')) return 'kaspaminer';
  if (algo.includes('autolykos')) return 'lolminer';
  return ALGORITHM_TO_MINER[algo] ?? null;
}

/**
 * Check if a network has pool connectivity (poolUrl + poolPort) and is mineable.
 */
export function isNetworkMineable(network: BlockchainNetwork): boolean {
  if (network.status !== 'live') return false;
  const hasPool = typeof network.poolUrl === 'string' && network.poolUrl.trim().length > 0;
  const hasPort = typeof network.poolPort === 'number' && network.poolPort >= 1 && network.poolPort <= 65535;
  return hasPool && hasPort;
}

/**
 * Common algorithms for network registration dropdown.
 */
export const ALGORITHM_OPTIONS = [
  { value: 'RandomX', label: 'RandomX (Monero, CPU)', miner: 'xmrig' },
  { value: 'Ghostrider', label: 'Ghostrider (Raptoreum, CPU)', miner: 'xmrig' },
  { value: 'kHeavyHash', label: 'kHeavyHash (Kaspa, GPU/ASIC)', miner: 'kaspaminer' },
  { value: 'Autolykos2', label: 'Autolykos2 (Ergo, GPU)', miner: 'lolminer' },
  { value: 'SHA256', label: 'SHA256 (Bitcoin-style)', miner: 'varies' },
  { value: 'Scrypt', label: 'Scrypt', miner: 'varies' },
  { value: 'Ethash', label: 'Ethash', miner: 'varies' },
  { value: 'Other', label: 'Other', miner: 'varies' },
] as const;
