/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 改为标准部署以支持 API 路由
  // output: 'export', // 注释掉静态导出
  trailingSlash: true,
  distDir: 'out',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/scientific-knowledge-navigation' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/scientific-knowledge-navigation' : '',
}

