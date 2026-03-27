import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
    // Allow unoptimized local images to load even before real photos are uploaded
    unoptimized: false,
  },
}

export default nextConfig
