import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { name: "GitHub", icon: "🐙", url: "https://github.com/badhope" },
  { name: "CSDN", icon: "📚", url: "https://blog.csdn.net/weixin_56622231" },
  { name: "掘金", icon: "💎", url: "https://juejin.cn/user/2350111542479753" },
  { name: "邮箱", icon: "📧", url: "mailto:x18825407105@outlook.com" },
];

const techStack = [
  { name: "Next.js" },
  { name: "React" },
  { name: "TypeScript" },
  { name: "Python" },
  { name: "FastAPI" },
  { name: "Node.js" },
  { name: "PostgreSQL" },
  { name: "Docker" },
  { name: "Tailwind" },
  { name: "Git" },
  { name: "Linux" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-3 sm:px-4 py-8 md:py-12 max-w-2xl lg:max-w-3xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-teal-500 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 mx-auto shadow-xl">
            🚀
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">
            About Me
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            全栈开发者 · AI 探索者
          </p>
        </div>

        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span>👋</span> 你好
            </h2>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                我是一名热爱技术的学生开发者，喜欢探索新事物，致力于用代码解决实际问题。目前专注于全栈开发和 AI 技术。
              </p>
              <p>
                这个网站是我的个人工具站，集合了各种实用的在线工具、AI 助手和资源导航，希望能对你有所帮助。
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 text-gray-900 dark:text-white flex items-center gap-2">
              <span>🛠️</span> 技术栈
            </h2>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs sm:text-sm font-medium"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 text-gray-900 dark:text-white flex items-center gap-2">
              <span>📬</span> 联系方式
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 py-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <span className="text-lg sm:text-xl">{link.icon}</span>
                  <span className="font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
