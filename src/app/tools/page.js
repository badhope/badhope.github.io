'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink } from 'lucide-react';
import { toolsData } from '@/data/toolsData';

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // 过滤逻辑：搜索所有分类下的链接
  const filteredData = toolsData.map(category => {
    const filteredLinks = category.links.filter(link => 
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...category, links: filteredLinks };
  }).filter(category => category.links.length > 0);

  return (
    <div className="min-h-screen bg-space-bg text-text-main px-4 py-24 md:px-8 lg:px-16">
      {/* 页面标题 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">工具补给站</h1>
        <p className="text-text-light text-lg">为技术探索者准备的精选导航库</p>
      </div>

      {/* 搜索栏 */}
      <div className="max-w-2xl mx-auto mb-16 sticky top-4 z-10 bg-space-card/80 backdrop-blur-md p-2 rounded-full border border-space-border shadow-lg">
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-neon-cyan" size={20} />
          <input
            type="text"
            placeholder="搜索工具 (如: Python, AI, 知乎...)"
            className="w-full bg-transparent py-3 pl-12 pr-4 text-white focus:outline-none placeholder-text-light"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 分类网格 */}
      <div className="space-y-12">
        {filteredData.map((category, catIndex) => (
          <div key={catIndex}>
            {/* 分类标题 */}
            <h2 className="text-2xl font-bold text-neon-cyan mb-6 flex items-center gap-2 border-b border-space-border pb-2">
              <span>{category.icon}</span> {category.category}
            </h2>

            {/* 链接卡片网格 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.links.map((link, linkIndex) => (
                <motion.a
                  key={linkIndex}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: linkIndex * 0.05 }}
                  className="group block bg-space-card p-5 rounded-lg border border-space-border hover:border-neon-cyan transition-all duration-300 hover:bg-space-bg hover:shadow-[0_0_15px_rgba(100,255,218,0.1)]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white group-hover:text-neon-cyan truncate">{link.name}</h3>
                    <ExternalLink size={14} className="text-text-light group-hover:text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-text-light truncate">{link.desc}</p>
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 空状态提示 */}
      {filteredData.length === 0 && (
        <div className="text-center text-text-light mt-20">
          <p>没有找到相关工具，换个关键词试试？</p>
        </div>
      )}
    </div>
  );
}
