import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const tools = [
  {
    slug: "qr-generator",
    name: "二维码生成",
    description: "生成任意内容的二维码",
    icon: "📱",
    category: "工具",
  },
  {
    slug: "json-formatter",
    name: "JSON 格式化",
    description: "JSON 格式化、压缩、验证",
    icon: "{ }",
    category: "开发者",
  },
  {
    slug: "password-generator",
    name: "密码生成器",
    description: "生成安全的随机密码",
    icon: "🔐",
    category: "安全",
  },
  {
    slug: "base64-codec",
    name: "Base64 编解码",
    description: "Base64 编码和解码",
    icon: "🔤",
    category: "开发者",
  },
  {
    slug: "regex-tester",
    name: "正则测试器",
    description: "测试和调试正则表达式",
    icon: "🎯",
    category: "开发者",
  },
  {
    slug: "url-shortener",
    name: "URL 缩短",
    description: "创建短链接",
    icon: "🔗",
    category: "工具",
  },
  {
    slug: "timestamp",
    name: "时间戳转换",
    description: "Unix 时间戳转换工具",
    icon: "⏰",
    category: "开发者",
  },
  {
    slug: "uuid-generator",
    name: "UUID 生成器",
    description: "生成 UUID",
    icon: "🎲",
    category: "开发者",
  },
  {
    slug: "color-picker",
    name: "颜色选择器",
    description: "取色器和调色板",
    icon: "🎨",
    category: "设计",
  },
];

const categories = ["全部", "开发者", "工具", "安全", "设计"];

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-text-primary dark:text-text-dark">
          在线工具
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          实用的在线工具，无需下载安装，打开即可使用
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-muted-light dark:bg-muted-dark text-text-secondary hover:text-primary"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`}>
            <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{tool.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-text-primary dark:text-text-dark">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-text-secondary mb-2">
                      {tool.description}
                    </p>
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
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
  );
}
