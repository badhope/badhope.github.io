import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: "🛠️",
    title: "在线工具",
    description: "二维码生成、JSON格式化、密码生成等实用工具",
    href: "/tools",
    color: "from-orange-400 to-red-400",
  },
  {
    icon: "📦",
    title: "资源导航",
    description: "收藏夹、工具导航、学习资源一网打尽",
    href: "/resources",
    color: "from-cyan-400 to-blue-400",
  },
  {
    icon: "🤖",
    title: "AI 助手",
    description: "多模型 AI 对话，支持 GPT、DeepSeek、通义千问等",
    href: "/ai",
    color: "from-purple-400 to-pink-400",
  },
];

const recentTools = [
  { name: "二维码生成", icon: "📱", slug: "qr-generator" },
  { name: "JSON 格式化", icon: "{ }", slug: "json-formatter" },
  { name: "密码生成器", icon: "🔐", slug: "password-generator" },
  { name: "Base64 编解码", icon: "🔤", slug: "base64-codec" },
  { name: "正则测试", icon: "🎯", slug: "regex-tester" },
  { name: "URL 缩短", icon: "🔗", slug: "url-shortener" },
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <span>👋</span>
          <span>欢迎来到 BadHope's Hub</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary dark:text-text-dark">
          你的效率工作台
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
          集合在线工具、AI助手、资源导航于一体的个人工具站，
          让你的工作和生活更加高效
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/tools">
            <Button size="lg">开始探索</Button>
          </Link>
          <Link href="/ai">
            <Button variant="outline" size="lg">体验 AI</Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-text-primary dark:text-text-dark">
          核心功能
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Tools */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark">
            常用工具
          </h2>
          <Link href="/tools">
            <Button variant="ghost">查看全部 →</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recentTools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <div className="text-sm font-medium text-text-primary dark:text-text-dark">
                    {tool.name}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
          <CardContent className="py-12">
            <h2 className="text-2xl font-bold mb-4 text-text-primary dark:text-text-dark">
              准备好提升效率了吗？
            </h2>
            <p className="text-text-secondary mb-6">
              探索更多工具，发现更多可能
            </p>
            <Link href="/tools">
              <Button size="lg">立即体验 →</Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
