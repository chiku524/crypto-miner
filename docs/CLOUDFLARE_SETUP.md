# Cloudflare setup for VibeMiner

This project uses **Cloudflare D1** (database), **KV** (sessions), and **R2** (storage). Once you have a Cloudflare account and domain, follow these steps.

## Prerequisites

- [Cloudflare account](https://dash.cloudflare.com/sign-up)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`npm i -g wrangler` or use `npx wrangler`)
- Node.js 18+

## 1. Log in to Cloudflare

```bash
cd apps/web
npx wrangler login
```

## 2. Create D1 database

```bash
npx wrangler d1 create vibeminer-db
```

Copy the `database_id` from the output and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "vibeminer-db"
database_id = "YOUR_D1_DATABASE_ID"   # <- paste here
```

## 3. Create D1 tables

Run the schema (use `--local` for local dev, `--remote` for production):

```bash
# Local (for wrangler dev / preview)
npx wrangler d1 execute vibeminer-db --local --file=./d1/schema.sql

# Remote (for production deploy)
npx wrangler d1 execute vibeminer-db --remote --file=./d1/schema.sql
```

## 4. Create KV namespace

```bash
npx wrangler kv namespace create SESSIONS
```

Copy the `id` from the output and update `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "KV"
id = "YOUR_KV_NAMESPACE_ID"   # <- paste here
```

## 5. Create R2 bucket

```bash
npx wrangler r2 bucket create vibeminer-storage
```

No ID needed—R2 uses the bucket name. Your `wrangler.toml` already has:

```toml
[[r2_buckets]]
binding = "R2"
bucket_name = "vibeminer-storage"
```

## 6. Local development with bindings

```bash
npm run preview
```

This builds with OpenNext and runs `wrangler dev`, giving you D1, KV, and R2 locally. Auth (register, login, session) will work.

For standard Next.js dev (no bindings):

```bash
npm run dev
```

Auth APIs will fail with “Cloudflare context not available”—use `npm run preview` to test auth locally.

## 7. Deploy to Cloudflare

### Workers (recommended for full-stack)

```bash
npm run deploy
```

This builds with OpenNext and deploys to Cloudflare Workers. You’ll get a `*.workers.dev` URL, or you can add a [custom domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

### Pages (alternative)

You can also deploy to [Cloudflare Pages](https://developers.cloudflare.com/pages/) by connecting your Git repo. Configure the build command as `npm run build` and the output directory appropriately, or use the Pages + Workers integration for bindings.

## 8. Custom domain (Cloudflare)

1. In the Cloudflare dashboard, add your domain.
2. Add a DNS record (CNAME or A) pointing to your Worker/Pages.
3. Update the Worker/Pages to use the custom domain.

Once deployed, set `APP_URL` (or `NEXT_PUBLIC_APP_URL`) to your production URL if needed for server-side fetches.

## Summary

| Resource   | Purpose                                                    |
|-----------|-------------------------------------------------------------|
| **D1**    | Users, network_listings (automated onboarding)              |
| **KV**    | Session tokens (7-day TTL)                                  |
| **R2**    | File storage (e.g. network logos—future)                    |

## Network listings

The `network_listings` table stores blockchain networks registered via the automated API (`POST /api/networks/register`). No admin approval—validation + fee (for mainnet) = instant listing. Re-run the schema to create the table if upgrading.
