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

export async function getLatestDesktopDownloadUrls(): Promise<DesktopDownloadUrls> {
  const repo = getRepoFromEnv();
  const token = process.env.GITHUB_TOKEN ?? process.env.github_token;
  const res = await fetch(
    `https://api.github.com/repos/${repo}/releases/latest`,
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

  const release = (await res.json()) as { assets?: Array<{ name: string; browser_download_url: string }> };
  const assets = release?.assets ?? [];

  const win = assets.find((a) => a.name.endsWith('.exe'))?.browser_download_url ?? null;
  const mac = assets.find((a) => a.name.endsWith('.dmg'))?.browser_download_url ?? null;
  const linux = assets.find((a) => a.name.endsWith('.AppImage'))?.browser_download_url ?? null;

  return { win, mac, linux };
}
