# Vercel 部署方案（推荐）

由于 GitHub Pages 限制，推荐使用 Vercel 部署以支持完整的 API 功能。

## 🚀 快速部署

### 1. 连接 GitHub 仓库
1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择 `scientific-knowledge-navigation` 仓库

### 2. 配置环境变量
在 Vercel 项目设置中添加：

```bash
# Next.js 配置
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### 3. 部署
- 点击 "Deploy" 
- Vercel 会自动检测 Next.js 项目
- 部署完成后获得 API 支持的完整功能

## 🔄 GitHub Pages 替代方案

如果必须使用 GitHub Pages，有以下选项：

### 方案 1: 外部 API 服务
```javascript
// 在客户端直接调用外部 API
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  headers: {
    'Authorization': `Bearer ${userApiKey}`
  }
})
```

### 方案 2: Cloudflare Workers
- 使用 Cloudflare Workers 作为 API 代理
- 在 GitHub Pages 中调用 Workers API

### 方案 3: Netlify Functions
- 迁移到 Netlify（支持 Serverless Functions）
- 保持 GitHub 仓库不变

## 📊 功能对比

| 特性 | Vercel | GitHub Pages | Cloudflare Workers |
|------|--------|-------------|------------------|
| API 路由 | ✅ | ❌ | ✅ |
| Serverless | ✅ | ❌ | ✅ |
| 免费额度 | 100GB/月 | 100GB/月 | 100k请求/天 |
| 部署速度 | ⚡ 快 | 🐌 慢 | ⚡ 快 |
| 域名绑定 | ✅ | ✅ | ✅ |

## 🎯 推荐方案

**使用 Vercel** 的原因：
1. **完整功能支持**: API 路由、Serverless、边缘函数
2. **零配置部署**: 自动检测 Next.js 项目
3. **GitHub 集成**: 直接连接仓库，自动部署
4. **性能优化**: 全球 CDN，边缘计算
5. **免费额度充足**: 个人项目完全够用

## 🛠️ 迁移步骤

### 从 GitHub Pages 迁移到 Vercel：

1. **保留现有代码** - 无需修改
2. **连接仓库** - 2分钟完成
3. **配置环境变量** - 复制粘贴
4. **部署** - 一键完成

### 部署后测试：
```bash
# 测试 API 端点
curl -X POST https://your-project.vercel.app/api/model-test \
  -H "Content-Type: application/json" \
  -d '{"prompt":"测试","config":{"apiKey":"your-key","connectionURL":"your-url"}}'
```

## 🔗 相关链接

- [Vercel Next.js 文档](https://vercel.com/docs/frameworks/nextjs)
- [部署指南](https://vercel.com/docs/deployments)
- [环境变量配置](https://vercel.com/docs/projects/environment-variables)

---

**结论**: 要在 GitHub 上实现真实的 AI 模型访问，推荐使用 Vercel 而不是 GitHub Pages。Vercel 提供完整的 Next.js 支持，包括 API 路由和服务器端功能。
