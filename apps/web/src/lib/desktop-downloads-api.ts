/**
 * Server-side only: fetches latest GitHub release and returns desktop download URLs.
 * Used by the API route and by the download page for initial (SSR) data so the
 * first paint shows the latest release, not build-time env fallback.
 */

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
  return 'chiku524/crypto-miner';
}

export type DesktopDownloadUrls = {
  win: string | null;
  mac: string | null;
  linux: string | null;
};

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
  const token = process.env.GITHUB_TOKEN ?? process.env.github_token;
  const res = await fetch(
    `https://api.github.com/repos/${repo}/releases?per_page=30`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    return { win: null, mac: null, linux: null };
  }

  const releases = (await res.json()) as GhRelease[];
  if (!Array.isArray(releases) || releases.length === 0) {
    return { win: null, mac: null, linux: null };
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

  return { win: null, mac: null, linux: null };
}
