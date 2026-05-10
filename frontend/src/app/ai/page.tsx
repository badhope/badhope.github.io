import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/ui/header";

const aiModels = [
  { name: "ChatGPT", provider: "OpenAI", description: "强大的对话AI", icon: "🤖", gradient: "from-green-500 to-emerald-500" },
  { name: "Claude", provider: "Anthropic", description: "擅长分析和写作", icon: "🧠", gradient: "from-orange-500 to-amber-500" },
  { name: "Gemini", provider: "Google", description: "多模态AI助手", icon: "✨", gradient: "from-blue-500 to-violet-500" },
  { name: "文心一言", provider: "百度", description: "百度AI大模型", icon: "📝", gradient: "from-pink-500 to-rose-500" },
];

export default function AIPage() {
  return (
    <div>
      <Header />
      <main className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">AI 助手</h1>
          <p className="text-gray-500 mb-10">多模型智能对话</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {aiModels.map((model) => (
              <Card key={model.name} className="hover:shadow-lg transition-all cursor-pointer group overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${model.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                      {model.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold group-hover:text-[#FF8C42] transition-colors">{model.name}</h3>
                      <span className="text-xs font-medium text-gray-500">{model.provider}</span>
                      <p className="text-sm text-gray-500 mt-2">{model.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
