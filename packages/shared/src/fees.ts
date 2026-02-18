/**
 * VibeMiner fee structure.
 * All fees are transparent and documented at /fees.
 *
 * - Network listing: one-time fee for blockchain networks to be listed (automated onboarding)
 * - Withdrawal: service fee when miners withdraw earnings
 */

export const FEE_CONFIG = {
  /** One-time fee for networks to list on VibeMiner. Automatically processed—no admin approval. */
  NETWORK_LISTING: {
    /** Fee amount (e.g. flat amount or percentage—document in description) */
    amount: '0.01 ETH',
    /** Human-readable description for transparency */
    description: 'One-time listing fee. Payable when registering a mainnet network. Devnet listings are free.',
    /** Whether devnet listings are free */
    devnetFree: true,
  },

  /** Service fee when miners withdraw earnings to their wallet. */
  WITHDRAWAL: {
    /** Percentage of withdrawal amount (0–100) */
    percent: 1,
    /** Human-readable description for transparency */
    description: '1% of withdrawal amount. Covers processing and infrastructure.',
    /** Minimum fee per withdrawal (shown in network-specific terms) */
    minDescription: 'Minimum fee per withdrawal (varies by network)',
  },
} as const;

/** Format withdrawal fee for display */
export function formatWithdrawalFee(symbol?: string): string {
  const { percent, minDescription } = FEE_CONFIG.WITHDRAWAL;
  const base = `${percent}% of withdrawal amount`;
  if (symbol) {
    return `${base} (min varies by network, e.g. ${symbol})`;
  }
  return `${base}. ${minDescription}.`;
}
