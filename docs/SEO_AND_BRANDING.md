# SEO & Branding

This document describes the SEO and branding setup for VibeMiner. Once your domain is configured (e.g. Vercel or Cloudflare), these are active.

## Slogan

The slogan is defined in **`apps/web/src/lib/site.ts`** as `site.slogan`. It is used in:

- Default page title and Open Graph / Twitter cards
- Hero tagline on the homepage
- OG image (social share)
- JSON-LD structured data

Current slogan: **"Mine without the grind."** To change it, edit `site.slogan` in `site.ts`. See `docs/SLOGAN_OPTIONS.md` for alternatives.

## Domain configuration

Set `NEXT_PUBLIC_APP_URL` to your production domain (e.g. `https://vibeminer.tech`). This is used for:

- Canonical URLs
- Open Graph and Twitter Card URLs
- Sitemap and robots.txt
- JSON-LD structured data

## SEO

### Meta tags

- **Title**: `VibeMiner — [slogan]` (with per-page template `%s | VibeMiner`)
- **Description**: Full value prop including desktop, auto-updates, nico.builds
- **Keywords**: crypto mining, blockchain mining, mining pool, decentralized mining, one-click mining, Monero, Kaspa, Raptoreum, Ergo, VibeMiner, no terminal mining, hashrate
- **Open Graph**: type, locale, url, siteName, title, description
- **Twitter Card**: summary_large_image, title, description, creator
- **Robots**: index, follow (crawlable)

### Structured data (JSON-LD)

- **WebApplication** schema with name, description, url, slogan, applicationCategory (FinanceApplication), offers (free), SearchAction (dashboard search)

### Sitemap

- `/sitemap.xml` – Generated dynamically
- Includes: /, /download, /dashboard, /fees, /login, /register
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
   # Enter: https://vibeminer.tech
   ```
3. Or set it in `wrangler.toml` under `[vars]`:
   ```toml
   [vars]
   NEXT_PUBLIC_APP_URL = "https://vibeminer.tech"
   ```

## Testing SEO

- **Rich results**: [Google Rich Results Test](https://search.google.com/test/rich-results)
- **OG/Twitter**: [OpenGraph.xyz](https://www.opengraph.xyz/), [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **Sitemap**: Visit `/sitemap.xml` on your deployed site
- **Robots**: Visit `/robots.txt` on your deployed site
