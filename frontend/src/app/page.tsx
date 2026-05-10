import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  { icon: "🛠️", title: "在线工具", description: "二维码、JSON、密码等工具", href: "/tools", gradient: "from-orange-500 to-amber-500" },
  { icon: "📦", title: "资源导航", description: "精选网站与工具收藏", href: "/resources", gradient: "from-teal-500 to-cyan-500" },
  { icon: "🤖", title: "AI 助手", description: "多模型智能对话", href: "/ai", gradient: "from-violet-500 to-purple-500" },
];

const quickTools = [
  { name: "二维码", icon: "📱", slug: "qr-generator" },
  { name: "JSON", icon: "📋", slug: "json-formatter" },
  { name: "密码", icon: "🔐", slug: "password-generator" },
  { name: "Base64", icon: "🔤", slug: "base64-codec" },
  { name: "正则", icon: "🎯", slug: "regex-tester" },
  { name: "短链接", icon: "🔗", slug: "url-shortener" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-teal-50" />
        <div className="absolute top-10 left-10 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-teal-200/30 rounded-full blur-3xl" />
        
        <div className="container relative px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-orange-100 text-xs sm:text-sm font-medium text-orange-600 mb-6 sm:mb-8">
              <span>👋</span>
              <span>欢迎来到 BadHope's Hub</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-teal-600 bg-clip-text text-transparent">
                你的效率工作台
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4">
              集合在线工具、AI助手、资源导航于一体的个人工具站
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link href="/tools">
                <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8">
                  开始探索
                </Button>
              </Link>
              <Link href="/ai/chat">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8">
                  体验 AI
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-12">
            核心功能
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <CardContent className="p-5 sm:p-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-5 shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="container px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12 max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              常用工具
            </h2>
            <Link href="/tools">
              <Button variant="ghost" className="text-sm">
                查看全部 →
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {quickTools.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                <Card className="hover:shadow-md transition-all duration-200 cursor-pointer">
                  <CardContent className="p-4 sm:p-5 text-center">
                    <div className="text-3xl sm:text-4xl mb-2">{tool.icon}</div>
                    <div className="text-xs sm:text-sm font-medium truncate">{tool.name}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="container px-4">
          <Card className="bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 max-w-4xl mx-auto overflow-hidden">
            <CardContent className="py-10 sm:py-12 md:py-16 px-6 sm:px-8 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white">
                准备好提升效率了吗？
              </h2>
              <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base">
                探索更多工具，发现更多可能
              </p>
              <Link href="/tools">
                <Button size="lg" variant="secondary" className="text-sm sm:text-base">
                  立即体验
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
