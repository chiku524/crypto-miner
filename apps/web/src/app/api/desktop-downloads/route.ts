import { NextResponse } from 'next/server';

const GITHUB_REPO = process.env.GITHUB_REPO ?? 'chiku524/crypto-miner';

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  assets: GitHubAsset[];
}

/**
 * GET /api/desktop-downloads
 * Fetches the latest GitHub release and returns download URLs for Windows (.exe), macOS (.dmg), Linux (.AppImage).
 * Use this so the download page always points to the latest release without updating Vercel env vars.
 */
export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 300 }, // cache 5 minutes
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch latest release' },
        { status: res.status }
      );
    }

    const release = (await res.json()) as GitHubRelease;
    const assets = release?.assets ?? [];

    const win = assets.find((a) => a.name.endsWith('.exe'))?.browser_download_url ?? null;
    const mac = assets.find((a) => a.name.endsWith('.dmg'))?.browser_download_url ?? null;
    const linux = assets.find((a) => a.name.endsWith('.AppImage'))?.browser_download_url ?? null;

    return NextResponse.json({ win, mac, linux });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch latest release' },
      { status: 500 }
    );
  }
}
