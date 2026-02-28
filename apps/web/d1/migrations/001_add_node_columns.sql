-- Add node-running columns to network_listings
-- Run: wrangler d1 execute vibeminer-db --remote --file=./d1/migrations/001_add_node_columns.sql

alter table network_listings add column node_download_url text;
alter table network_listings add column node_command_template text;
alter table network_listings add column node_disk_gb integer;
alter table network_listings add column node_ram_mb integer;
alter table network_listings add column node_binary_sha256 text;
