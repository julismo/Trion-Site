import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Disable Next.js dev indicator (the small "N" badge bottom-left)
  devIndicators: false,
  // B10: removido `output: 'standalone'` — só necessário para Docker deploy.
  // Em dev mode adicionava overhead à compilação que estava a tornar o reload
  // lento. Quando for hora de deploy production, re-adicionar conditionally.
  poweredByHeader: false,
  compress: true,
}

export default nextConfig
