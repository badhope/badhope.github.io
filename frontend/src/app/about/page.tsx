import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { name: "GitHub", icon: "🐙", url: "https://github.com/badhope", color: "hover:text-gray-900 dark:hover:text-white" },
  { name: "CSDN", icon: "📚", url: "https://blog.csdn.net/weixin_56622231", color: "hover:text-orange-600" },
  { name: "掘金", icon: "💎", url: "https://juejin.cn/user/2350111542479753", color: "hover:text-blue-500" },
  { name: "邮箱", icon: "📧", url: "mailto:x18825407105@outlook.com", color: "hover:text-teal-500" },
];

const techStack = [
  { name: "Next.js", color: "bg-gray-900 text-white dark:bg-white dark:text-gray-900" },
  { name: "React", color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300" },
  { name: "TypeScript", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300" },
  { name: "Python", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300" },
  { name: "FastAPI", color: "bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300" },
  { name: "Node.js", color: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" },
  { name: "PostgreSQL", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300" },
  { name: "Docker", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300" },
  { name: "Tailwind CSS", color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300" },
  { name: "Git", color: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300" },
  { name: "Linux", color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-12">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-teal-500 flex items-center justify-center text-5xl mb-6 mx-auto shadow-xl shadow-orange-500/20">
            🚀
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            About Me
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            全栈开发者 · AI 探索者
          </p>
        </div>

        <Card className="mb-6 border border-gray-100 dark:border-gray-700/50 overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span>👋</span> 你好
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                我是一名热爱技术的学生开发者，喜欢探索新事物，致力于用代码解决实际问题。目前专注于全栈开发和 AI 技术。
              </p>
              <p>
                这个网站是我的个人工具站，集合了各种实用的在线工具、AI 助手和资源导航，希望能对你有所帮助。
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border border-gray-100 dark:border-gray-700/50 overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-5 text-gray-900 dark:text-white flex items-center gap-2">
              <span>🛠️</span> 技术栈
            </h2>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${tech.color}`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border border-gray-100 dark:border-gray-700/50 overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-5 text-gray-900 dark:text-white flex items-center gap-2">
              <span>📬</span> 联系方式
            </h2>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 py-2 text-gray-600 dark:text-gray-400 transition-colors ${link.color}`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="font-medium">{link.name}</span>
                  {link.name === "邮箱" && (
                    <span className="text-sm text-gray-400 dark:text-gray-500 ml-2 truncate">
                      x18825407105@outlook.com
                    </span>
                  )}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
