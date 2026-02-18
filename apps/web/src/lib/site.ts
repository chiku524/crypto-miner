/**
 * Site configuration for SEO and metadata.
 * Single source for slogan: change here to update Hero, meta titles, Open Graph, and docs.
 */
export const site = {
  name: 'VibeMiner',
  slogan: 'Mine without the grind.',
  description:
    'Mine cryptocurrencies for networks that need you. No terminal required. Web app and desktop (Windows, macOS, Linux) with auto-updates. By nico.builds.',
  baseUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'https://vibeminer.ai',
  twitter: '@vibeminer',
} as const;
