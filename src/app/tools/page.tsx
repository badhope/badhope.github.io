'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './page.module.css';

const iconMap: Record<string, string> = {
  'VS Code': '💻',
  'Figma': '🎨',
  'GitHub': '🐙',
  'Vercel': '▲',
  'Docker': '🐳',
  'Postman': '📮',
  'Notion': '📝',
  'Linear': '📊',
};

const categoryIds = ['all', 'editor', 'design', 'deploy', 'devops', 'other'] as const;
type CategoryId = typeof categoryIds[number];

export default function ToolsPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className={styles.main}>
        <ParticleBackground />
        <Navigation />
        <div className={styles.loading}>Loading...</div>
      </main>
    );
  }

  const tools = t.tools;
  const categoryKey = activeCategory === 'all' ? 'all' : activeCategory;

  const filteredTools = activeCategory === 'all'
    ? tools.tools
    : tools.tools.filter((_, i) => {
        const originalCategories = ['editor', 'design', 'devops', 'deploy', 'devops', 'other'];
        return originalCategories[i] === activeCategory;
      });

  return (
    <main className={styles.main}>
      <ParticleBackground />
      <Navigation />

      <section className={styles.hero}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.gradientText}>{tools.title}</span>
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tools.subtitle}
        </motion.p>
      </section>

      <section id="tools" className={styles.section}>
        <div className={styles.categories}>
          {categoryIds.map((cat) => (
            <motion.button
              key={cat}
              className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tools.categories[cat]}
            </motion.button>
          ))}
        </div>

        <motion.div
          className={styles.grid}
          layout
        >
          {filteredTools.map((tool, i) => (
            <motion.a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.toolCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -5, borderColor: 'rgba(0, 212, 255, 0.5)' }}
            >
              <span className={styles.toolIcon}>{iconMap[tool.name] || '🔧'}</span>
              <h3 className={styles.toolName}>{tool.name}</h3>
              <p className={styles.toolDescription}>{tool.description}</p>
              <span className={styles.toolLink}>
                {tools.tryIt} →
              </span>
            </motion.a>
          ))}
        </motion.div>
      </section>

      <footer className={styles.footer}>
        <p>© 2026 badhope. {language === 'zh' ? '版权所有' : 'All rights reserved.'}</p>
      </footer>
    </main>
  );
}