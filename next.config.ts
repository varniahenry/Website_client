import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4200',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'necessary-luck-6eb7600ded.media.strapiapp.com/',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
