/**
 * Site configuration for SEO and metadata.
 * Update baseUrl when Cloudflare domain is configured.
 */
export const site = {
  name: 'VibeMiner',
  description:
    'Mine cryptocurrencies for networks that need you. No terminal required. Modern, seamless experience.',
  baseUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'https://vibeminer.ai',
  twitter: '@vibeminer',
} as const;
