import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    name: "开发工具",
    icon: "🛠️",
    slug: "dev-tools",
    count: 12,
    description: "IDE、编辑器、插件",
  },
  {
    name: "AI 资源",
    icon: "🤖",
    slug: "ai-resources",
    count: 8,
    description: "AI 模型、工具、学习资料",
  },
  {
    name: "设计资源",
    icon: "🎨",
    slug: "design",
    count: 6,
    description: "设计工具、素材网站",
  },
  {
    name: "学习平台",
    icon: "📚",
    slug: "learning",
    count: 10,
    description: "在线课程、文档网站",
  },
  {
    name: "效率工具",
    icon: "⚡",
    slug: "productivity",
    count: 7,
    description: "效率软件、浏览器插件",
  },
  {
    name: "生活服务",
    icon: "🏠",
    slug: "life",
    count: 5,
    description: "生活相关的实用网站",
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-text-primary dark:text-text-dark">
          资源导航
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          收藏的常用网站和工具，按分类整理，方便快速访问
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/resources/${cat.slug}`}>
            <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-lg text-text-primary dark:text-text-dark">
                        {cat.name}
                      </h3>
                      <span className="text-xs text-text-muted bg-muted-light dark:bg-muted-dark px-2 py-1 rounded-full">
                        {cat.count}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="bg-muted-light dark:bg-muted-dark border-none">
        <CardContent className="py-8 text-center">
          <p className="text-text-secondary mb-4">
            登录后可添加和管理你自己的收藏
          </p>
          <Link href="/login">
            <span className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors">
              登录 / 注册
            </span>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
