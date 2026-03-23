# badhope 个人品牌网站

> 一个具有艺术感与现代美学的个人品牌网站，展示全栈开发者的专业形象

---

## 🎯 项目目标

本项目旨在构建一个**可扩展的模块化个人品牌网站**，具备以下核心价值：

- ✅ 展示专业形象与技能矩阵
- ✅ 讲述技术故事与成长轨迹
- ✅ 提供开源贡献与项目展示平台
- ✅ 支持内容运营与数据追踪
- ✅ 预留AI时代扩展接口

---

## 🚀 快速开始

```bash
# 安装依赖
npm install --legacy-peer-deps

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 本地预览
npx serve@latest out -p 3000
```

---

## 📁 项目结构

```
src/
├── app/                          # Next.js 15 App Router
│   ├── home/page.tsx             # 首页
│   ├── blog/page.tsx             # 博客页
│   ├── projects/page.tsx         # 项目页
│   ├── tools/page.tsx            # 工具页
│   ├── resume/page.tsx           # 简历页
│   ├── contact/page.tsx          # 联系页
│   └── layout.tsx                # 根布局 + 全局状态
│
├── components/                   # 组件库
│   ├── 3d/                       # 3D场景
│   │   └── ThreeScene.tsx       # Three.js场景（动态网格 + 粒子）
│   │
│   ├── ai/                       # AI助手系统
│   │   ├── AIChat.tsx           # AI聊天主组件
│   │   ├── AISettings.tsx       # AI设置面板
│   │   └── SkillBook.tsx        # 技能书可视化
│   │
│   ├── animations/               # 动画组件
│   │   ├── Loader.tsx            # 叙事性加载器
│   │   └── PageTransition.tsx    # 页面过渡
│   │
│   ├── sections/                 # 页面区块
│   │   ├── Hero.tsx              # Hero区域（3D背景 + 打字机标题）
│   │   ├── About.tsx              # 关于我
│   │   ├── Skills.tsx            # 技能雷达图
│   │   ├── Projects.tsx          # 项目展示
│   │   └── Footer.tsx            # 页脚
│   │
│   └── ui/                       # UI组件
│       ├── Navigation.tsx        # 响应式导航
│       ├── BackToTop.tsx         # 返回顶部 + 进度环
│       ├── Comments.tsx          # Giscus评论区
│       └── InteractiveButton.tsx # 交互动画按钮
│
├── lib/                          # 工具库
│   ├── knowledge-base.ts        # AI知识库 + 关键词匹配
│   └── ai-api.ts                # 模块化AI API接口
│
├── hooks/                        # 自定义Hooks
│   └── useInteractions.ts        # 微交互系统
│
└── styles/
    └── globals.css                # 全局样式 + CSS变量

public/                           # 静态资源
├── images/                       # 图片资源
└── fonts/                        # 字体文件（如需离线）

.github/workflows/
└── deploy.yml                    # GitHub Pages自动部署
```

---

## 🛠️ 技术栈

| 类别 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 框架 | Next.js | 15.1 | App Router SSR |
| 语言 | TypeScript | 5.7 | 类型安全 |
| 样式 | Tailwind CSS | 3.4 | 原子化CSS |
| 动画 | Framer Motion | 11.x | 页面过渡 + 微交互 |
| 3D | Three.js + R3F | Latest | 3D场景渲染 |
| 图表 | Recharts | Latest | 数据可视化 |
| 部署 | GitHub Actions | - | CI/CD |

---

## 🎨 设计系统

### 色彩变量 (CSS Custom Properties)

```css
:root {
  --bg-primary: #0a0a0f;      /* 深空背景 */
  --bg-secondary: #12121a;    /* 卡片背景 */
  --color-cyan: #00d4ff;      /* 主色调-霓虹青 */
  --color-purple: #bf5af2;    /* 强调色-霓虹紫 */
  --color-pink: #ff375f;      /* 点缀色-霓虹粉 */
  --text-primary: #ffffff;    /* 主文字 */
  --text-secondary: #888888;  /* 次文字 */
}
```

### 组件分类

| 组件类型 | 后缀 | 示例 | 说明 |
|---------|------|------|------|
| 页面 | `Page` | `HomePage` | 完整页面 |
| 区块 | 无 | `Hero`, `About` | 页面内的section |
| UI | 无 | `Navigation` | 可复用UI单元 |
| 动画 | 无 | `Loader` | 纯动画组件 |

---

## 🔄 扩展计划 (Roadmap)

### Phase 1: 基础完善 ✅ 已完成
- [x] 响应式布局
- [x] 暗色主题
- [x] 粒子/Hex/Hero动画
- [x] 打字机标题效果
- [x] 返回顶部按钮

### Phase 2: 内容增强 🔄 进行中
- [x] 3D场景集成
- [x] 博客数据可视化
- [ ] 评论区系统
- [ ] 访问统计面板

### Phase 3: 交互升级
- [ ] AI对话助手（ChatGPT集成）
- [ ] 个性化推荐项目
- [ ] 动态简历生成器
- [ ] 技能树可视化升级

### Phase 4: 内容运营
- [ ] CMS内容管理
- [ ] Markdown博客编辑器
- [ ] SEO自动优化
- [ ] RSS订阅

### Phase 5: AI时代特性
- [ ] AI生成项目描述
- [ ] 智能简历分析
- [ ] 代码片段AI解释
- [ ] 自动化周报生成

---

## 🤖 AI/机器扩展指南

### 添加新页面

1. 在 `src/app/` 创建新目录，如 `src/app/ai-chat/`
2. 创建 `page.tsx` 和 `page.module.css`
3. 在 `Navigation.tsx` 添加导航项

```tsx
// src/app/ai-chat/page.tsx
'use client';
import styles from './page.module.css';

export default function AICalloutPage() {
  return (
    <main className={styles.page}>
      {/* 页面内容 */}
    </main>
  );
}
```

### 添加新组件

1. 放置于 `components/` 对应目录
2. 组件使用 `'use client'` 指令（如需客户端交互）
3. 样式使用 CSS Module (`*.module.css`)

```tsx
// components/ui/NewFeature.tsx
'use client';
import styles from './NewFeature.module.css';

interface Props {
  title: string;
  onAction?: () => void;
}

export default function NewFeature({ title, onAction }: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <button onClick={onAction}>执行</button>
    </div>
  );
}
```

### 添加动画效果

使用 Framer Motion：

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
/>
```

### 添加3D元素

参考 `ThreeScene.tsx` 使用 React Three Fiber：

```tsx
import { Canvas } from '@react-three/fiber';
import { Mesh, OrbitControls } from '@react-three/drei';

function Custom3DObject() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00d4ff" />
    </mesh>
  );
}

<Canvas>
  <Custom3DObject />
  <OrbitControls />
</Canvas>
```

---

## 📊 架构决策记录 (ADR)

### ADR-001: 为什么使用 App Router 而非 Pages Router
- **决定**: Next.js 15 App Router
- **原因**: 更好的服务端组件支持、嵌套布局、loading状态
- **影响**: 需要使用 `'use client'` 声明客户端组件

### ADR-002: 为什么使用 CSS Module 而非 Tailwind
- **决定**: CSS Module + Tailwind 混用
- **原因**: CSS Module适合组件私有样式，Tailwind适合快速原型
- **约定**: 组件样式用CSS Module，全局样式用Tailwind

### ADR-003: 3D场景使用动态导入
- **决定**: `dynamic(() => import(...), { ssr: false })`
- **原因**: 3D库依赖大量客户端API，SSR会导致水合不匹配
- **优化**: 配合loading状态避免布局抖动

---

## 🤖 AI助手系统

### 系统架构

```
┌─────────────────────────────────────────────────────────┐
│                      AI 聊天界面                         │
│                  (AIChat Component)                      │
├─────────────────────────────────────────────────────────┤
│                    知识库引擎                            │
│              (Knowledge Base + 关键词匹配)               │
├─────────────────────────────────────────────────────────┤
│                   AI API 网关                            │
│           (src/lib/ai-api.ts - 模块化接口)               │
├─────────────────────────────────────────────────────────┤
│  OpenAI  │  Claude  │  智谱AI  │  文心一言  │  通义千问  │
└─────────────────────────────────────────────────────────┘
```

### 核心文件

| 文件路径 | 功能说明 |
|---------|---------|
| `src/lib/knowledge-base.ts` | 知识库（FAQ问答 + 关键词匹配算法） |
| `src/lib/ai-api.ts` | 模块化AI API接口（支持多种模型） |
| `src/components/ai/AIChat.tsx` | AI聊天主组件 |
| `src/components/ai/AISettings.tsx` | AI配置设置面板 |
| `src/components/ai/SkillBook.tsx` | 技能书可视化组件 |

### 知识库工作流程

```
用户输入 → 关键词提取 → 知识库匹配 → 置信度计算 → 返回答案
                ↓ (无匹配)
         AI API 调用 (如已配置)
                ↓ (AI不可用)
         友好提示 + 备选建议
```

### 支持的AI模型

| 提供商 | 模型 | 状态 | 备注 |
|-------|------|------|------|
| OpenAI | GPT-4o, GPT-4, GPT-3.5 | 可用 | 需配置API Key |
| Claude | Claude 3.5, Claude 3 | 可用 | 需配置API Key |
| 智谱AI | GLM-4, GLM-3 | 可用 | 需配置API Key + BaseURL |
| 文心一言 | ERNIE-4, ERNIE-3.5 | 可用 | 需配置API Key + BaseURL |
| 通义千问 | Qwen-Max, Qwen-Plus | 可用 | 需配置API Key + BaseURL |

### 配置AI API

1. 访问 `/ai` 页面
2. 点击右上角「配置AI」按钮
3. 选择AI提供商（如 智谱AI）
4. 输入API密钥
5. 点击「测试连接」验证
6. 保存设置

### 添加新的AI提供商

在 `src/lib/ai-api.ts` 中添加：

```typescript
// 1. 在 AI_PROVIDERS 中添加配置
zhipu: {
  name: 'Zhipu AI',
  nameCN: '智谱AI',
  models: ['glm-4-plus', 'glm-4', 'glm-4-air'],
  defaultModel: 'glm-4-air',
  needsBaseUrl: true,
  description: '智谱AI国产大模型',
},

// 2. 添加调用函数
async function callZhipu(messages: AIMessage[], config: AIConfig): Promise<AIResponse> {
  // 实现调用逻辑
}

// 3. 在 generateAIResponse 中添加 case
switch (activeConfig.provider) {
  // ...
  case 'zhipu':
    return callZhipu(messages, activeConfig);
}
```

### 添加知识库问答

编辑 `src/lib/knowledge-base.ts` 中的 `knowledgeBase` 数组：

```typescript
{
  id: 'unique-id',           // 唯一标识
  keywords: ['关键词1', '关键词2'],  // 匹配关键词
  question: '标准问题',      // 参考问题
  answer: '标准答案',        // 返回答案
  category: 'about',         // 分类
}
```

---

## 💬 评论区系统

### Giscus 集成

基于 GitHub Discussions 的评论系统，无需独立后端。

**配置说明**：
- 仓库：`badhope/github.io`
- 类别：`Announcements`
- 主题：`pathname`
- 主题：`dark`

**文件位置**：`src/components/ui/Comments.tsx`

---

## 🔧 开发规范

### 文件命名
- 组件文件: `PascalCase.tsx`
- 样式文件: `PascalCase.module.css`
- 工具函数: `camelCase.ts`
- 常量文件: `SCREAMING_SNAKE_CASE.ts`

### 组件结构
```tsx
// 1. 导入
'use client';  // 仅需客户端交互时添加
import { useState, useEffect } from 'react';
import styles from './Component.module.css';

// 2. 类型定义
interface Props {
  title: string;
}

// 3. 组件定义
export default function Component({ title }: Props) {
  // 4. Hooks
  const [state, setState] = useState();

  // 5. 回调函数
  const handleClick = () => {};

  // 6. 渲染
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
    </div>
  );
}
```

### Git提交规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式（不影响功能）
refactor: 重构
perf: 性能优化
test: 测试相关
chore: 构建/工具
```

---

## 💡 扩展建议

### 1. 内容增强方向
- 添加技术博客系统（支持Markdown）
- 集成 Giscus 评论系统
- 添加访问量统计（Vercel Analytics / Umami）
- 实现RSS订阅源

### 2. 交互创新方向
- 添加 AI 聊天助手（基于GPT-4）
- 实现技能树可视化
- 添加动态简历生成器
- 制作项目时间线展示

### 3. 视觉升级方向
- WebGL 着色器背景
- GSAP 高级动画
- 3D 头像/产品展示
- 动态主题切换

### 4. 性能优化方向
- 图片优化（next/image + CDN）
- 组件级代码分割
- Service Worker 离线缓存
- Core Web Vitals 优化

### 5. SEO/可发现性
- sitemap 自动生成
- Open Graph 动态图片
- 结构化数据（JSON-LD）
- 多语言支持（i18n）

---

## 🌐 部署

### 自动部署 (GitHub Actions)
推送到 `main` 分支自动触发部署到 GitHub Pages。

### 手动部署
```bash
npm run build    # 构建到 /out
npm run deploy   # 推送 out/ 到 gh-pages 分支
```

### Vercel 部署（推荐）
```bash
npx vercel
```

---

## 📄 许可证

[MIT License](LICENSE) - 允许自由使用，但请保留署名。

---

## 👤 作者

**badhope**
- GitHub: [@badhope](https://github.com/badhope)
- Website: https://badhope.github.io

---

*最后更新: 2026-03-23 | Next.js 15.1 | TypeScript 5.7*
