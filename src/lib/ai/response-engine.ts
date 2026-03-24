import { knowledgeBase } from '../knowledge-base';

export function generateResponse(input: string): string {
  const lowerInput = input.toLowerCase();

  for (const item of knowledgeBase) {
    const keywords = item.keywords.map(k => k.toLowerCase());
    if (keywords.some(keyword => lowerInput.includes(keyword))) {
      return item.answer;
    }
  }

  const defaultResponses = [
    '这个问题我暂时无法回答，但你可以查看网站的其他部分获取更多信息 ✨',
    '我对这个话题了解不多，建议你直接访问 GitHub 或博客了解更多 🚀',
    '抱歉，我不理解这个问题。你可以尝试询问关于 badhope 的技能、项目或联系方式 📡',
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

export function getSuggestedQuestions(): string[] {
  return [
    'badhope 擅长哪些技术？',
    'badhope 在哪里工作？',
    '如何联系 badhope？',
    'badhope 有哪些开源项目？',
    '介绍一下 badhope',
  ];
}