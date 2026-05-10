import { Header } from "@/components/ui/header";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">关于我</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardContent className="text-center py-8">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-teal-400 flex items-center justify-center text-5xl mb-4">
                    👨‍💻
                  </div>
                  <h2 className="text-xl font-bold">BadHope</h2>
                  <p className="text-gray-500 text-sm mt-1">全栈开发者</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardContent className="py-6">
                  <h3 className="text-lg font-bold mb-4">简介</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    你好！我是 BadHope，一名热爱技术的全栈开发者。这个网站是我个人的工具站，
                    收集了我日常使用的各种工具和资源，希望对你也有帮助。
                  </p>
                  
                  <h3 className="text-lg font-bold mb-4">技能</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "Node.js", "Python", "TypeScript", "Tailwind CSS"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-orange-50 text-[#FF8C42] rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
