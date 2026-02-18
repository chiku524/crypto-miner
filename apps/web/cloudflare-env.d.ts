/// <reference types="@cloudflare/workers-types" />
// Cloudflare bindings for Workers
interface CloudflareEnv {
  DB: D1Database;
  KV: KVNamespace;
  R2: R2Bucket;
}
