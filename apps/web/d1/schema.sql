-- Cloudflare D1 schema for VibeMiner
-- Run: wrangler d1 execute vibeminer-db --remote --file=./d1/schema.sql
-- (Or use --local for local dev database)

-- Users: email + password (miner or network account)
create table if not exists users (
  id text primary key,
  email text not null unique,
  password_hash text not null,
  account_type text not null check (account_type in ('user', 'network')),
  display_name text,
  network_name text,
  network_website text,
  created_at text default (datetime('now')) not null,
  updated_at text default (datetime('now')) not null
);

create index if not exists idx_users_email on users(email);
create index if not exists idx_users_account_type on users(account_type);

-- Network listings: automated onboarding. No admin approval—validation + fee = listing.
-- Networks register via API; validated entries are stored and served as live networks.
create table if not exists network_listings (
  id text primary key,
  name text not null,
  symbol text not null,
  algorithm text not null,
  environment text not null check (environment in ('mainnet', 'devnet')),
  description text,
  icon text default '⛓',
  pool_url text,
  pool_port integer,
  website text,
  reward_rate text,
  min_payout text,
  status text not null default 'live' check (status in ('live', 'coming-soon')),
  requested_by_user_id text references users(id),
  listing_fee_paid integer default 0,
  created_at text default (datetime('now')) not null,
  updated_at text default (datetime('now')) not null
);

create index if not exists idx_network_listings_environment on network_listings(environment);
create index if not exists idx_network_listings_status on network_listings(status);
