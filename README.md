# 智能知识导航与科学发现平台

## 🌟 项目概述

这是一个基于Web的智能知识导航与科学发现平台，旨在通过AI技术帮助用户构建知识网络，发现科学领域中的关联关系，并提供交互式的可视化界面。

## 🚀 核心功能

### 1. 模型测试控制台 (Model Test Console)
- **文本输入框**: 用户可以输入任何文本进行模型测试
- **多模型支持**: 支持多种AI模型配置（MiniMax-M2、Anthropic、MiniMax等）
- **流式响应**: 实时流式展示AI模型的输出，无需等待完整响应
- **模型配置管理**: 灵活配置和管理不同的AI模型
- **响应格式**: 支持流式和非流式两种响应模式

### 2. 知识网络生成模块
- **智能查询模型**: 基于AI模型的智能分析
- **知识网络构建智能体**: 自动分析文本并生成知识因果网络
- **动态交互展示**: 实时流式展示知识网络生成过程
- **可视化网络图**: 交互式展示节点和关系

### 3. 模型配置管理系统
- **多模型支持**: 支持配置多个AI模型提供商
- **灵活配置**: 可编辑模型名称、API端点、API密钥等
- **实时测试**: 内置模型连接测试功能
- **会话管理**: 支持设置默认模型和临时配置

### 4. Web系统特性
- **响应式设计**: 适配各种屏幕尺寸
- **实时流式响应**: 提供即时反馈
- **用户友好界面**: 现代化的UI设计
- **系统日志**: 详细的操作日志和错误追踪

## 🏗️ 技术架构

### 前端技术栈
- **Next.js 14**: React全栈框架
- **TypeScript**: 类型安全的JavaScript
- **Tailwind CSS**: 实用优先的CSS框架
- **Shadcn/ui**: 高质量React组件库

### 后端技术栈
- **Next.js API Routes**: 服务端API
- **Server Actions**: 服务端数据处理
- **Streaming API**: 实时数据流传输

### AI集成
- **多提供商支持**: OpenAI、Anthropic、MiniMax等
- **统一接口**: 标准化的模型调用接口
- **错误处理**: 完善的错误重试和降级机制

## 📁 项目结构

```
scientific-knowledge-navigation/
├── app/
│   ├── api/                    # API路由
│   │   ├── test/              # 测试API
│   │   ├── mock-stream/       # 模拟流式API
│   │   └── stream-model/      # 真实模型API
│   ├── model-test/            # 模型测试页面
│   └── page.tsx               # 主页
├── components/
│   └── ui/                    # UI组件
├── lib/
│   └── model-config.ts        # 模型配置
├── actions/
│   └── test-model.ts          # 模型测试操作
└── public/                    # 静态资源
```

## 🛠️ 安装和运行

### 环境要求
- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. 克隆项目
```bash
git clone <repository-url>
cd scientific-knowledge-navigation
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 访问应用
- **本地开发**: 打开浏览器访问 http://localhost:3000
- **GitHub Pages**: 访问 https://xiangshb.github.io/scientific-knowledge-navigation/

## 🧪 测试

### 自动化测试
运行内置的自动化测试脚本：
```bash
node simple-test.js
```

### 手动测试
1. **本地开发**: 访问 http://localhost:3000/model-test
2. **GitHub Pages**: 访问 https://xiangshb.github.io/scientific-knowledge-navigation/model-test
3. 配置AI模型（或使用模拟API）
4. 输入测试文本进行模型测试
5. 观察流式响应效果

## 📖 使用指南

### 1. 配置AI模型
- 点击右上角的"Configure"按钮
- 选择或添加新的模型配置
- 填写API密钥和端点信息
- 保存配置

### 2. 测试AI模型 (Model Test Console)
- **本地开发**: 访问 http://localhost:3000/model-test
- **GitHub Pages**: 访问 https://xiangshb.github.io/scientific-knowledge-navigation/model-test
- 在文本框中输入任何测试文本（如"你好"、"你是谁"等）
- 选择流式或非流式响应模式
- 点击发送按钮观察AI模型的实时响应
- 查看系统日志了解详细的API调用过程

### 3. 生成知识网络
- **本地开发**: 访问 http://localhost:3000/knowledge-network
- **GitHub Pages**: 访问 https://xiangshb.github.io/scientific-knowledge-navigation/knowledge-network
- 在知识网络页面输入主题或问题
- 点击发送按钮
- 观察实时生成的知识网络
- 查看最终的可视化结果

### 4. 查看系统日志
- 切换到"System Logs"标签
- 查看详细的操作记录
- 监控API调用状态

## 🔧 配置说明

### 环境变量
创建 `.env.local` 文件并配置以下变量：
```env
# OpenAI配置
OPENAI_API_KEY=your_openai_api_key
OPENAI_BASE_URL=https://api.openai.com/v1

# Anthropic配置
ANTHROPIC_API_KEY=your_anthropic_api_key
ANTHROPIC_BASE_URL=https://api.anthropic.com

# MiniMax配置
MINIMAX_API_KEY=your_minimax_api_key
MINIMAX_BASE_URL=https://api.minimax.chat/v1
```

### 模型配置格式
```json
{
  "id": "model-unique-id",
  "name": "模型显示名称",
  "baseURL": "https://api.example.com/v1",
  "connectionURL": "https://api.example.com/v1/chat/completions",
  "apiKey": "your-api-key",
  "model": "model-name",
  "provider": "provider-name"
}
```

## 🌐 API文档

### 测试API
```
POST /api/test
Content-Type: application/json

{
  "test": "测试数据"
}
```

### 流式AI对话响应
```
POST /api/mock-stream
Content-Type: application/json

{
  "prompt": "用户输入的文本",
  "config": {
    "model": "模型名称",
    "apiKey": "API密钥",
    "baseURL": "API基础URL"
  }
}
```

### 真实模型流式调用
```
POST /api/stream-model
Content-Type: application/json

{
  "prompt": "用户输入的文本",
  "config": {
    "model": "模型名称",
    "apiKey": "API密钥",
    "baseURL": "API基础URL",
    "connectionURL": "完整API端点"
  }
}
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- Next.js 团队提供的优秀框架
- OpenAI、Anthropic、MiniMax 等AI服务提供商
- Shadcn/ui 组件库
- 所有贡献者和用户的支持

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 Issue
- 发送邮件至项目维护者
- 参与社区讨论

---

**注意**: 这是一个演示项目，包含了模拟API用于测试。在生产环境中使用时，请确保配置真实的AI API端点和密钥。
