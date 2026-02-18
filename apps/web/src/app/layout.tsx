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
    default: `${site.name} — Decentralized Mining, Simplified`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    'crypto mining',
    'blockchain',
    'mining pool',
    'decentralized',
    'Monero',
    'Kaspa',
    'Raptoreum',
    'Ergo',
    'no terminal',
    'one-click mining',
  ],
  authors: [{ name: site.name, url: site.baseUrl }],
  creator: site.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.baseUrl,
    siteName: site.name,
    title: `${site.name} — Decentralized Mining, Simplified`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Decentralized Mining, Simplified`,
    description: site.description,
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
    '@type': 'WebSite',
    name: site.name,
    description: site.description,
    url: site.baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${site.baseUrl}/dashboard?search={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
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
