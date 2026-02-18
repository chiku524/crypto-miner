# SEO & Branding

This document describes the SEO and branding setup for VibeMiner. Once Cloudflare is configured with your domain, these will be active.

## Domain configuration

Set `NEXT_PUBLIC_APP_URL` to your production domain (e.g. `https://vibeminer.ai`). This is used for:

- Canonical URLs
- Open Graph and Twitter Card URLs
- Sitemap and robots.txt
- JSON-LD structured data

## SEO

### Meta tags

- **Title**: `VibeMiner — Decentralized Mining, Simplified` (with per-page template)
- **Description**: `Mine cryptocurrencies for networks that need you. No terminal required.`
- **Keywords**: crypto mining, blockchain, mining pool, Monero, Kaspa, etc.
- **Open Graph**: type, locale, url, siteName, title, description
- **Twitter Card**: summary_large_image, title, description
- **Robots**: index, follow (crawlable)

### Structured data (JSON-LD)

- **WebSite** schema with name, description, url, SearchAction (links to dashboard search)

### Sitemap

- `/sitemap.xml` – Generated dynamically
- Includes: /, /dashboard, /fees, /login, /register
- Change frequencies and priorities set per route

### Robots.txt

- `/robots.txt` – Generated dynamically
- Allows all user agents on /
- Disallows /api/ and /dashboard/network
- References sitemap URL

## Branding

### Logo assets

| Asset | Path | Use |
|-------|------|-----|
| Full logo (SVG) | `/logo.svg` | Nav, Footer, print |
| Icon only (SVG) | `/logo-icon.svg` | Small spaces, favicon source |
| Favicon | `/icon` (dynamic) | Browser tab, bookmarks |
| Apple touch icon | `/apple-icon` (dynamic) | iOS home screen |
| OG image | `/opengraph-image` (dynamic) | Social sharing (1200×630) |

### Brand colors

- **Primary gradient**: `#22d3ee` (cyan) → `#34d399` (emerald)
- **Background**: `#0a0f14` (surface-950)
- **Diamond icon**: Gradient fill with cyan–emerald

### Logo mark

The diamond (◇) symbol represents the brand. It appears in:

- Favicon and app icons
- Open Graph image
- Nav and Footer (as emoji ◇ + text)

## Cloudflare setup

When deploying to Cloudflare:

1. Add your custom domain in the Cloudflare dashboard
2. Set `NEXT_PUBLIC_APP_URL` in Wrangler secrets or environment:
   ```bash
   npx wrangler secret put NEXT_PUBLIC_APP_URL
   # Enter: https://yourdomain.com
   ```
3. Or set it in `wrangler.toml` under `[vars]`:
   ```toml
   [vars]
   NEXT_PUBLIC_APP_URL = "https://yourdomain.com"
   ```

## Testing SEO

- **Rich results**: [Google Rich Results Test](https://search.google.com/test/rich-results)
- **OG/Twitter**: [OpenGraph.xyz](https://www.opengraph.xyz/), [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **Sitemap**: Visit `/sitemap.xml` on your deployed site
- **Robots**: Visit `/robots.txt` on your deployed site
