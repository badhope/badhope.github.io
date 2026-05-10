import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200/50 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/25">
                B
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-gray-900 dark:text-white">Bad</span>
                <span className="text-orange-500">Hope</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              你的效率工作台，集合在线工具、AI助手、资源导航。
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">功能</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/tools" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
                在线工具
              </Link>
              <Link href="/resources" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
                资源导航
              </Link>
              <Link href="/ai" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
                AI 助手
              </Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">链接</h4>
            <nav className="flex flex-col gap-2">
              <a href="https://github.com/badhope" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
                GitHub
              </a>
              <a href="https://blog.csdn.net/weixin_56622231" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
                CSDN
              </a>
              <a href="https://juejin.cn/user/2350111542479753" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
                掘金
              </a>
            </nav>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">联系</h4>
            <nav className="flex flex-col gap-2">
              <a href="mailto:x18825407105@outlook.com" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
                邮箱
              </a>
              <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
                关于我
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200/50 dark:border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © {currentYear} BadHope. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1">
            Made with <span className="text-red-500">❤</span> using Next.js & FastAPI
          </p>
        </div>
      </div>
    </footer>
  );
}
