import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const aiTools = [
  { icon: "💬", name: "AI 对话", description: "多模型智能对话", href: "/ai/chat", gradient: "from-violet-500 to-purple-500", status: "available" },
  { icon: "📝", name: "文本处理", description: "摘要、翻译、改写", href: "/ai/text", gradient: "from-blue-500 to-cyan-500", status: "coming" },
  { icon: "🤖", name: "代码助手", description: "代码解释、生成", href: "/ai/code", gradient: "from-green-500 to-emerald-500", status: "coming" },
];

export default function AIPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span>🤖</span>
            <span>AI 能力</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
            AI 工具集
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            集成多种 AI 模型，提供智能服务
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto mb-8 md:mb-12">
          {aiTools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Card className={`h-full transition-all duration-200 hover:-translate-y-0.5 cursor-pointer overflow-hidden relative ${tool.status === 'coming' ? 'opacity-75' : ''}`}>
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl sm:text-3xl shadow-lg mb-4 sm:mb-5`}>
                    {tool.icon}
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-white mb-1 sm:mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {tool.description}
                  </p>
                  {tool.status === "coming" && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 py-0.5 sm:py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs rounded-full">
                      即将上线
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-violet-100 dark:border-violet-900/30 max-w-3xl mx-auto">
          <CardContent className="py-6 sm:py-8 px-4 sm:px-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">
              支持的 AI 模型
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
              OpenAI · DeepSeek · 通义千问 · 智谱 GLM
            </p>
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
              使用前请在设置中配置 API Key
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
