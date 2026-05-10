import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const aiTools = [
  {
    icon: "💬",
    name: "AI 对话",
    description: "与 AI 进行自然语言对话，支持多种模型",
    href: "/ai/chat",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    icon: "📝",
    name: "文本处理",
    description: "文本摘要、翻译、改写等",
    href: "/ai/text",
    gradient: "from-blue-400 to-cyan-400",
    comingSoon: true,
  },
  {
    icon: "🤖",
    name: "代码助手",
    description: "代码解释、生成、调试",
    href: "/ai/code",
    gradient: "from-green-400 to-emerald-400",
    comingSoon: true,
  },
];

export default function AIPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
          <span>🤖</span>
          <span>AI 能力</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-text-primary dark:text-text-dark">
          AI 工具集
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          集成多种 AI 模型，为你提供智能对话、文本处理、代码助手等服务
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {aiTools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card className={`h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer relative ${tool.comingSoon ? 'opacity-75' : ''}`}>
              {tool.comingSoon && (
                <div className="absolute top-4 right-4 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                  即将上线
                </div>
              )}
              <CardHeader>
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-3xl mb-4`}
                >
                  {tool.icon}
                </div>
                <CardTitle>{tool.name}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-none">
        <CardContent className="py-8 text-center">
          <h3 className="text-lg font-semibold mb-2 text-text-primary dark:text-text-dark">
            支持的 AI 模型
          </h3>
          <p className="text-text-secondary mb-4">
            OpenAI · DeepSeek · 通义千问 · 智谱 GLM
          </p>
          <p className="text-sm text-text-muted">
            使用前请在设置中配置相应的 API Key
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
