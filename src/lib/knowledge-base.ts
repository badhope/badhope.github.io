export interface FAQItem {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  category: 'about' | 'skills' | 'projects' | 'tech' | 'contact' | 'general';
  confidence?: number;
}

export const knowledgeBase: FAQItem[] = [
  {
    id: 'about-001',
    keywords: ['关于', '个人', '介绍', '是谁', '背景', '经历'],
    question: 'badhope是谁？',
    answer: 'badhope 是一名全栈开发者，专注于数据科学与大数据技术专业。毕业于深圳，热衷于探索前沿技术，是AI时代的积极探索者和开源贡献者。',
    category: 'about',
  },
  {
    id: 'about-002',
    keywords: ['学历', '学校', '专业', '毕业', '教育'],
    question: 'badhope的学历和专业是什么？',
    answer: 'badhope 毕业于深圳，学习数据科学与大数据技术专业。',
    category: 'about',
  },
  {
    id: 'about-003',
    keywords: ['位置', '地点', '城市', '在哪里', '深圳'],
    question: 'badhope在哪里？',
    answer: 'badhope 目前在 深圳 · 广东 · 中国 工作和生活。',
    category: 'about',
  },
  {
    id: 'skills-001',
    keywords: ['技能', '技术', '擅长', '栈', '能力', '编程语言'],
    question: 'badhope擅长哪些技术？',
    answer: 'badhope 是一位全栈开发者，擅长：\n• 前端：React, Next.js, TypeScript, Tailwind CSS\n• 后端：Node.js, Python, Go\n• 数据：Python, SQL, 大数据处理\n• AI/ML：机器学习, 深度学习, NLP\n• 工具：Git, Docker, Linux',
    category: 'skills',
  },
  {
    id: 'skills-002',
    keywords: ['前端', '前端开发', 'Vue', 'React'],
    question: 'badhope会前端开发吗？',
    answer: '是的，badhope精通前端开发，主要技术栈包括 React、Next.js、TypeScript、Tailwind CSS 等，能够构建现代化的响应式 Web 应用。',
    category: 'skills',
  },
  {
    id: 'skills-003',
    keywords: ['后端', '服务器', 'Node', 'Python'],
    question: 'badhope会后端开发吗？',
    answer: '是的，badhope掌握后端开发，使用 Node.js、Python、Go 等语言，能够构建 RESTful API 和微服务架构。',
    category: 'skills',
  },
  {
    id: 'skills-004',
    keywords: ['AI', '人工智能', '机器学习', '深度学习', 'NLP'],
    question: 'badhope对AI有了解吗？',
    answer: '是的，badhope是AI时代的积极探索者，对机器学习、深度学习、自然语言处理(NLP)等领域有深入研究和实践。',
    category: 'skills',
  },
  {
    id: 'projects-001',
    keywords: ['项目', '作品', '开源', '贡献', 'github'],
    question: 'badhope有哪些开源项目？',
    answer: 'badhope 在 GitHub 上有多个开源项目，涵盖 Web 应用、数据可视化工具、AI 应用等多个领域。可以在 GitHub 主页查看所有项目：https://github.com/badhope',
    category: 'projects',
  },
  {
    id: 'projects-002',
    keywords: ['项目展示', '作品集', '案例'],
    question: '在哪里可以看到badhope的项目？',
    answer: '可以在网站的 /projects 页面查看 badhope 的项目展示，包括项目描述、技术栈、链接等信息。',
    category: 'projects',
  },
  {
    id: 'tech-001',
    keywords: ['博客', '文章', '写作', '分享'],
    question: 'badhope写博客吗？',
    answer: '是的，badhope会在博客页面分享技术文章、教程和经验总结，涵盖前端开发、后端技术、数据科学等多个领域。',
    category: 'tech',
  },
  {
    id: 'tech-002',
    keywords: ['工具', '软件', '推荐', '开发工具'],
    question: 'badhope使用什么开发工具？',
    answer: 'badhope 的常用开发工具包括：\n• 编辑器：VS Code, JetBrains 系列\n• 版本控制：Git\n• 容器化：Docker\n• API 测试：Postman\n• 数据库：VS Code, DBeaver\n\n具体工具推荐可以在 /tools 页面查看。',
    category: 'tech',
  },
  {
    id: 'contact-001',
    keywords: ['联系', '联系方式', '社交', '微信', '邮箱', 'email'],
    question: '如何联系badhope？',
    answer: '可以通过以下方式联系 badhope：\n• GitHub：https://github.com/badhope\n• 可以在 /contact 页面查看更多联系方式',
    category: 'contact',
  },
  {
    id: 'contact-002',
    keywords: ['合作', '外包', '项目合作', '工作'],
    question: '可以和badhope合作项目吗？',
    answer: '当然可以！欢迎通过 /contact 页面联系 badhope，讨论项目合作、技术咨询或其他合作机会。',
    category: 'contact',
  },
  {
    id: 'general-001',
    keywords: ['你好', 'hi', 'hello', '嗨'],
    question: '你好',
    answer: '你好！我是 badhope 的 AI 助手。有什么我可以帮助你的吗？你可以问我关于 badhope 的技能、项目、经历等问题。',
    category: 'general',
  },
  {
    id: 'general-002',
    keywords: ['帮助', '能做什么', '功能', '如何使用'],
    question: '你能做什么？',
    answer: '我可以回答关于 badhope 的各种问题，包括：\n• 个人背景和经历\n• 技术栈和技能\n• 开源项目信息\n• 联系方式\n• 技术博客内容\n\n你也可以查看技能书了解 badhope 的详细技能树。',
    category: 'general',
  },
  {
    id: 'general-003',
    keywords: ['网站', '这个网站', '个人网站'],
    question: '这个网站是用什么技术做的？',
    answer: '这个网站使用以下技术构建：\n• Next.js 15 (App Router)\n• TypeScript\n• Tailwind CSS\n• Framer Motion (动画)\n• Three.js + React Three Fiber (3D效果)\n• Recharts (数据可视化)\n\n部署在 GitHub Pages 上。',
    category: 'general',
  },
];

export function searchKnowledgeBase(query: string): FAQItem | null {
  const normalizedQuery = query.toLowerCase().trim();
  const words = normalizedQuery.split(/\s+/);

  let bestMatch: FAQItem | null = null;
  let highestScore = 0;

  for (const item of knowledgeBase) {
    let score = 0;

    for (const keyword of item.keywords) {
      const keywordLower = keyword.toLowerCase();

      if (normalizedQuery.includes(keywordLower)) {
        score += 10;
      }

      for (const word of words) {
        if (keywordLower.includes(word) || word.includes(keywordLower)) {
          score += 5;
        }
      }
    }

    if (item.question.toLowerCase().includes(normalizedQuery)) {
      score += 20;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  return highestScore > 0 ? bestMatch : null;
}

export function getRandomGreeting(): string {
  const greetings = [
    '你好！有什么关于 badhope 的问题想问我吗？',
    '嗨！我是 badhope 的 AI 助手，可以回答各种问题～',
    '欢迎！你可以问我关于技能、项目或联系方式的问题。',
    '你好！想了解 badhope 的哪方面呢？',
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

export const skillCategories = {
  frontend: {
    name: '前端开发',
    icon: '🎨',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  backend: {
    name: '后端开发',
    icon: '⚙️',
    skills: ['Node.js', 'Python', 'Go', 'RESTful API', 'GraphQL', 'Docker'],
  },
  database: {
    name: '数据库',
    icon: '🗄️',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'SQL', 'Database Design'],
  },
  ai: {
    name: 'AI/机器学习',
    icon: '🤖',
    skills: ['Machine Learning', 'Deep Learning', 'NLP', 'PyTorch', 'TensorFlow', 'OpenAI API'],
  },
  tools: {
    name: '开发工具',
    icon: '🔧',
    skills: ['Git', 'GitHub', 'VS Code', 'Docker', 'Linux', 'CI/CD'],
  },
  other: {
    name: '其他技能',
    icon: '📦',
    skills: ['Agile/Scrum', 'Technical Writing', 'System Design', 'Cloud Services'],
  },
};
