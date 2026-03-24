'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '@/lib/knowledge-base';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './SkillBook.module.css';

interface SkillBookProps {
  className?: string;
}

export default function SkillBook({ className }: SkillBookProps) {
  const { t } = useLanguage();
  const skillBook = t.skillBook;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = Object.entries(skillCategories);

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{skillBook.title}</h3>
        <p className={styles.subtitle}>{skillBook.description}</p>
      </div>

      <div className={styles.grid}>
        {categories.map(([key, cat], index) => (
          <motion.div
            key={key}
            className={`${styles.categoryCard} ${activeCategory === key ? styles.active : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setActiveCategory(activeCategory === key ? null : key)}
          >
            <div className={styles.categoryHeader}>
              <span className={styles.categoryIcon}>{cat.icon}</span>
              <span className={styles.categoryName}>{cat.name}</span>
            </div>

            <div className={styles.skillTags}>
              {cat.skills.slice(0, activeCategory === key ? undefined : 3).map((skill, i) => (
                <motion.span
                  key={skill}
                  className={`${styles.skillTag} ${hoveredSkill === skill ? styles.hovered : ''}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {skill}
                </motion.span>
              ))}
              {cat.skills.length > 3 && activeCategory !== key && (
                <span className={styles.moreTag}>+{cat.skills.length - 3}</span>
              )}
            </div>

            <AnimatePresence>
              {activeCategory === key && (
                <motion.div
                  className={styles.expandedSkills}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {cat.skills.slice(3).map((skill, i) => (
                    <motion.span
                      key={skill}
                      className={styles.skillTag}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.dot}></span>
          点击卡片展开更多技能
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.ai}`}></span>
          AI相关技能
        </span>
      </div>
    </div>
  );
}
