import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/ui/header";

const tools = [
  { name: "二维码生成器", icon: "📱", description: "生成各种样式的二维码", category: "常用工具", gradient: "from-orange-500 to-amber-500" },
  { name: "JSON 格式化", icon: "📋", description: "美化、压缩、校验 JSON", category: "开发工具", gradient: "from-blue-500 to-cyan-500" },
  { name: "密码生成器", icon: "🔐", description: "生成强密码", category: "安全工具", gradient: "from-green-500 to-emerald-500" },
  { name: "Base64 编解码", icon: "🔤", description: "文本与 Base64 互转", category: "常用工具", gradient: "from-purple-500 to-violet-500" },
  { name: "正则测试器", icon: "🎯", description: "在线测试正则表达式", category: "开发工具", gradient: "from-pink-500 to-rose-500" },
  { name: "短链接生成", icon: "🔗", description: "生成短链接", category: "常用工具", gradient: "from-teal-500 to-cyan-500" },
];

export default function ToolsPage() {
  return (
    <div>
      <Header />
      <main className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">在线工具</h1>
          <p className="text-gray-500 mb-10">各种实用工具，提升工作效率</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Card key={tool.name} className="hover:shadow-lg transition-all cursor-pointer group overflow-hidden">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                    {tool.icon}
                  </div>
                  <span className="text-xs font-medium text-[#FF8C42] bg-orange-50 px-2 py-1 rounded-full">{tool.category}</span>
                  <h3 className="text-lg font-bold mt-3 mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-500">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
