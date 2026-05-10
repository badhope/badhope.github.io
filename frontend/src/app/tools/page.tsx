import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tools = [
  { slug: "qr-generator", name: "二维码生成", description: "生成任意内容的二维码", icon: "📱", category: "工具" },
  { slug: "json-formatter", name: "JSON 格式化", description: "JSON 格式化、压缩、验证", icon: "📋", category: "开发者" },
  { slug: "password-generator", name: "密码生成器", description: "生成安全的随机密码", icon: "🔐", category: "安全" },
  { slug: "base64-codec", name: "Base64 编解码", description: "Base64 编码和解码", icon: "🔤", category: "开发者" },
  { slug: "regex-tester", name: "正则测试器", description: "测试和调试正则表达式", icon: "🎯", category: "开发者" },
  { slug: "url-shortener", name: "URL 缩短", description: "创建短链接", icon: "🔗", category: "工具" },
  { slug: "timestamp", name: "时间戳转换", description: "Unix 时间戳转换工具", icon: "⏰", category: "开发者" },
  { slug: "uuid-generator", name: "UUID 生成器", description: "生成 UUID", icon: "🎲", category: "开发者" },
  { slug: "color-picker", name: "颜色选择器", description: "取色器和调色板", icon: "🎨", category: "设计" },
];

const categories = ["全部", "开发者", "工具", "安全", "设计"];

const categoryColors: Record<string, string> = {
  "全部": "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  "开发者": "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  "工具": "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
  "安全": "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  "设计": "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            在线工具
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            实用的在线工具，无需下载安装，打开浏览器即可使用
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat, index) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                index === 0
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
                  : categoryColors[cat]
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group">
              <Card className="h-full hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {tool.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-1 truncate">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                        {tool.description}
                      </p>
                      <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${categoryColors[tool.category]}`}>
                        {tool.category}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
