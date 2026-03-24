# 网站质量保障与优化计划

> 创建日期: 2026-03-24
> 项目: badhope Portfolio
> 版本: v2.0 (新增问题汇总)

---

## 一、问题汇总表

### 1.1 功能性问题

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| F-01 | 🔴 高 | 下载PDF按钮href="#"无效 | Resume页面 | `src/app/resume/page.tsx:56` |
| F-02 | 🟡 中 | 评论区Giscus语言切换缺失 | Comments组件 | `src/components/ui/Comments.tsx` |
| F-03 | 🟡 中 | AI页面加载文本"加载聊天组件..."硬编码 | AI页面 | `src/app/ai/page.tsx:17` |
| F-04 | 🟡 中 | Contact页面表单标签硬编码 | Contact页面 | `src/app/contact/page.tsx:106,108` |
| F-05 | 🟡 中 | Contact页面平台名称硬编码 | Contact页面 | `src/app/contact/page.tsx:14` |
| F-06 | 🟡 中 | SkillBook功能说明硬编码 | AI页面 | `src/components/ai/SkillBook.tsx` |

### 1.2 国际化问题

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| I-01 | 🔴 高 | Blog页面完全无i18n | Blog页面 | `src/app/blog/page.tsx` |
| I-02 | 🔴 高 | Resume页面完全无i18n | Resume页面 | `src/app/resume/page.tsx` |
| I-03 | 🔴 高 | Tools页面完全无i18n | Tools页面 | `src/app/tools/page.tsx` |
| I-04 | 🔴 高 | AI页面大部分无i18n | AI页面 | `src/app/ai/page.tsx` |
| I-05 | 🟡 中 | ErrorBoundary按钮文本无i18n | ErrorBoundary | `src/components/ErrorBoundary.tsx:111,134` |
| I-06 | 🟡 中 | AISettings几乎全部硬编码 | AISettings | `src/components/ai/AISettings.tsx` |
| I-07 | 🟡 中 | AIChat快速问题硬编码 | AIChat | `src/components/ai/AIChat.tsx:135-138` |
| I-08 | 🟡 中 | AIChat错误消息硬编码 | AIChat | `src/components/ai/AIChat.tsx:107,117` |
| I-09 | 🟡 中 | SkillBook完全硬编码 | SkillBook | `src/components/ai/SkillBook.tsx` |
| I-10 | 🟡 中 | Loader加载文本硬编码 | Loader | `src/components/animations/Loader.tsx:12-14` |
| I-11 | 🟡 中 | Contact页面socialsDescZh/En硬编码 | Contact页面 | `src/app/contact/page.tsx:18-19` |

### 1.3 数据真实性问题

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| D-01 | 🔴 高 | About统计100+,50+,10+虚假数据 | About组件 | `src/components/sections/About.tsx` |
| D-02 | 🔴 高 | Projects页面stars/forks完全硬编码 | Projects页面 | `src/app/projects/page.tsx:17,28,39,50,61,71` |
| D-03 | 🔴 高 | Blog页面文章数/阅读量/点赞硬编码 | Blog页面 | `src/app/blog/page.tsx:11-12,24-29,36,44,52,60` |
| D-04 | 🔴 高 | Blog页面月度阅读数据硬编码 | Blog页面 | `src/app/blog/page.tsx:24-29` |
| D-05 | 🔴 高 | Blog页面featuredArticles数据虚假 | Blog页面 | `src/app/blog/page.tsx:34-63` |
| D-06 | 🟡 中 | Resume页面薪资/公司信息可能虚假 | Resume页面 | `src/app/resume/page.tsx:10-22` |
| D-07 | 🟡 中 | Skills数据静态无API | Skills组件 | `src/components/sections/Skills.tsx` |

### 1.4 内容/文案问题

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| C-01 | 🟡 中 | Tools页面版权占位符"Anonymous Portfolio" | Tools页面 | `src/app/tools/page.tsx` |
| C-02 | 🟡 中 | Tools页面分类标签全英文 | Tools页面 | `src/app/tools/page.tsx:22-26` |
| C-03 | 🟡 中 | Resume页面经验/教育信息过于简略 | Resume页面 | `src/app/resume/page.tsx` |
| C-04 | 🟡 中 | Footer版权年份"2024 - {year}"不合理 | Footer | `src/components/sections/Footer.tsx` |

### 1.5 安全性问题

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| S-01 | 🟡 中 | 外部链接缺少rel="noopener"(部分已有) | 多个文件 | 需全面检查 |
| S-02 | 🟢 低 | 缺少安全Headers配置 | next.config.ts | 需添加 |
| S-03 | 🟢 低 | 控制台console.log/warn/error遗留 | 多个文件 | 6处console调用 |

### 1.6 性能问题

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| P-01 | 🟡 中 | Three.js组件加载无loading状态 | Hero组件 | `src/components/sections/Hero.tsx` |
| P-02 | 🟢 低 | 静态资源未优化(public目录空) | public目录 | 需添加资源优化 |

### 1.7 外部链接问题

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| L-01 | 🟡 中 | GitHub链接https://github.com/badhope | 多处 | 需验证是否有效 |
| L-02 | 🟡 中 | 掘金链接https://juejin.cn/user/2350111542479753 | Navigation/Footer/Contact | 需验证 |
| L-03 | 🟡 中 | CSDN链接https://blog.csdn.net/weixin_56622231 | Contact/Footer | 需验证 |

---

## 二、新发现的遗漏问题详解

### 2.1 AISettings组件 - 几乎全部硬编码

**文件**: `src/components/ai/AISettings.tsx`

**硬编码文本**:
```tsx
line 43: setTestMessage('请先输入API密钥');
line 48: setTestMessage('正在测试连接...');
line 81: setTestMessage('请先选择AI提供商');
line 92: setTestMessage('连接成功！AI功能已启用。');
line 100: setTestMessage('连接失败，请检查网络和API配置');
line 236: {testStatus === 'testing' ? '测试中...' : '测试连接'}
```

**修改方案**:
```typescript
// 需添加到translations.ts
export interface AISettingsTranslations {
  testMessage: {
    noApiKey: string;
    testing: string;
    selectProvider: string;
    success: string;
    failed: string;
  };
  testButton: {
    testing: string;
    test: string;
  };
}
```

---

### 2.2 AIChat组件 - 快速问题硬编码

**文件**: `src/components/ai/AIChat.tsx`

**硬编码文本**:
```tsx
line 135: { q: 'badhope是谁？', icon: '👤' },
line 136: { q: '擅长什么技术？', icon: '💻' },
line 137: { q: '有哪些项目？', icon: '📂' },
line 138: { q: '如何联系？', icon: '📧' },
line 107: content: '抱歉，我无法找到关于这个问题的高匹配答案。你可以尝试：\n• 换一种方式描述你的问题\n• 访问 /contact 页面联系 badhope\n• 查看 /projects 页面了解更多信息'
line 117: content: '发生了一些问题，请稍后再试。'
line 162: {msg.source === 'ai' ? 'AI生成' : msg.source === 'knowledge' ? '知识库' : '系统'}
```

---

### 2.3 SkillBook组件 - 完全硬编码

**文件**: `src/components/ai/SkillBook.tsx`

**问题**: 整个组件无i18n支持，所有文本硬编码

---

### 2.4 Loader组件 - 加载文本硬编码

**文件**: `src/components/animations/Loader.tsx`

**硬编码文本**:
```tsx
line 12: '全栈开发者',
line 13: 'AI时代探索者',
line 14: '代码创造者',
```

---

### 2.5 Contact页面 - socialsDesc硬编码

**文件**: `src/app/contact/page.tsx`

**硬编码文本**:
```tsx
line 18: const socialsDescEn = ['Open source projects', 'Tech blog articles', 'Development insights', 'Business cooperation'];
line 19: const socialsDescZh = ['开源项目与代码', '技术博客文章', '开发心得分享', '商务合作联系'];
```

---

### 2.6 控制台遗留日志

**文件位置**:
```
src/app/not-found.tsx:14: console.warn('404 - Page not found');
src/components/ErrorBoundary.tsx:27: console.error('ErrorBoundary caught an error:', error, errorInfo);
src/components/ai/AIChat.tsx:90: console.warn('AI调用失败，回退到知识库');
src/lib/ai-api.ts:99: console.warn('Failed to load AI config');
src/lib/ai-api.ts:110: console.warn('Failed to save AI config');
src/app/error.tsx:13: console.error('Application error:', error);
```

---

## 三、翻译文件扩展需求

### 3.1 新增翻译接口

```typescript
// AI相关
export interface AIChatTranslations {
  quickQuestions: { q: string; icon: string }[];
  errorMessages: {
    noMatch: string;
    general: string;
  };
  sources: {
    ai: string;
    knowledge: string;
    system: string;
  };
  placeholder: string;
}

export interface AISettingsTranslations {
  testMessage: {
    noApiKey: string;
    testing: string;
    selectProvider: string;
    success: string;
    failed: string;
  };
  testButton: { testing: string; test: string };
}

export interface SkillBookTranslations {
  title: string;
  items: { title: string; description: string }[];
}

// Contact相关
export interface ContactTranslations {
  socialsDesc: string[];
}

// Resume
export interface ResumeTranslations {
  label: string;
  title: string;
  subtitle: string;
  download: string;
  print: string;
  sections: {
    summary: string;
    skills: string;
    experience: string;
    education: string;
  };
  experience: { title: string; company: string; period: string; description: string }[];
  education: { degree: string; school: string; period: string; description: string }[];
  location: { zh: string; en: string };
  contact: { email: string };
}

// Blog
export interface BlogTranslations {
  label: string;
  title: string;
  subtitle: string;
  readMore: string;
  articles: string;
  views: string;
  likes: string;
  visitProfile: string;
  monthlyViews: string;
  categoryDistribution: string;
  platforms: { csdn: string; juejin: string };
  categories: { web: string; tools: string; other: string };
  months: string[];
  featuredArticles: string;
}

// Tools
export interface ToolsTranslations {
  title: string;
  subtitle: string;
  categories: { all: string; editor: string; design: string; deploy: string; devops: string; other: string };
  footerRights: string;
}
```

---

## 四、实施优先级 (修订)

### Phase 1: 高优先级 - i18n核心

| 任务 | 依赖 | 优先级 |
|------|------|--------|
| 翻译文件扩展(resume, blog, tools, ai) | 无 | P0 |
| Resume页面i18n | translations.ts | P0 |
| Blog页面i18n | translations.ts | P0 |
| Tools页面i18n | translations.ts | P0 |
| AI页面i18n | translations.ts | P0 |
| AISettings i18n | translations.ts | P1 |
| AIChat i18n | translations.ts | P1 |
| SkillBook i18n | translations.ts | P1 |

### Phase 2: 高优先级 - 数据真实化

| 任务 | 说明 | 优先级 |
|------|------|--------|
| About统计移除或标注 | 移除虚假数据或标注为示例 | P0 |
| GitHub API集成获取stars/forks | 需真实API调用 | P1 |
| CSDN/掘金API或移除统计 | 真实数据或移除 | P1 |

### Phase 3: 中优先级 - 功能修复

| 任务 | 优先级 |
|------|--------|
| Resume PDF下载修复 | P1 |
| Contact页面i18n完善 | P1 |
| 控制台日志清理 | P2 |
| Loader i18n | P2 |
| ErrorBoundary完善 | P2 |

---

## 五、真实API集成方案

### 5.1 GitHub Stars/Forks

```typescript
// src/lib/github-api.ts
export async function getGitHubStats(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
    next: { revalidate: 3600 } // 1小时缓存
  });
  const repos = await response.json();
  return repos.reduce((acc: any, repo: any) => ({
    stars: acc.stars + repo.stargazers_count,
    forks: acc.forks + repo.forks_count
  }), { stars: 0, forks: 0 });
}
```

### 5.2 CSDN/掘金统计

```typescript
// 选项A: 使用官方API(如存在)
// 选项B: 使用RSS源解析
// 选项C: 移除统计，改为"查看更多"链接

export function getBlogStats(platform: 'csdn' | 'juejin') {
  // 如果无法获取真实数据，建议移除统计卡片
}
```

---

## 六、PDF简历方案

```typescript
// 选项1: 放置PDF到 public/resume.pdf
//  href="/resume.pdf"

// 选项2: 使用print功能
//  onClick={() => window.print()}

// 选项3: 移除下载按钮(如果无PDF)
//  需i18n提示"简历PDF暂不可用"
```

---

## 七、验证清单

### 7.1 构建验证
- [ ] `npm run build` 成功
- [ ] 无TypeScript错误
- [ ] 无ESLint错误

### 7.2 功能验证
- [ ] 首页加载正常
- [ ] 导航切换正常
- [ ] 语言切换正常(所有页面)
- [ ] Resume PDF下载/打印
- [ ] 外部链接可访问

### 7.3 i18n验证
- [ ] EN/ZH切换所有页面正常
- [ ] 无未翻译文本(逐页检查)
- [ ] Contact页面socialsDesc双语
- [ ] AI组件全部双语

### 7.4 数据验证
- [ ] About统计真实或移除
- [ ] GitHub stars/forks真实或API缓存
- [ ] 博客统计真实或移除

### 7.5 代码质量
- [ ] 无console.log遗留
- [ ] 无无效href="#"
- [ ] 所有外部链接有rel="noopener"

---

*文档版本: v2.0*
*最后更新: 2026-03-24*
*新增: 问题详解、数据真实性、外部链接验证需求*

---

## 八、深层问题审计 (v2.0新增)

### 8.1 React Hooks 依赖问题

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| H-01 | 🟡 中 | Hero useEffect缺少language依赖 | titleIndex变化时language未重新执行 | `src/components/sections/Hero.tsx:26-65` |
| H-02 | 🟡 中 | NetworkStatus缺少useEffect清理函数 | setTimeout未在cleanup中清除 | `src/components/ui/NetworkStatus.tsx:19` |
| H-03 | 🟡 中 | Comments组件缺少useEffect清理函数 | setTimeout未清理 | `src/components/ui/Comments.tsx:22` |
| H-04 | 🟡 中 | Loader useEffect缺少onComplete依赖 | 清理函数未使用onComplete | `src/components/animations/Loader.tsx:21-29` |

**问题详解**:

```tsx
// Hero.tsx - 问题代码
useEffect(() => {
  // ...
  const type = () => { /* ... */ };
  const timeout = setTimeout(type, 500);
  return () => clearTimeout(timeout);
  // 缺少language依赖！当language改变时，type/erase函数不会重新创建
}, [titleIndex, t.hero.titles]); // ❌ language不在依赖数组中

// 正确写法
useEffect(() => {
  const titles = t.hero.titles;
  // ... 使用 titles 而不是依赖 t.hero.titles
}, [titleIndex, language]); // ✅
```

---

### 8.2 TypeScript 类型安全问题

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| T-01 | 🟡 中 | catch块参数未类型化 | `catch {}` 无error参数 | 多处 |
| T-02 | 🟡 中 | localStorage返回值类型断言 | as Language 不够严格 | `LanguageContext.tsx:24` |
| T-03 | 🟢 低 | useRef类型未指定 | 多个useRef无泛型参数 | 多处 |

**问题详解**:

```tsx
// AIChat.tsx:89, 113 - 空catch块
} catch {  // ❌ 应该捕获error
  // ...
}

// ai-api.ts:98, 109 - 空catch块
} catch {  // ❌ 应该捕获error
  // ...
}

// LanguageContext.tsx:24 - 类型断言不严格
const stored = localStorage.getItem(STORAGE_KEY) as Language | null;  // ⚠️
if (stored && (stored === 'en' || stored === 'zh')) {  // 有额外检查可以接受
```

---

### 8.3 无障碍访问(Accessibility)问题

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| A-01 | 🟡 中 | 移动端菜单缺少键盘导航 | tabIndex/keyDown处理缺失 | `Navigation.tsx` |
| A-02 | 🟡 中 | 交互按钮缺少焦点样式 | focus样式不明确 | `InteractiveButton.tsx` |
| A-03 | 🟡 中 | 表单缺少autocomplete属性 | 登录/联系表单缺少 | `contact/page.tsx` |
| A-04 | 🟢 低 | 语言切换器aria-label硬编码 | "Switch to English"固定 | `LanguageSwitcher.tsx:17` |
| A-05 | 🟢 低 | 缺少跳转链接(skip link) | 页面顶部无skip导航 | 全局 |

**问题详解**:

```tsx
// contact/page.tsx - 缺少autocomplete
<input
  type="email"
  id="email"
  autoComplete="email"  // ❌ 缺失
  // ...
/>

// LanguageSwitcher.tsx - aria-label硬编码
<button aria-label="Switch to English">  // ❌ 应该动态化
  EN
</button>
```

---

### 8.4 性能与内存问题

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| P-01 | 🟡 中 | ThreeScene加载无错误边界 | 3D组件崩溃无fallback | `Hero.tsx` |
| P-02 | 🟡 中 | Loader标签页失焦继续运行 | setInterval未清除 | `Loader.tsx:24` |
| P-03 | 🟢 低 | useRef未指定类型 | 多个useRef无泛型 | `Skills.tsx:10`等 |
| P-04 | 🟢 低 | 50个粒子CSS动画 | 可能造成性能问题 | `Loader.tsx:48` |

**问题详解**:

```tsx
// Loader.tsx - 页面切换时interval继续运行
const taglineInterval = setInterval(() => {
  setCurrentTagline((prev) => (prev + 1) % taglines.length);
}, 500);
// return中clearInterval了，所以问题不大，但需确认所有路径都清理了
```

---

### 8.5 状态管理问题

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| S-01 | 🟡 中 | Hero标题动画可能竞态条件 | 快速切换language时状态不一致 | `Hero.tsx` |
| S-02 | 🟡 中 | Contact表单提交无loading状态 | 用户不知道是否发送成功 | `contact/page.tsx` |
| S-03 | 🟡 中 | AI Chat messages可能无限增长 | 无最大消息数限制 | `AIChat.tsx` |

**问题详解**:

```tsx
// contact/page.tsx - 无loading状态
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitted(true);  // ❌ 应该有isSubmitting状态防止重复提交
};

// AIChat.tsx - 消息无限增长
const [messages, setMessages] = useState<ChatMessage[]>([]);
// 没有最大消息数限制，长时间使用可能导致内存问题
```

---

### 8.6 CSS/样式问题

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| C-01 | 🟡 中 | CSS Modules可能重复样式 | 多个文件定义类似样式 | 多个.module.css |
| C-02 | 🟡 中 | 动画使用CSS而非JS | 可能导致布局抖动 | Hero.tsx |
| C-03 | 🟢 低 | 缺少.dark变量支持 | 仅支持亮色主题 | globals.css |
| C-04 | 🟢 低 | @keyframes命名冲突风险 | 全局命名空间 | 多个CSS文件 |

---

### 8.7 Next.js App Router 配置问题

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| N-01 | 🟡 中 | next.config.ts缺少安全Headers | X-Content-Type-Options等 | `next.config.ts` |
| N-02 | 🟡 中 | 静态导出(output: "export") | 无法使用部分Next.js功能 | `next.config.ts` |
| N-03 | 🟡 中 | 无自定义error.tsx边界 | 全局error处理不完善 | `app/error.tsx` |
| N-04 | 🟡 中 | 无metadata导出 | SEO不完善 | 各page.tsx |

**问题详解**:

```tsx
// next.config.ts - 缺少安全配置
const nextConfig: NextConfig = {
  output: "export",  // ⚠️ 静态导出限制
  // 缺少:
  // headers: [{ source: '/(.*)', headers: [...] }]
};

// page.tsx - 缺少metadata
// 应该导出静态metadata用于SEO:
// export const metadata = { title: '...', description: '...' }
```

---

### 8.8 潜在运行时错误

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| R-01 | 🟡 中 | setInterval/cursorInterval未清理 | Hero.tsx已正确清理，但需验证 | `Hero.tsx:27` |
| R-02 | 🟡 中 | 数组越界风险 | Projects/Skills map使用index | 多处 |
| R-03 | 🟡 中 | 0长数组渲染 | Loader.tsx使用[...Array(50)] | `Loader.tsx:48` |

**问题详解**:

```tsx
// Hero.tsx - 正确清理
useEffect(() => {
  const cursorInterval = setInterval(() => {
    setCursorVisible(prev => !prev);
  }, 530);
  return () => clearInterval(cursorInterval);  // ✅ 正确
}, []);

// 数组创建问题
{[...Array(50)].map((_, i) => (  // [...Array(50)]每次创建新数组
  // 建议: 使用Array.from或提前定义常量
```

---

### 8.9 边缘情况遗漏

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| E-01 | 🟡 中 | localStorage不可用时报错 | SSR时localStorage不存在 | `LanguageContext.tsx` |
| E-02 | 🟡 中 | 网络恢复时banner不自动关闭 | 需手动dismiss | `NetworkStatus.tsx` |
| E-03 | 🟡 中 | 表单重复提交未阻止 | 无防重试机制 | `contact/page.tsx` |
| E-04 | 🟢 低 | 浏览器后退按钮状态丢失 | SPA路由状态不持久 | AIChat等 |

---

### 8.10 环境变量与配置问题

| 编号 | 严重程度 | 问题描述 | 位置 | 文件 |
|------|----------|----------|------|------|
| ENV-01 | 🟡 中 | .env.example缺失 | 不知道需要哪些环境变量 | 项目根目录 |
| ENV-02 | 🟡 中 | AI API密钥明文存储 | localStorage不够安全 | `ai-api.ts` |
| ENV-03 | 🟢 低 | 无构建时验证 | 环境变量缺失不报错 | 构建配置 |

---

## 九、问题优先级重新分类

### P0 - 阻断性问题 (必须修复)

| 问题 | 影响 |
|------|------|
| Hero useEffect依赖缺失 | 切换语言时动画不更新 |
| localStorage SSR报错 | 页面无法SSR |
| PDF下载href="#" | 功能完全不可用 |
| 所有页面无i18n | 国际化功能缺失 |

### P1 - 严重问题 (影响用户体验)

| 问题 | 影响 |
|------|------|
| 虚假数据展示 | 误导用户 |
| catch块无错误处理 | 错误时无反馈 |
| Contact表单无防重复提交 | 可能发送多条消息 |
| 移动端菜单无键盘导航 |  accessibility |
| next.config缺少安全Headers | 安全隐患 |

### P2 - 一般问题 (可后续修复)

| 问题 | 影响 |
|------|------|
| useRef未指定类型 | TypeScript类型安全 |
| 缺少skip link | 键盘用户不便 |
| 缺少metadata | SEO影响 |
| Loader粒子数过多 | 低端设备性能 |

---

## 十、修复实施检查表

### 必做项 (按顺序)

- [ ] 1. 修复Hero.tsx的useEffect依赖
- [ ] 2. 修复LanguageContext.tsx的SSR localStorage检查
- [ ] 3. 添加Resume PDF下载功能或改为打印
- [ ] 4. 所有页面添加i18n支持
- [ ] 5. 添加Contact表单防重复提交
- [ ] 6. 修复NetworkStatus的useEffect cleanup
- [ ] 7. 添加next.config安全Headers

### 建议项

- [ ] 添加.eslintrc和.prettierrc
- [ ] 添加.env.example
- [ ] 添加metadata导出到各page
- [ ] 优化Loader粒子数量
- [ ] 添加skip link

---

*深度审计版本: v2.0-extended*
*审计日期: 2026-03-24*
*审计深度: 代码级审查、运行时分析、无障碍检查*
