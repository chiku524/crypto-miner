/**
 * Server-side only: returns desktop download URLs that always point to the latest release.
 *
 * Uses GitHub's redirect URLs (releases/latest/download/AssetName), so no API or token
 * is needed. The release workflow uploads assets with fixed names (VibeMiner-Setup-latest.exe
 * etc.) so these URLs redirect to the current latest release. Every new tag + release
 * automatically becomes the target of these links.
 */

import { getCloudflareContext } from '@opennextjs/cloudflare';

/** Get env from Cloudflare request context when running in Worker. */
function getCloudflareEnv(): Record<string, unknown> | null {
  try {
    const ctx = getCloudflareContext();
    const env = ctx?.env as unknown as Record<string, unknown> | undefined;
    return env ?? null;
  } catch {
    return null;
  }
}

function envStr(env: Record<string, unknown> | null, ...keys: string[]): string | undefined {
  if (!env) return undefined;
  for (const k of keys) {
    const v = env[k];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return undefined;
}

/** Repo in owner/name form. From Cloudflare env or process.env. */
export function getRepoFromEnv(): string {
  const cf = getCloudflareEnv();
  const repo =
    envStr(cf, 'GITHUB_REPO', 'github_repo', 'GITHUB_URL', 'github_url') ??
    process.env.GITHUB_REPO ??
    process.env.github_repo ??
    process.env.GITHUB_URL ??
    process.env.github_url;
  if (repo && typeof repo === 'string') {
    const t = repo.trim();
    if (/^[\w.-]+\/[\w.-]+$/.test(t)) return t;
    const m = t.match(/github\.com[/:]([\w.-]+)\/([\w.-]+?)(?:\.git)?\/?$/i);
    if (m) return `${m[1]}/${m[2]}`;
  }
  return 'chiku524/VibeMiner';
}

export type DesktopDownloadUrls = {
  win: string | null;
  mac: string | null;
  linux: string | null;
};

/** Fixed asset names uploaded by the release workflow; GitHub redirects /releases/latest/download/Name to the current latest. */
const LATEST_ASSET_NAMES = {
  win: 'VibeMiner-Setup-latest.exe',
  mac: 'VibeMiner-latest-arm64.dmg',
  linux: 'VibeMiner-latest.AppImage',
} as const;

export type DesktopDownloadSource = 'static-latest' | 'fallback';

/**
 * Returns desktop download URLs that always point to the latest release.
 * Uses GitHub's redirect URLs (no API, no token). The release workflow uploads
 * assets with these fixed names so each new tag + release automatically becomes the target.
 */
export async function getLatestDesktopDownloadUrls(): Promise<{
  urls: DesktopDownloadUrls;
  source: DesktopDownloadSource;
  latestTag?: string;
}> {
  const repo = getRepoFromEnv();
  const base = `https://github.com/${repo}/releases/latest/download`;
  const urls: DesktopDownloadUrls = {
    win: `${base}/${LATEST_ASSET_NAMES.win}`,
    mac: `${base}/${LATEST_ASSET_NAMES.mac}`,
    linux: `${base}/${LATEST_ASSET_NAMES.linux}`,
  };
  return { urls, source: 'static-latest' };
}
