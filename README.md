# 熊泽城个人网站

一个现代化的个人网站，具有用户认证系统、内容访问控制和留言功能。

## 功能特性

### 核心功能
- 双主题切换（亮色/暗色）
- 响应式设计，适配所有设备
- 流畅的动画和过渡效果
- 滚动进度条和返回顶部按钮

### 用户认证系统
- 用户注册/登录
- 会话管理（支持"记住我"功能）
- 安全的密码存储（前端演示）
- 演示账号：demo@example.com / demo123

### 访问控制
- 未登录用户：仅可查看简历摘要信息
- 已登录用户：可查看完整简历详情
- 留言功能：仅限已认证用户使用

### 留言系统
- 用户可发送留言
- 查看历史留言记录
- 留言数据本地存储

## 文件结构

```
github.io/
├── index.html          # 首页
├── login.html          # 登录/注册页面
├── resume.html         # 简历页面（含访问控制）
├── works.html          # 作品集页面
├── tools.html          # 工具站页面
├── contact.html        # 联系方式页面（含留言功能）
├── js/
│   └── auth.js         # 认证和留言系统
├── netlify.toml        # Netlify配置
└── README.md           # 说明文档
```

## 部署到 Netlify

### 方法一：通过 Netlify Dashboard

1. 登录 [Netlify](https://app.netlify.com/)
2. 点击 "Add new site" > "Import an existing project"
3. 选择 Git 提供商（GitHub）
4. 选择 `github.io` 仓库
5. 配置构建设置：
   - Build command: 留空或 `echo 'No build required'`
   - Publish directory: `.` 或 `/`
6. 点击 "Deploy site"

### 方法二：通过 Netlify CLI

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 初始化项目
netlify init

# 部署
netlify deploy --prod
```

### 环境变量配置

本项目为纯前端静态网站，无需配置环境变量。用户数据存储在浏览器 localStorage 中。

## 本地开发

```bash
# 使用 Python 启动本地服务器
python -m http.server 8080

# 或使用 Node.js
npx serve .
```

然后访问 http://localhost:8080

## 技术栈

- **前端**: HTML5, CSS3, Vanilla JavaScript
- **字体**: Orbitron, Noto Sans SC, Cinzel
- **图标**: SVG 内联图标
- **存储**: localStorage（用户数据、留言数据）
- **部署**: Netlify / GitHub Pages

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 安全说明

⚠️ **注意**: 本项目的认证系统为前端演示版本，用户数据存储在浏览器 localStorage 中。生产环境请使用后端服务和数据库进行用户认证。

## 许可证

MIT License

## 联系方式

- GitHub: [@badhope](https://github.com/badhope)
- 邮箱: 通过网站联系表单