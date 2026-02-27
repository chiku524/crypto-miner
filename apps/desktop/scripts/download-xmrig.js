#!/usr/bin/env node
/**
 * Downloads XMRig for the current platform and places it in resources/miners/<platform>/
 * Used during build so the miner is bundled with the installer.
 * Requires: Node 18+ (for fetch), tar (macOS/Linux), PowerShell (Windows)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const XMRIG_RELEASE_URL = 'https://api.github.com/repos/xmrig/xmrig/releases/latest';

function getAssetPattern(platform, arch) {
  if (platform === 'win32') {
    if (arch === 'arm64') return /windows-arm64\.zip$/i;
    return /windows-x64\.zip$/i;
  }
  if (platform === 'darwin') {
    if (arch === 'arm64') return /macos-arm64\.tar\.gz$/i;
    return /macos-x64\.tar\.gz$/i;
  }
  if (platform === 'linux') {
    if (arch === 'arm64') return /linux-static-arm64\.tar\.gz$/i;
    return /linux-static-x64\.tar\.gz$/i;
  }
  return null;
}

async function main() {
  const platform = process.platform;
  const arch = process.arch;
  const pattern = getAssetPattern(platform, arch);
  if (!pattern) {
    console.warn(`[download-xmrig] Unsupported platform ${platform}/${arch}, skipping`);
    const scriptDir = path.dirname(__dirname);
    fs.mkdirSync(path.join(scriptDir, 'resources', 'miners'), { recursive: true });
    process.exit(0);
  }

  const scriptDir = path.dirname(__dirname);
  const minersDir = path.join(scriptDir, 'resources', 'miners', platform);
  const ext = platform === 'win32' ? '.exe' : '';
  const minerName = `xmrig${ext}`;
  const minerPath = path.join(minersDir, minerName);
  if (fs.existsSync(minerPath)) {
    console.log(`[download-xmrig] Miner already present at ${minerPath}`);
    process.exit(0);
  }

  console.log(`[download-xmrig] Fetching XMRig for ${platform}/${arch}...`);
  const res = await fetch(XMRIG_RELEASE_URL, {
    headers: { 'User-Agent': 'VibeMiner-Build/1.0', Accept: 'application/vnd.github.v3+json' },
  });
  if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
  const release = await res.json();
  const assets = release.assets || [];
  const asset = assets.find((a) => pattern.test(a.name));
  if (!asset) throw new Error(`No XMRig asset for ${platform}/${arch}`);
  const url = asset.browser_download_url;
  console.log(`[download-xmrig] Downloading ${asset.name}...`);

  fs.mkdirSync(minersDir, { recursive: true });
  const archivePath = path.join(minersDir, asset.name);
  const fileRes = await fetch(url, {
    headers: { 'User-Agent': 'VibeMiner-Build/1.0', Accept: 'application/octet-stream' },
  });
  if (!fileRes.ok) throw new Error(`Download failed: ${fileRes.status}`);
  const buf = await fileRes.arrayBuffer();
  fs.writeFileSync(archivePath, new Uint8Array(buf));
  console.log('[download-xmrig] Extracting...');

  const extractDir = path.join(minersDir, 'extract');
  fs.mkdirSync(extractDir, { recursive: true });
  const isZip = /\.zip$/i.test(asset.name);
  if (isZip) {
    execSync(
      `powershell -NoProfile -Command "Expand-Archive -Path '${archivePath.replace(/'/g, "''")}' -DestinationPath '${extractDir.replace(/'/g, "''")}' -Force"`,
      { stdio: 'inherit' }
    );
  } else {
    execSync(`tar -xzf "${archivePath}" -C "${extractDir}"`, { stdio: 'inherit' });
  }

  const subdir = fs.readdirSync(extractDir).find((n) => n.startsWith('xmrig-'));
  const srcDir = subdir ? path.join(extractDir, subdir) : extractDir;
  const files = fs.readdirSync(srcDir);
  const binName = files.find((n) => n === 'xmrig' || n === 'xmrig.exe') || minerName;
  const src = path.join(srcDir, binName);
  if (!fs.existsSync(src)) throw new Error(`Binary not found in archive: expected ${binName}`);
  fs.copyFileSync(src, minerPath);
  fs.rmSync(extractDir, { recursive: true, force: true });
  try {
    fs.unlinkSync(archivePath);
  } catch (_) {}
  if (platform !== 'win32') {
    fs.chmodSync(minerPath, 0o755);
  }
  console.log(`[download-xmrig] Done: ${minerPath}`);
}

main().catch((err) => {
  console.error('[download-xmrig] Error:', err.message);
  process.exit(1);
});
