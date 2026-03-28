import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Optimized for Vercel
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
}

export default nextConfig
