import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-12">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl mb-6 mx-auto">
          🚀
        </div>
        <h1 className="text-3xl font-bold mb-2 text-text-primary dark:text-text-dark">
          About Me
        </h1>
        <p className="text-text-secondary">
          全栈开发者 · AI 探索者
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-text-primary dark:text-text-dark">
            👋 你好
          </h2>
          <p className="text-text-secondary leading-relaxed">
            我是一名热爱技术的学生开发者，喜欢探索新事物，
            致力于用代码解决实际问题。目前专注于全栈开发和 AI 技术。
          </p>
          <p className="text-text-secondary leading-relaxed">
            这个网站是我的个人工具站，集合了各种实用的在线工具、
            AI 助手和资源导航，希望能对你有所帮助。
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-text-primary dark:text-text-dark">
            🛠️ 技术栈
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js", "React", "TypeScript", "Python", "FastAPI",
              "Node.js", "PostgreSQL", "Docker", "Tailwind CSS",
              "Git", "Linux"
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-text-primary dark:text-text-dark">
            📬 联系方式
          </h2>
          <div className="space-y-3">
            <a
              href="https://github.com/badhope"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
            >
              <span>🐙</span>
              <span>GitHub</span>
            </a>
            <a
              href="https://blog.csdn.net/weixin_56622231"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
            >
              <span>📚</span>
              <span>CSDN</span>
            </a>
            <a
              href="https://juejin.cn/user/2350111542479753"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
            >
              <span>💎</span>
              <span>掘金</span>
            </a>
            <a
              href="mailto:x18825407105@outlook.com"
              className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
            >
              <span>📧</span>
              <span>x18825407105@outlook.com</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
