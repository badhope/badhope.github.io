import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "开发工具", icon: "🛠️", slug: "dev-tools", count: 12, description: "IDE、编辑器、插件" },
  { name: "AI 资源", icon: "🤖", slug: "ai-resources", count: 8, description: "AI 模型、工具、学习资料" },
  { name: "设计资源", icon: "🎨", slug: "design", count: 6, description: "设计工具、素材网站" },
  { name: "学习平台", icon: "📚", slug: "learning", count: 10, description: "在线课程、文档网站" },
  { name: "效率工具", icon: "⚡", slug: "productivity", count: 7, description: "效率软件、浏览器插件" },
  { name: "生活服务", icon: "🏠", slug: "life", count: 5, description: "生活相关的实用网站" },
];

const categoryColors: Record<string, string> = {
  "开发工具": "from-blue-500 to-indigo-500",
  "AI 资源": "from-purple-500 to-pink-500",
  "设计资源": "from-pink-500 to-rose-500",
  "学习平台": "from-green-500 to-emerald-500",
  "效率工具": "from-yellow-500 to-orange-500",
  "生活服务": "from-teal-500 to-cyan-500",
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            资源导航
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            精选常用网站与工具，分类整理，方便快速访问
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/resources/${cat.slug}`} className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[cat.name]} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {cat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-base text-gray-900 dark:text-white truncate">
                          {cat.name}
                        </h3>
                        <span className="flex-shrink-0 text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          {cat.count}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-100 dark:border-orange-900/30">
          <CardContent className="py-8 px-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              登录后可添加和管理你自己的收藏
            </p>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25">
                登录 / 注册
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
