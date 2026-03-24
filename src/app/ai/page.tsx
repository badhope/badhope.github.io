'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import AISettings from '@/components/ai/AISettings';
import SkillBook from '@/components/ai/SkillBook';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './page.module.css';

const AIChat = dynamic(() => import('@/components/ai/AIChat'), {
  ssr: false,
  loading: () => (
    <div className={styles.chatLoading}>
      <div className={styles.spinner} />
      <span></span>
    </div>
  ),
});

export default function AIPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={styles.page}>
        <div className={styles.background}>
          <div className={styles.gradientOrb1} />
          <div className={styles.gradientOrb2} />
        </div>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  const ai = t.aiChat;

  return (
    <div className={styles.page}>
      <div className={styles.background}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
      </div>

      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>
              <span className={styles.titleIcon}>🤖</span>
              {ai.title}
            </h1>
            <p className={styles.subtitle}>{ai.subtitle}</p>
          </div>

          <button
            className={`${styles.settingsBtn} ${aiEnabled ? styles.enabled : ''}`}
            onClick={() => setSettingsOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
            <span>{aiEnabled ? ai.configBtn.enabled : ai.configBtn.disabled}</span>
          </button>
        </header>

        <div className={styles.content}>
          <div className={styles.chatSection}>
            <AIChat />
          </div>

          <aside className={styles.sidebar}>
            <SkillBook />

            <div className={styles.features}>
              <h3 className={styles.featuresTitle}>{language === 'zh' ? '功能说明' : 'Features'}</h3>
              <ul className={styles.featuresList}>
                <li>
                  <span className={styles.featureIcon}>📚</span>
                  <span>{ai.features.knowledgeBase}</span>
                </li>
                <li>
                  <span className={styles.featureIcon}>🤖</span>
                  <span>{ai.features.multiModel}</span>
                </li>
                <li>
                  <span className={styles.featureIcon}>🔒</span>
                  <span>{ai.features.apiSecurity}</span>
                </li>
                <li>
                  <span className={styles.featureIcon}>🇨🇳</span>
                  <span>{ai.features.chineseFirst}</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </motion.div>

      <AISettings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onAIEnabledChange={setAiEnabled}
      />
    </div>
  );
}