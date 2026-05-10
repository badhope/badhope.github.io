import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/ui/header";

const resources = [
  { name: "GitHub", description: "全球最大的代码托管平台", url: "https://github.com", category: "开发", icon: "🐙" },
  { name: "MDN Web Docs", description: "Mozilla 开发的Web开发文档", url: "https://developer.mozilla.org", category: "文档", icon: "📚" },
  { name: "Stack Overflow", description: "程序员问答社区", url: "https://stackoverflow.com", category: "社区", icon: "💬" },
  { name: "Vercel", description: "前端部署平台", url: "https://vercel.com", category: "部署", icon: "▲" },
  { name: "Tailwind CSS", description: "实用优先的CSS框架", url: "https://tailwindcss.com", category: "框架", icon: "🎨" },
  { name: "Figma", description: "在线协作设计工具", url: "https://figma.com", category: "设计", icon: "✏️" },
];

export default function ResourcesPage() {
  return (
    <div>
      <Header />
      <main className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">资源导航</h1>
          <p className="text-gray-500 mb-10">精选网站与工具收藏</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer group overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-teal-100 flex items-center justify-center text-2xl">
                        {resource.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-[#4ECDC4] bg-teal-50 px-2 py-1 rounded-full">{resource.category}</span>
                        <h3 className="text-lg font-bold mt-2 mb-1 group-hover:text-[#FF8C42] transition-colors">{resource.name}</h3>
                        <p className="text-sm text-gray-500 truncate">{resource.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
