export type AIProvider = 'openai' | 'claude' | 'zhipu' | 'ernie' | 'dashscope' | 'none';

export interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  content: string;
  provider: AIProvider;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIProviderConfig {
  name: string;
  nameCN: string;
  models: string[];
  defaultModel: string;
  needsBaseUrl: boolean;
  description: string;
}

export const AI_PROVIDERS: Record<Exclude<AIProvider, 'none'>, AIProviderConfig> = {
  openai: {
    name: 'OpenAI',
    nameCN: 'OpenAI',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
    defaultModel: 'gpt-4o-mini',
    needsBaseUrl: false,
    description: 'OpenAI GPT系列模型，支持GPT-4o、GPT-4等',
  },
  claude: {
    name: 'Anthropic Claude',
    nameCN: 'Claude',
    models: ['claude-3-5-sonnet-latest', 'claude-3-opus-latest', 'claude-3-haiku-latest'],
    defaultModel: 'claude-3-5-sonnet-latest',
    needsBaseUrl: false,
    description: 'Anthropic Claude 3.5系列模型，擅长对话和推理',
  },
  zhipu: {
    name: 'Zhipu AI',
    nameCN: '智谱AI',
    models: ['glm-4-plus', 'glm-4', 'glm-4-air', 'glm-3-turbo'],
    defaultModel: 'glm-4-air',
    needsBaseUrl: true,
    description: '智谱AI国产大模型，GLM系列',
  },
  ernie: {
    name: 'Baidu ERNIE',
    nameCN: '文心一言',
    models: ['ernie-4.0-8k-latest', 'ernie-3.5-8k', 'ernie-speed-128k'],
    defaultModel: 'ernie-3.5-8k',
    needsBaseUrl: true,
    description: '百度文心一言大模型',
  },
  dashscope: {
    name: 'Alibaba DashScope',
    nameCN: '通义千问',
    models: ['qwen-max', 'qwen-plus', 'qwen-turbo', 'qwen-long'],
    defaultModel: 'qwen-plus',
    needsBaseUrl: true,
    description: '阿里通义千问大模型',
  },
};

export const DEFAULT_AI_CONFIG: AIConfig = {
  provider: 'none',
  temperature: 0.7,
  maxTokens: 2048,
  systemPrompt: '你是badhope的AI助手，基于知识库回答关于badhope的问题。回答要友好、专业。',
};

const AI_CONFIG_KEY = 'badhope-ai-config';

export function getAIConfig(): AIConfig {
  if (typeof window === 'undefined') return DEFAULT_AI_CONFIG;

  try {
    const stored = localStorage.getItem(AI_CONFIG_KEY);
    if (stored) {
      return { ...DEFAULT_AI_CONFIG, ...JSON.parse(stored) };
    }
  } catch (err) {
    console.warn('Failed to load AI config:', err);
  }
  return DEFAULT_AI_CONFIG;
}

export function saveAIConfig(config: AIConfig): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(config));
  } catch (err) {
    console.warn('Failed to save AI config:', err);
  }
}

export function isAIEnabled(): boolean {
  const config = getAIConfig();
  return config.provider !== 'none' && !!config.apiKey;
}

export async function generateAIResponse(
  messages: AIMessage[],
  config?: AIConfig
): Promise<AIResponse> {
  const activeConfig = config || getAIConfig();

  if (!isAIEnabled()) {
    throw new Error('AI未配置或未启用');
  }

  switch (activeConfig.provider) {
    case 'openai':
      return callOpenAI(messages, activeConfig);
    case 'claude':
      return callClaude(messages, activeConfig);
    case 'zhipu':
      return callZhipu(messages, activeConfig);
    case 'ernie':
      return callErnie(messages, activeConfig);
    case 'dashscope':
      return callDashscope(messages, activeConfig);
    default:
      throw new Error('不支持的AI提供商');
  }
}

async function callOpenAI(messages: AIMessage[], config: AIConfig): Promise<AIResponse> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model || 'gpt-4o-mini',
      messages: [{ role: 'system', content: config.systemPrompt }, ...messages],
      temperature: config.temperature || 0.7,
      max_tokens: config.maxTokens || 2048,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API错误: ${response.status}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    provider: 'openai',
    model: data.model,
    usage: data.usage,
  };
}

async function callClaude(messages: AIMessage[], config: AIConfig): Promise<AIResponse> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey || '',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: config.model || 'claude-3-5-sonnet-latest',
      system: config.systemPrompt,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      temperature: config.temperature || 0.7,
      max_tokens: config.maxTokens || 2048,
    }),
  });

  if (!response.ok) {
    throw new Error(`Claude API错误: ${response.status}`);
  }

  const data = await response.json();
  return {
    content: data.content[0].text,
    provider: 'claude',
    model: data.model,
    usage: {
      promptTokens: data.usage.input_tokens,
      completionTokens: data.usage.output_tokens,
      totalTokens: data.usage.input_tokens + data.usage.output_tokens,
    },
  };
}

async function callZhipu(messages: AIMessage[], config: AIConfig): Promise<AIResponse> {
  const baseUrl = config.baseUrl || 'https://open.bigmodel.cn/api/paas/v4';
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model || 'glm-4-air',
      messages: [{ role: 'system', content: config.systemPrompt }, ...messages],
      temperature: config.temperature || 0.7,
      max_tokens: config.maxTokens || 2048,
    }),
  });

  if (!response.ok) {
    throw new Error(`智谱AI API错误: ${response.status}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    provider: 'zhipu',
    model: data.model,
  };
}

async function callErnie(messages: AIMessage[], config: AIConfig): Promise<AIResponse> {
  const baseUrl = config.baseUrl || 'https://qianfan.baidubce.com/v2/chat/completions';
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model || 'ernie-3.5-8k',
      messages: [{ role: 'system', content: config.systemPrompt }, ...messages],
      temperature: config.temperature || 0.7,
      max_tokens: config.maxTokens || 2048,
    }),
  });

  if (!response.ok) {
    throw new Error(`文心一言 API错误: ${response.status}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    provider: 'ernie',
    model: data.model,
  };
}

async function callDashscope(messages: AIMessage[], config: AIConfig): Promise<AIResponse> {
  const baseUrl = config.baseUrl || 'https://dashscope.aliyuncs.com/api/v1';
  const response = await fetch(`${baseUrl}/services/aigc/text-generation/generation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model || 'qwen-plus',
      input: {
        messages: [{ role: 'system', content: config.systemPrompt }, ...messages],
      },
      parameters: {
        temperature: config.temperature || 0.7,
        max_tokens: config.maxTokens || 2048,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`通义千问 API错误: ${response.status}`);
  }

  const data = await response.json();
  return {
    content: data.output.text,
    provider: 'dashscope',
    model: data.model,
  };
}
