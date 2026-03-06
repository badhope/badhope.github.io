# 🌟 熊泽城的个人网站

> AI 时代的探索者 | 全栈开发者 | 数据科学家

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📖 网站介绍

这是一个现代化的个人网站，展示了我在**人工智能**、**全栈开发**和**数据分析**等领域的技术能力和项目经验。网站采用蓝白主题设计，支持明暗模式切换，提供流畅的交互体验和响应式布局。

### ✨ 核心特性

- 🎨 **精美设计**：蓝白/黑色双主题，支持一键切换
- 🌌 **动态效果**：星空背景、流星效果、粒子动画
- 📱 **响应式布局**：完美适配桌面、平板和移动设备
- ⚡ **高性能**：优化的加载速度和动画性能
- ♿ **无障碍访问**：支持减少动画偏好
- 🔍 **SEO 优化**：完善的元数据和结构化数据

## 功能特性

### 核心功能
- 双主题切换（亮色/暗色）
- 响应式设计，适配所有设备
- 流畅的动画和过渡效果
- 滚动进度条和返回顶部按钮

### 留言系统
- 用户可发送留言
- 查看历史留言记录
- 留言数据本地存储

## 文件结构

```
github.io/
├── index.html          # 首页
├── resume.html         # 简历页面
├── works.html          # 作品集页面
├── tools.html          # 工具站页面
├── contact.html        # 联系方式页面（含留言功能）
├── 404.html            # 404 错误页面
├── js/
│   └── main.js         # 主脚本
├── css/
│   └── style.css       # 统一样式
└── README.md           # 说明文档
```

## 本地开发

```bash
# 使用 Python 启动本地服务器
python -m http.server 8080

# 或使用 Node.js
npx serve .
```

然后访问 http://localhost:8080

## 部署

### 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 进入仓库 Settings > Pages
3. 选择源分支（gh-pages 或 main）
4. 访问生成的页面链接

### 部署到其他平台

本项目为纯静态网站，可以部署到任何静态网站托管平台：
- GitHub Pages
- Vercel
- Cloudflare Pages
- 等等

## 技术栈

- **前端**: HTML5, CSS3, Vanilla JavaScript
- **字体**: Orbitron, Noto Sans SC, Cinzel
- **图标**: SVG 内联图标
- **存储**: localStorage（留言数据）

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 安全说明

⚠️ **注意**: 本项目的留言系统为前端演示版本，数据存储在浏览器 localStorage 中。生产环境请使用后端服务和数据库。

## 许可证

MIT License

## 联系方式

- GitHub: [@badhope](https://github.com/badhope)
- 邮箱：通过网站联系表单
