'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import CosmicParticleBackground from '@/components/effects/CosmicParticleBackground';
import FloatingParticles from '@/components/effects/FloatingParticles';
import styles from './auth.module.css';

export default function AuthPage() {
  const { language, setLanguage } = useLanguage();
  const isZh = language === 'zh';
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className={styles.page}>
      <CosmicParticleBackground preset="nebula" intensity="low" />
      <FloatingParticles />
      
      {/* Language toggle */}
      <div className={styles.langToggle}>
        <button className={language === 'zh' ? styles.langActive : ''} onClick={() => setLanguage('zh')}>🇨🇳 中文</button>
        <button className={language === 'en' ? styles.langActive : ''} onClick={() => setLanguage('en')}>🇺🇸 EN</button>
      </div>

      {/* Dev banner */}
      <div className={styles.devBanner}>
        <span className={styles.devIcon}>🚧</span>
        <span className={styles.devText}>
          {isZh ? '🔒 此功能正在开发中，敬请期待...' : '🔒 This feature is under development. Stay tuned...'}
        </span>
      </div>

      {/* Auth card */}
      <div className={styles.authContainer}>
        <motion.div
          className={styles.authCard}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        >
          {/* Logo */}
          <motion.div
            className={styles.logo}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            ⭐
          </motion.div>

          <h1 className={styles.title}>badhope</h1>
          <p className={styles.subtitle}>
            {isZh ? '探索代码与创意的宇宙' : 'Exploring the universe of code and creativity'}
          </p>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
              onClick={() => setMode('login')}
            >
              {isZh ? '登录' : 'Sign In'}
            </button>
            <button
              className={`${styles.tab} ${mode === 'register' ? styles.tabActive : ''}`}
              onClick={() => setMode('register')}
            >
              {isZh ? '注册' : 'Sign Up'}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                {isZh ? '📧 邮箱' : '📧 Email'}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.input}
                placeholder={isZh ? 'your@email.com' : 'your@email.com'}
                disabled
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                {isZh ? '🔐 密码' : '🔐 Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={styles.input}
                placeholder={isZh ? '••••••••' : '••••••••'}
                disabled
              />
            </div>

            <motion.button
              type="submit"
              className={styles.submitBtn}
              disabled
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className={styles.spinner}>⟳</span>
              ) : mode === 'login' ? (
                isZh ? '🔒 登录' : '🔒 Sign In'
              ) : (
                isZh ? '🔒 注册' : '🔒 Sign Up'
              )}
            </motion.button>
          </form>

          {/* Social login */}
          <div className={styles.divider}>
            <span>{isZh ? '或继续使用' : 'or continue with'}</span>
          </div>

          <div className={styles.socialBtns}>
            <button className={styles.socialBtn} disabled>
              <span>🔵</span>
              Google
            </button>
            <button className={styles.socialBtn} disabled>
              <span>⚫</span>
              GitHub
            </button>
          </div>

          {/* Features preview */}
          <div className={styles.features}>
            <p className={styles.featuresTitle}>
              {isZh ? '✨ 即将上线功能' : '✨ Coming Soon'}
            </p>
            <div className={styles.featureList}>
              {[
                isZh ? '🔐 安全登录系统' : '🔐 Secure login system',
                isZh ? '📊 个人数据面板' : '📊 Personal dashboard',
                isZh ? '🔔 自定义通知' : '🔔 Custom notifications',
                isZh ? '📝 项目收藏夹' : '📝 Project favorites',
              ].map((f, i) => (
                <motion.div
                  key={f}
                  className={styles.featureItem}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {f}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Back to home */}
          <Link href="/" className={styles.backLink}>
            ← {isZh ? '返回首页' : 'Back to Home'}
          </Link>
        </motion.div>
      </div>

      {/* Decorative stars */}
      <div className={styles.stars}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
