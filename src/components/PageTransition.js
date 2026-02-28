'use client';
import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// 加载中的骨架屏组件
export function SkeletonCard() {
  return (
    <div className="bg-space-card p-6 rounded-lg border border-space-border animate-pulse">
      <div className="h-4 bg-space-border rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-space-border rounded w-full mb-2"></div>
      <div className="h-3 bg-space-border rounded w-5/6"></div>
    </div>
  );
}
