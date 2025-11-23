/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 启用静态导出以支持 GitHub Pages 部署
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/scientific-knowledge-navigation' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/scientific-knowledge-navigation' : '',
}

