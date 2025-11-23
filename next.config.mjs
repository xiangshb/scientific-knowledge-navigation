/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/scientific-knowledge-navigation' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/scientific-knowledge-navigation' : '',
}

export default nextConfig
