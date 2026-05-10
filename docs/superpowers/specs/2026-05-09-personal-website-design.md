# 个人网站设计文档

**项目名称：** BadHope's Hub
**版本：** v1.0
**日期：** 2026-05-09
**状态：** 已批准

---

## 1. 项目概述

### 1.1 项目目标

构建一个现代化的个人网站，集工具集合、资源收藏、AI 工具、项目展示和博客引流于一体，作为个人品牌的统一入口和效率工作台。

### 1.2 核心价值

- **工具集合**：提供实用的在线工具，无需安装即可使用
- **资源导航**：收藏管理常用网站和工具，一站式访问
- **AI 助手**：集成多种 AI 模型，随时调用
- **博客引流**：展示外部博客内容，引导访问

### 1.3 目标用户

- 开发者同行
- 技术爱好者
- 需要效率工具的用户

---

## 2. 技术架构

### 2.1 技术栈

| 层级 | 技术选型 | 说明 |
|------|----------|------|
| 前端框架 | Next.js 14+ (App Router) | 现代化的 React 框架 |
| 后端框架 | FastAPI | 高性能 Python Web 框架 |
| 数据库 | PostgreSQL | Neon 云托管 |
| ORM | SQLAlchemy | 数据库抽象 |
| 前端样式 | Tailwind CSS | 原子化 CSS |
| UI 组件 | shadcn/ui | 高质量组件库 |
| 部署 | Vercel (前端) + Fly.io (后端) | 零运维部署 |
| AI 集成 | LangChain / 直接 API 调用 | 支持多模型 |

### 2.2 系统架构图

```
┌─────────────────────────────────────────────────────────┐
│                    前端 (Next.js 14)                    │
│                  Vercel 托管部署                        │
└─────────────────────┬───────────────────────────────────┘
                      │ REST API
┌─────────────────────▼───────────────────────────────────┐
│                   后端 (FastAPI)                         │
│                  Fly.io 托管部署                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │ AI 服务层   │  │ 工具服务层   │  │ 用户服务层   │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                数据库 (PostgreSQL)                        │
│                  Neon 云托管                              │
└─────────────────────────────────────────────────────────┘
```

### 2.3 项目目录结构

```
/workspace
├── frontend/                    # Next.js 前端
│   ├── src/
│   │   ├── app/               # App Router 页面
│   │   │   ├── page.tsx      # 首页
│   │   │   ├── tools/        # 工具页面
│   │   │   ├── resources/    # 资源页面
│   │   │   ├── ai/           # AI 工具页面
│   │   │   ├── projects/     # 项目页面
│   │   │   ├── about/        # 关于页面
│   │   │   ├── dashboard/    # 用户仪表盘
│   │   │   └── api/          # API 客户端
│   │   ├── components/       # React 组件
│   │   ├── lib/              # 工具函数
│   │   └── types/            # TypeScript 类型
│   └── package.json
│
├── backend/                    # FastAPI 后端
│   ├── app/
│   │   ├── main.py           # 应用入口
│   │   ├── routers/          # API 路由
│   │   │   ├── tools.py      # 工具 API
│   │   │   ├── ai.py         # AI API
│   │   │   ├── resources.py   # 资源 API
│   │   │   └── users.py      # 用户 API
│   │   ├── services/         # 业务逻辑
│   │   ├── models/           # 数据库模型
│   │   ├── schemas/          # Pydantic 模型
│   │   └── core/             # 核心配置
│   ├── requirements.txt
│   └── Dockerfile
│
├── docs/                      # 文档
│   └── specs/                 # 设计文档
└── docker-compose.yml         # 本地开发
```

---

## 3. 页面结构

### 3.1 页面路由

| 路径 | 页面 | 说明 | 访问权限 |
|------|------|------|----------|
| `/` | 首页 | 工具集合默认展示 | 公开 |
| `/tools` | 工具列表 | 所有工具分类展示 | 公开 |
| `/tools/[slug]` | 工具详情 | 单个工具页面 | 公开 |
| `/resources` | 资源收藏 | 网站/工具导航 | 公开（部分） |
| `/ai` | AI 工具首页 | AI 工具入口 | 公开 |
| `/ai/chat` | AI 对话 | 聊天界面 | 公开 |
| `/ai/[tool]` | AI 工具 | 其他 AI 功能 | 公开 |
| `/projects` | 项目展示 | GitHub 项目列表 | 公开 |
| `/about` | 关于我 | 个人介绍 | 公开 |
| `/dashboard` | 仪表盘 | 用户概览 | 需登录 |
| `/dashboard/favorites` | 我的收藏 | 管理收藏 | 需登录 |
| `/dashboard/settings` | 设置 | 用户设置 | 需登录 |
| `/login` | 登录 | 登录页面 | 公开 |
| `/register` | 注册 | 注册页面 | 公开 |

### 3.2 响应式策略

- 桌面优先设计，支持平板和手机
- 断点：768px（平板）、480px（手机）
- 移动端简化导航，采用底部 Tab 或汉堡菜单

---

## 4. 数据模型

### 4.1 数据库 ER 图

```
┌──────────────┐       ┌──────────────────┐
│    User      │       │     Resource     │
├──────────────┤       ├──────────────────┤
│ id           │       │ id               │
│ email        │       │ url              │
│ name         │◄──────│ title            │
│ password_hash│  1:N  │ description      │
│ avatar       │       │ icon             │
│ theme        │       │ category_id      │───► Category
│ created_at   │       │ is_public        │
└──────────────┘       │ user_id          │────► User
       │               │ created_at       │
       │ 1:N           └──────────────────┘
       ▼                      │
┌──────────────────┐          │
│  AIConversation  │          │
├──────────────────┤          │
│ id               │          │
│ user_id          │          │
│ model            │          │
│ messages (JSON)  │          │
│ created_at       │          │
└──────────────────┘          │
                              │
┌──────────────────┐   ┌──────────────┐
│      Tool        │   │   Category   │
├──────────────────┤   ├──────────────┤
│ id               │   │ id           │
│ slug             │   │ name         │
│ name             │   │ slug         │
│ description      │   │ icon         │
│ category         │   │ order        │
│ icon             │   └──────────────┘
│ is_ai            │
│ created_at       │
└──────────────────┘

┌──────────────────┐
│      Blog        │
├──────────────────┤
│ id               │
│ title            │
│ url              │
│ source           │
│ published_at     │
│ created_at       │
└──────────────────┘
```

### 4.2 模型详细定义

#### User
```python
class User:
    id: UUID
    email: str (唯一)
    name: str
    password_hash: str
    avatar: str | None
    theme: str  # "light" | "dark" | "system"
    created_at: datetime
```

#### Resource
```python
class Resource:
    id: UUID
    url: str
    title: str
    description: str | None
    icon: str | None  # URL 或 emoji
    category_id: UUID
    user_id: UUID | None  # None 表示公开资源
    is_public: bool
    tags: list[str]
    created_at: datetime
    updated_at: datetime
```

#### Category
```python
class Category:
    id: UUID
    name: str
    slug: str (唯一)
    icon: str  # emoji
    order: int
```

#### Tool
```python
class Tool:
    id: UUID
    slug: str (唯一)
    name: str
    description: str
    category: str
    icon: str
    is_ai: bool  # 是否为 AI 工具
    created_at: datetime
```

#### AIConversation
```python
class AIConversation:
    id: UUID
    user_id: UUID | None  # None 为游客对话
    model: str
    messages: list[dict]  # [{"role": "user", "content": "..."}]
    created_at: datetime
    updated_at: datetime
```

---

## 5. 功能模块

### 5.1 在线工具

#### 第一批工具列表

| 工具 | Slug | 分类 | 说明 |
|------|------|------|------|
| 二维码生成 | qr-generator | 工具 | 生成任意内容的二维码 |
| 二维码解析 | qr-reader | 工具 | 解析二维码图片 |
| URL 缩短 | url-shortener | 工具 | 创建短链接 |
| JSON 格式化 | json-formatter | 工具 | JSON 格式化/压缩/验证 |
| Markdown 编辑器 | markdown-editor | 工具 | Markdown 编写+预览 |
| 颜色选择器 | color-picker | 工具 | 取色器和调色板 |
| 密码生成器 | password-generator | 工具 | 生成安全密码 |
| Base64 编解码 | base64-codec | 工具 | Base64 编码/解码 |
| 正则测试器 | regex-tester | 工具 | 正则表达式测试 |
| 时间戳转换 | timestamp | 工具 | Unix 时间戳转换 |
| UUID 生成器 | uuid-generator | 工具 | 生成 UUID |
| 进制转换 | base-converter | 工具 | 进制之间转换 |

#### 工具页面结构

每个工具页面包含：
- 标题和描述
- 输入区域
- 操作按钮
- 输出/结果区域
- 使用说明

### 5.2 AI 工具

#### 支持的 AI 模型

| 提供商 | 模型 | API 端点 |
|--------|------|----------|
| OpenAI | GPT-4o, GPT-4o-mini, GPT-3.5-turbo | https://api.openai.com/v1 |
| DeepSeek | deepseek-chat, deepseek-reasoner | https://api.deepseek.com/v1 |
| 通义千问 | qwen-plus, qwen-turbo | https://dashscope.aliyuncs.com/compatible-mode/v1 |
| 智谱 AI | glm-4, glm-4-flash | https://open.bigmodel.cn/api/paas/v4 |

#### AI 工具列表

| 工具 | 说明 |
|------|------|
| AI 对话 | 多模型对话，支持切换模型 |
| 文本摘要 | 长文本快速摘要 |
| 翻译 | 多语言翻译 |
| 文本改写 | 润色/改写文本 |
| 代码解释 | 解释代码功能 |
| 代码生成 | 根据描述生成代码 |

### 5.3 资源收藏

#### 预设分类

| 分类 | Emoji | 说明 |
|------|-------|------|
| 开发工具 | 🛠️ | IDE、编辑器、插件等 |
| AI 资源 | 🤖 | AI 模型、工具、学习资料 |
| 设计资源 | 🎨 | 设计工具、素材网站 |
| 学习平台 | 📚 | 在线课程、文档网站 |
| 效率工具 | ⚡ | 效率软件、插件 |
| 生活服务 | 🏠 | 生活相关的实用网站 |

#### 功能特性

- 卡片展示（图标、标题、描述、标签）
- 搜索和过滤
- 分类导航
- 公开/私有切换（需登录）
- 一键复制链接
- 添加新收藏（需登录）

### 5.4 博客引流

- 从 CSDN/掘金 RSS 获取文章列表
- 首页展示最近 3-5 篇
- 显示标题、来源、发布时间
- 点击跳转到原博客

### 5.5 项目展示

- 从 GitHub API 获取仓库列表
- 展示 Stars、Forks、描述
- 支持按语言筛选
- 链接到 GitHub 仓库

### 5.6 用户系统

#### 功能

- 邮箱注册/登录
- 密码重置
- 个人设置（主题、语言）
- 我的收藏管理
- AI 对话历史

#### 游客功能

- 所有工具可用
- 公开资源可浏览
- AI 对话可用（不保存历史）
- 限制：无法保存收藏、无法查看对话历史

---

## 6. API 设计

### 6.1 工具 API

```
POST   /api/tools/qr/generate      # 生成二维码
POST   /api/tools/qr/read          # 解析二维码
POST   /api/tools/url/shorten      # 缩短 URL
POST   /api/tools/json/format      # 格式化 JSON
POST   /api/tools/base64/encode    # Base64 编码
POST   /api/tools/base64/decode    # Base64 解码
```

### 6.2 AI API

```
POST   /api/ai/chat                # 发送消息
GET    /api/ai/models              # 获取可用模型
GET    /api/ai/conversations       # 获取对话历史 (需登录)
POST   /api/ai/conversations       # 创建新对话
DELETE /api/ai/conversations/{id}  # 删除对话
```

### 6.3 资源 API

```
GET    /api/resources              # 获取资源列表
POST   /api/resources              # 添加资源 (需登录)
PUT    /api/resources/{id}         # 更新资源 (需登录)
DELETE /api/resources/{id}         # 删除资源 (需登录)
GET    /api/resources/categories   # 获取分类
```

### 6.4 用户 API

```
POST   /api/auth/register          # 注册
POST   /api/auth/login             # 登录
POST   /api/auth/logout            # 登出
GET    /api/users/me               # 获取当前用户
PUT    /api/users/me               # 更新用户信息
```

### 6.5 其他 API

```
GET    /api/blogs                  # 获取博客文章
GET    /api/projects               # 获取 GitHub 项目
GET    /api/stats                  # 访客统计
```

---

## 7. 设计系统

### 7.1 色彩系统

#### 浅色模式
```css
:root {
  --color-primary: #FF8C42;        /* 暖橙色 - 主色 */
  --color-primary-hover: #E67A35;
  --color-secondary: #4ECDC4;      /* 薄荷绿 - 辅色 */
  --color-secondary-hover: #3DBDB5;

  --color-bg: #FFFBF5;             /* 暖白背景 */
  --color-bg-elevated: #FFFFFF;     /* 卡片背景 */
  --color-bg-muted: #F5F0EB;       /* 次要背景 */

  --color-text: #2D3436;           /* 主文字 */
  --color-text-secondary: #636E72; /* 次要文字 */
  --color-text-muted: #B2BEC3;     /* 占位文字 */

  --color-border: #E8E0D8;         /* 边框 */
  --color-border-hover: #D4C8BC;

  --color-success: #00B894;
  --color-warning: #FDCB6E;
  --color-error: #E17055;
  --color-info: #74B9FF;
}
```

#### 深色模式
```css
[data-theme="dark"] {
  --color-bg: #1a1a2e;
  --color-bg-elevated: #252542;
  --color-bg-muted: #16162a;

  --color-text: #F5F5F5;
  --color-text-secondary: #A0A0A0;
  --color-text-muted: #606060;

  --color-border: #3D3D5C;
  --color-border-hover: #4D4D6C;
}
```

### 7.2 字体系统

```css
--font-sans: 'Inter', 'Noto Sans SC', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### 7.3 间距系统

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### 7.4 圆角和阴影

```css
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

### 7.5 组件样式

#### 按钮
- 圆角：12px
- 内边距：12px 24px
- 字体：14px, font-weight: 500
- 主按钮：暖橙色背景，白色文字
- 次按钮：透明背景，边框

#### 卡片
- 圆角：16px
- 背景：白色/深色 elevated
- 阴影：md
- 内边距：24px
- hover：轻微上浮 + 阴影加深

#### 输入框
- 圆角：8px
- 边框：1px solid var(--color-border)
- 聚焦：2px 主色边框
- 内边距：12px 16px

---

## 8. 部署方案

### 8.1 前端部署 (Vercel)

```yaml
# vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.yourdomain.com/:path*"
    }
  ]
}
```

### 8.2 后端部署 (Fly.io)

```dockerfile
# backend/Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```toml
# fly.toml
app = "badhope-api"
primary_region = "hkg"

[build]
  dockerfile = "Dockerfile"

[[services]]
  internal_port = 8000
  protocol = "https"

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443

[[statics]]
  guest_path = "/app/static"
  url_path = "/static"
```

### 8.3 数据库 (Neon)

- 免费套餐足够个人使用
- 连接字符串存储在 Fly.io secrets
- 支持分支数据库用于开发

### 8.4 环境变量

#### 后端 (.env)
```
DATABASE_URL=postgresql://user:pass@host/db
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-...
DEEPSEEK_API_KEY=sk-...
QWEN_API_KEY=sk-...
ZHIHUI_API_KEY=sk-...
```

#### 前端 (.env.local)
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## 9. 开发计划

### 阶段一：基础架构 (预计 1 周)
- [ ] 初始化 Next.js 项目
- [ ] 初始化 FastAPI 项目
- [ ] 配置数据库和 ORM
- [ ] 搭建 UI 组件库
- [ ] 实现主题切换

### 阶段二：核心工具 (预计 1 周)
- [ ] 开发所有在线工具
- [ ] 优化工具页面 UX
- [ ] 实现工具分类导航

### 阶段三：AI 功能 (预计 3-4 天)
- [ ] 集成 AI API
- [ ] 开发对话界面
- [ ] 实现多模型切换

### 阶段四：资源收藏 (预计 2-3 天)
- [ ] 开发资源管理 API
- [ ] 实现收藏 CRUD
- [ ] 开发前端展示页面

### 阶段五：用户系统 (预计 2-3 天)
- [ ] 实现注册/登录
- [ ] 开发仪表盘
- [ ] 完善用户设置

### 阶段六：其他功能 (预计 2-3 天)
- [ ] 博客引流
- [ ] 项目展示
- [ ] 访客统计

### 阶段七：部署上线 (预计 1 天)
- [ ] 配置 Vercel
- [ ] 配置 Fly.io
- [ ] 配置 Neon
- [ ] 域名绑定
- [ ] HTTPS 验证

---

## 10. 注意事项

### 10.1 安全考虑

- 所有敏感 API 需要认证
- JWT token 设置过期时间
- 用户密码使用 bcrypt 哈希
- API 频率限制
- 输入验证

### 10.2 性能考虑

- 工具页面 SSR
- AI 对话页面 CSR
- 图片资源优化
- API 缓存
- 数据库索引

### 10.3 可访问性

- 语义化 HTML
- ARIA 标签
- 键盘导航
- 色彩对比度
- 屏幕阅读器支持

---

## 11. 后续扩展

- PWA 支持（离线工具）
- 浏览器插件
- Chrome 扩展
- 移动端 App
