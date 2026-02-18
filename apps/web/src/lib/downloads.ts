/**
 * Desktop app download URLs. The /download page prefers URLs from /api/desktop-downloads
 * (latest GitHub release) so the site always points to the newest version without
 * updating env vars. These env vars are used as fallback (before API responds or if it fails):
 *
 * - NEXT_PUBLIC_DESKTOP_DOWNLOAD_WIN  — Windows installer (e.g. NSIS .exe)
 * - NEXT_PUBLIC_DESKTOP_DOWNLOAD_MAC  — macOS installer (.dmg)
 * - NEXT_PUBLIC_DESKTOP_DOWNLOAD_LINUX — Linux AppImage
 */
export const DESKTOP_DOWNLOADS = {
  win: process.env.NEXT_PUBLIC_DESKTOP_DOWNLOAD_WIN ?? null,
  mac: process.env.NEXT_PUBLIC_DESKTOP_DOWNLOAD_MAC ?? null,
  linux: process.env.NEXT_PUBLIC_DESKTOP_DOWNLOAD_LINUX ?? null,
} as const;

export type Platform = 'win' | 'mac' | 'linux';

/** Detect platform from user agent (for suggesting the right download). */
export function detectPlatform(): Platform | null {
  if (typeof window === 'undefined') return null;
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.includes('win')) return 'win';
  if (ua.includes('mac')) return 'mac';
  if (ua.includes('linux')) return 'linux';
  return null;
}
