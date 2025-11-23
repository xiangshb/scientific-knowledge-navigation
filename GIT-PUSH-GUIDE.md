# Git 代码推送指南

## 方法一：命令行推送

### 基本推送命令
```bash
# 1. 进入项目目录
cd scientific-knowledge-navigation

# 2. 添加所有修改的文件
git add .

# 3. 提交更改
git commit -m "你的提交信息"

# 4. 推送到 GitHub
git push origin main
```

### 快速推送（一条命令）
```bash
cd scientific-knowledge-navigation && git add . && git commit -m "你的提交信息" && git push origin main
```

## 方法二：VS Code 推送

### 方式 1：使用 VS Code 源代码管理面板

1. **打开源代码管理面板**
   - 快捷键：`Ctrl + Shift + G` (Windows/Linux) 或 `Cmd + Shift + G` (Mac)
   - 或点击左侧栏的分支图标

2. **暂存更改**
   - 点击文件旁的 `+` 号暂存单个文件
   - 或点击顶部的 `Changes` 旁边的 `+` 号暂存所有文件

3. **提交更改**
   - 在消息框中输入提交信息
   - 点击 "Commit" 按钮
   - 或者点击 "Commit & Push" 一次性提交并推送

4. **推送到远程**
   - 点击左下角的分支名称
   - 选择 "Publish Branch" 或 "Push to..."

### 方式 2：使用 VS Code 集成终端

1. **打开集成终端**
   - 快捷键：`Ctrl + \` (反引号)
   - 或菜单：Terminal → New Terminal

2. **运行 Git 命令**
   ```bash
   git add .
   git commit -m "你的提交信息"
   git push origin main
   ```

### 方式 3：使用 VS Code GitLens 扩展

1. **安装 GitLens 扩展**
   - 在扩展市场中搜索 "GitLens"
   - 安装并重启 VS Code

2. **使用 GitLens 界面**
   - 在代码行旁边显示提交历史
   - 在源代码管理面板中有更丰富的 Git 操作

## 方法三：GitHub Desktop

### 使用 GitHub Desktop 客户端

1. **下载并安装 GitHub Desktop**
   - 访问 https://desktop.github.com/
   - 下载并安装客户端

2. **克隆或添加仓库**
   - File → Clone Repository
   - 或 File → Add Local Repository

3. **提交和推送**
   - 在左侧面板查看更改
   - 填写摘要和描述
   - 点击 "Commit to main"
   - 点击 "Push origin"

## 常用 Git 命令参考

### 查看状态
```bash
git status                    # 查看文件状态
git log                       # 查看提交历史
git diff                       # 查看具体更改内容
```

### 分支操作
```bash
git branch                    # 查看当前分支
git checkout -b 新分支名      # 创建并切换到新分支
git checkout 分支名           # 切换分支
git merge 分支名              # 合并分支
```

### 撤销操作
```bash
git checkout -- 文件名        # 撤销文件修改
git reset HEAD~1             # 撤销最后一次提交
git revert 提交ID             # 创建新提交撤销指定提交
```

## 推送到 GitHub Pages 的注意事项

### 自动部署触发
- ✅ 推送到 `main` 分支会自动触发 GitHub Actions
- ✅ 构建成功后会自动部署到 GitHub Pages
- ✅ 访问：https://xiangshb.github.io/scientific-knowledge-navigation/

### 推送前检查
1. **确保重要文件已提交**
   - `.github/workflows/deploy.yml`
   - `next.config.mjs`
   - `package.json`

2. **检查构建配置**
   - 静态导出配置是否正确
   - Node.js 版本是否兼容

3. **查看更改内容**
   ```bash
   git diff --staged        # 查看已暂存的更改
   ```

## 推荐工作流

### 日常开发
```bash
# 1. 查看当前状态
git status

# 2. 查看具体更改
git diff

# 3. 添加并提交
git add .
git commit -m "feat: 添加新功能描述"

# 4. 推送
git push origin main
```

### VS Code 用户推荐
1. 使用源代码管理面板进行日常操作
2. 使用集成终端执行复杂 Git 命令
3. 安装 GitLens 增强体验

## 提交信息规范

### 推荐格式
```
类型: 简短描述

详细描述（可选）

相关问题: #编号
```

### 常用类型
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### 示例
```bash
git commit -m "feat: 添加 GitHub Pages 自动部署配置"
git commit -m "fix: 修复 Node.js 版本兼容性问题"
git commit -m "docs: 更新 README.md 部署说明"
```

---

**提示**: 选择最适合你工作习惯的方式，VS Code 的图形界面通常是最直观的选择！
