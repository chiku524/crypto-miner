/**
 * Server-side only: fetches latest GitHub release and returns desktop download URLs.
 * Used by the API route and by the download page for initial (SSR) data so the
 * first paint shows the latest release, not build-time env fallback.
 * GITHUB_TOKEN (Cloudflare Worker secret) is used when set so the API has a higher rate limit.
 */

import { getCloudflareContext } from '@opennextjs/cloudflare';

/** Get token from Cloudflare env (production) or process.env (local/preview). */
function getGitHubToken(): string | undefined {
  try {
    const ctx = getCloudflareContext();
    const env = ctx.env as unknown as Record<string, string | undefined>;
    const token = env.GITHUB_TOKEN;
    if (token) return token;
  } catch {
    // Not running in Cloudflare context (e.g. next dev)
  }
  return process.env.GITHUB_TOKEN ?? process.env.github_token;
}

/** Repo in owner/name form. Reads GITHUB_REPO or github_repo (Vercel preserves case). */
export function getRepoFromEnv(): string {
  const repo =
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

/** Fallback when GitHub API fails (e.g. rate limit). Set in wrangler [vars] or env. */
function getEnvFallbackDownloads(): DesktopDownloadUrls {
  return {
    win: process.env.NEXT_PUBLIC_DESKTOP_DOWNLOAD_WIN ?? null,
    mac: process.env.NEXT_PUBLIC_DESKTOP_DOWNLOAD_MAC ?? null,
    linux: process.env.NEXT_PUBLIC_DESKTOP_DOWNLOAD_LINUX ?? null,
  };
}

/** Parse tag (e.g. v1.0.8) to [major, minor, patch] for comparison. */
function parseTagVersion(tagName: string): number[] {
  const m = tagName.replace(/^v/i, '').match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!m) return [0, 0, 0];
  return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
}

/** Compare two tag versions; returns positive if a > b. */
function compareTagVersions(a: string, b: string): number {
  const va = parseTagVersion(a);
  const vb = parseTagVersion(b);
  for (let i = 0; i < 3; i++) {
    if (va[i] !== vb[i]) return va[i] - vb[i];
  }
  return 0;
}

interface GhRelease {
  tag_name: string;
  assets?: Array<{ name: string; browser_download_url: string }>;
}

/**
 * Fetches releases and returns download URLs from the release with the **highest semantic version**
 * (e.g. v1.0.8), not GitHub's "latest" which is by publish date and can be an older version.
 */
export async function getLatestDesktopDownloadUrls(): Promise<DesktopDownloadUrls> {
  const repo = getRepoFromEnv();
  const token = getGitHubToken();
  const fallback = getEnvFallbackDownloads();

  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/releases?per_page=30`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      return fallback;
    }

    const releases = (await res.json()) as GhRelease[];
    if (!Array.isArray(releases) || releases.length === 0) {
      return fallback;
    }

    const sorted = [...releases].sort((a, b) => compareTagVersions(b.tag_name, a.tag_name));

    for (const release of sorted) {
      const assets = release?.assets ?? [];
      const win = assets.find((a) => a.name.endsWith('.exe'))?.browser_download_url ?? null;
      const mac = assets.find((a) => a.name.endsWith('.dmg'))?.browser_download_url ?? null;
      const linux = assets.find((a) => a.name.endsWith('.AppImage'))?.browser_download_url ?? null;
      if (win || mac || linux) {
        return { win, mac, linux };
      }
    }
  } catch {
    // Network or parse error; use fallback
  }

  return fallback;
}
