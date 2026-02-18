/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@crypto-miner/shared'],
  async redirects() {
    return [
      { source: '/favicon.ico', destination: '/icon', permanent: true },
    ];
  },
};

module.exports = nextConfig;
