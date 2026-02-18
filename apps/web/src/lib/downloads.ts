/**
 * Desktop app download URLs. Set in .env or deployment:
 *
 * - NEXT_PUBLIC_DESKTOP_DOWNLOAD_WIN  — Windows installer (e.g. NSIS .exe)
 * - NEXT_PUBLIC_DESKTOP_DOWNLOAD_MAC  — macOS installer (.dmg)
 * - NEXT_PUBLIC_DESKTOP_DOWNLOAD_LINUX — Linux AppImage
 *
 * Example (GitHub Releases): upload artifacts and set full URLs, e.g.
 * https://github.com/your-org/crypto-miner/releases/download/v1.0.0/VibeMiner-Setup-1.0.0.exe
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
