import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: "🛠️",
    title: "在线工具",
    description: "二维码生成、JSON格式化、密码生成等实用工具，打开即用",
    href: "/tools",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: "📦",
    title: "资源导航",
    description: "精选网站与工具收藏，分类整理，快速访问",
    href: "/resources",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    icon: "🤖",
    title: "AI 助手",
    description: "多模型智能对话，支持 GPT、DeepSeek、通义千问等",
    href: "/ai",
    gradient: "from-violet-500 to-purple-500",
  },
];

const quickTools = [
  { name: "二维码生成", icon: "📱", slug: "qr-generator", desc: "生成二维码" },
  { name: "JSON 格式化", icon: "📋", slug: "json-formatter", desc: "格式化JSON" },
  { name: "密码生成器", icon: "🔐", slug: "password-generator", desc: "安全密码" },
  { name: "Base64 编解码", icon: "🔤", slug: "base64-codec", desc: "编解码" },
  { name: "正则测试", icon: "🎯", slug: "regex-tester", desc: "测试正则" },
  { name: "URL 缩短", icon: "🔗", slug: "url-shortener", desc: "短链接" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-teal-50 dark:from-orange-950/20 dark:via-transparent dark:to-teal-950/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/30 dark:bg-teal-500/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-orange-100 dark:border-orange-900/50 text-sm font-medium text-orange-600 dark:text-orange-400 mb-8 animate-fade-in-up">
              <span className="text-lg">👋</span>
              <span>欢迎来到 BadHope&apos;s Hub</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 animate-fade-in-up animation-delay-100 text-balance">
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-teal-600 bg-clip-text text-transparent">
                你的效率工作台
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-200 leading-relaxed">
              集合在线工具、AI助手、资源导航于一体的个人工具站，<br className="hidden md:block" />
              让你的工作和生活更加高效
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
              <Link href="/tools">
                <Button size="lg" className="px-8 py-6 text-base font-semibold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all">
                  开始探索
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link href="/ai/chat">
                <Button variant="outline" size="lg" className="px-8 py-6 text-base font-semibold rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                  体验 AI 对话
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-24 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              核心功能
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto">
              三大模块，覆盖你的日常需求
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={feature.href} href={feature.href} className="group">
                <Card className="h-full hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <CardHeader className="p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tools */}
      <section className="py-20 md:py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                常用工具
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                精选实用工具，一键直达
              </p>
            </div>
            <Link href="/tools">
              <Button variant="ghost" className="text-base font-medium group">
                查看全部
                <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickTools.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border-0 bg-white dark:bg-gray-800 group">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                      {tool.icon}
                    </div>
                    <div className="font-semibold text-sm mb-1">
                      {tool.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {tool.desc}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24">
        <div className="container">
          <Card className="bg-gradient-to-br from-orange-500 via-amber-500 to-teal-500 border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWOGgydjh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
            <CardContent className="py-16 md:py-20 text-center relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                准备好提升效率了吗？
              </h2>
              <p className="text-white/90 mb-8 text-lg max-w-xl mx-auto">
                探索更多工具，发现更多可能
              </p>
              <Link href="/tools">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 text-base font-semibold rounded-xl shadow-xl">
                  立即体验
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
