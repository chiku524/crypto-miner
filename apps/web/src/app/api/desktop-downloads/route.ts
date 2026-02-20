import { NextResponse } from 'next/server';
import { getLatestDesktopDownloadUrls } from '@/lib/desktop-downloads-api';

/**
 * GET /api/desktop-downloads
 * Returns download URLs that point to the latest release via GitHub redirect (no API/token).
 */
export async function GET() {
  try {
    const { urls, source, latestTag } = await getLatestDesktopDownloadUrls();
    const hasAny = urls.win || urls.mac || urls.linux;
    if (!hasAny) {
      return NextResponse.json(
        { error: 'Failed to get download URLs' },
        { status: 502 }
      );
    }
    const body: Record<string, unknown> = { ...urls, source };
    if (latestTag) body.latestTag = latestTag;
    return NextResponse.json(body, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        'X-Download-Source': source,
        ...(latestTag && { 'X-Download-Version': latestTag }),
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch latest release' },
      { status: 500 }
    );
  }
}
