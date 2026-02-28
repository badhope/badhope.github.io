'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, Briefcase } from 'lucide-react';
// 导入自动生成的名言数据
import quoteData from '@/data/quote.json';

export default function HeroSection() {
  // 1. 动态标签逻辑
  const tags = [
    "AI时代的探索者",
    "活跃的技术开发者",
    "积极的开源贡献参与者"
  ];
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTag = tags[currentTagIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTag.length) {
          setDisplayText(currentTag.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTagIndex((prev) => (prev + 1) % tags.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTagIndex, tags]);

  // 2. 名人名言逻辑
  // 如果 json 数据存在则使用，否则使用备用
  const quote = quoteData && quoteData.content 
    ? `"${quoteData.content}" — ${quoteData.author}` 
    : "“未来的技术定会愈发先进。” — 熊泽城";

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
      {/* 标题：熊泽城 */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wider"
      >
        熊泽城
      </motion.h1>

      {/* 动态标签 */}
      <div className="h-10 mb-12">
        <motion.p
          key={currentTagIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl md:text-2xl text-neon-cyan font-mono"
        >
          {displayText}
          <span className="animate-pulse">|</span>
        </motion.p>
      </div>

      {/* 按钮组 */}
      <div className="flex flex-col md:flex-row gap-6 mb-16">
        <Link href="/resume">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(100, 255, 218, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-4 bg-neon-cyan text-space-bg font-bold rounded-full hover:bg-white transition-colors"
          >
            <FileText size={20} /> 查看简历
          </motion.button>
        </Link>
        <Link href="/works">
          <motion.button
            whileHover={{ scale: 1.05, borderColor: '#64ffda' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-4 border-2 border-text-light text-text-main font-bold rounded-full hover:text-neon-cyan transition-colors"
          >
            <Briefcase size={20} /> 查看作品
          </motion.button>
        </Link>
      </div>

      {/* 名人名言模块 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 max-w-xl p-4 bg-space-card/50 backdrop-blur-sm rounded-lg border border-space-border text-text-light text-sm italic"
      >
        {quote}
      </motion.div>
    </div>
  );
}
