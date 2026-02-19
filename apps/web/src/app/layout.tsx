import type { Metadata } from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { SkipToMain } from '@/components/SkipToMain';
import { site } from '@/lib/site';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: `${site.name} — ${site.slogan}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    'crypto mining',
    'blockchain mining',
    'mining pool',
    'decentralized mining',
    'one-click mining',
    'Monero',
    'Kaspa',
    'Raptoreum',
    'Ergo',
    'VibeMiner',
    'no terminal mining',
    'hashrate',
  ],
  authors: [{ name: site.name, url: site.baseUrl }],
  creator: site.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.baseUrl,
    siteName: site.name,
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
    creator: site.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: site.name,
    applicationCategory: 'FinanceApplication',
    description: site.description,
    url: site.baseUrl,
    slogan: site.slogan,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${site.baseUrl}/dashboard?search={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };

  const origin = new URL(site.baseUrl).origin;

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#0a0f14" />
        <link rel="preconnect" href={origin} />
        <link rel="dns-prefetch" href={origin} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased bg-surface-950 text-gray-100 min-h-screen`}>
        <SkipToMain />
        <div id="main-content" tabIndex={-1}>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
