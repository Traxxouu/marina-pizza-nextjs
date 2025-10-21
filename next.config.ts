import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    taint: true,
  },
  transpilePackages: ['sanity'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;