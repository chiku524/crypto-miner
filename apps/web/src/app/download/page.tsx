import { getLatestDesktopDownloadUrls, getRepoFromEnv } from '@/lib/desktop-downloads-api';
import { DownloadPageContent } from './DownloadPageContent';

export const dynamic = 'force-dynamic';

export default async function DownloadPage() {
  const initialDownloads = await getLatestDesktopDownloadUrls();
  const repo = getRepoFromEnv();
  const githubReleasesUrl = `https://github.com/${repo}/releases/latest`;
  return (
    <DownloadPageContent
      initialDownloads={initialDownloads}
      githubReleasesUrl={githubReleasesUrl}
    />
  );
}
