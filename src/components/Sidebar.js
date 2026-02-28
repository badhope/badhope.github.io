'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Star, X, Search, Home, FileText, Briefcase, Wrench, Github, BookOpen } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // 导航链接数据
  const navLinks = [
    { href: '/', label: '首页', icon: <Home size={18} /> },
    { href: '/resume', label: '个人简历', icon: <FileText size={18} /> },
    { href: '/works', label: '作品集', icon: <Briefcase size={18} /> },
    { href: '/tools', label: '工具补给站', icon: <Wrench size={18} /> },
  ];

  return (
    <>
      {/* 1. 左上角触发按钮 - 星星图标 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-50 text-neon-cyan hover:rotate-180 transition-transform duration-500 focus:outline-none"
        aria-label="打开导航"
      >
        <Star size={32} fill="#64ffda" />
      </button>

      {/* 2. 侧边栏主体 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 遮罩层 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* 抽屉面板 */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-80 bg-space-card border-r border-space-border shadow-2xl z-50 flex flex-col p-6"
            >
              {/* 头部：关闭按钮 */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-white">导航中心</h2>
                <button onClick={() => setIsOpen(false)} className="text-text-light hover:text-neon-cyan">
                  <X size={24} />
                </button>
              </div>

              {/* 搜索框 */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={18} />
                <input
                  type="text"
                  placeholder="搜索工具/文章..."
                  className="w-full bg-space-bg border border-space-border rounded py-2 pl-10 pr-4 text-text-main focus:outline-none focus:border-neon-cyan transition-colors"
                />
              </div>

              {/* 快速入口卡片 */}
              <div className="space-y-3 mb-8">
                <Link href="/works" onClick={() => setIsOpen(false)} className="block bg-space-bg p-4 rounded border border-transparent hover:border-neon-cyan transition-all group">
                  <div className="flex items-center gap-3">
                    <Github className="text-neon-cyan" />
                    <div>
                      <h3 className="font-bold text-white group-hover:text-neon-cyan">开源项目</h3>
                      <p className="text-xs text-text-light">GitHub 实时动态</p>
                    </div>
                  </div>
                </Link>
                <Link href="/works" onClick={() => setIsOpen(false)} className="block bg-space-bg p-4 rounded border border-transparent hover:border-neon-cyan transition-all group">
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-neon-cyan" />
                    <div>
                      <h3 className="font-bold text-white group-hover:text-neon-cyan">技术博客</h3>
                      <p className="text-xs text-text-light">CSDN / 掘金精选</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* 主导航列表 */}
              <nav className="flex-1">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-3 rounded hover:bg-space-bg text-text-light hover:text-neon-cyan transition-colors"
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* 底部信息 */}
              <div className="pt-4 border-t border-space-border text-xs text-text-light">
                <p>© 2026 熊泽城</p>
                <p>AI 时代的探索者</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
