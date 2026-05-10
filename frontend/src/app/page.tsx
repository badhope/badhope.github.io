import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";

const features = [
  { icon: "🛠️", title: "在线工具", description: "二维码生成、JSON格式化等实用工具", href: "/tools", gradient: "from-orange-500 to-amber-500" },
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
    <div>
      <Header />
      <main>
        <section className="py-20 px-4 bg-gradient-to-br from-orange-50 via-white to-teal-50">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-orange-100 text-sm font-medium text-orange-600 mb-8">
              <span>👋</span>
              <span>欢迎来到 BadHope's Hub</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-teal-600 bg-clip-text text-transparent">
                你的效率工作台
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
              集合在线工具、AI助手、资源导航于一体的个人工具站
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/tools">
                <Button size="lg" className="w-full sm:w-auto">
                  开始探索
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  了解更多
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">核心功能</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Link key={feature.href} href={feature.href}>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer group">
                    <CardContent className="text-center py-8">
                      <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-3xl mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-500">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">快捷工具</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {quickTools.map((tool) => (
                <Card key={tool.slug} className="hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="text-center py-6">
                    <div className="text-3xl mb-3">{tool.icon}</div>
                    <div className="font-medium text-sm group-hover:text-[#FF8C42] transition-colors">{tool.name}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
