'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import Comments from '@/components/ui/Comments';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './page.module.css';

const categoryData = [
  { name: 'Python', value: 35, color: '#00d4ff' },
  { name: 'Web开发', value: 28, color: '#bf5af2' },
  { name: 'AI/ML', value: 20, color: '#ff375f' },
  { name: '工具', value: 12, color: '#30d158' },
  { name: '其他', value: 5, color: '#ff9500' },
];

const monthlyViewsEn = [
  { month: 'Jan', views: 8500 },
  { month: 'Feb', views: 12000 },
  { month: 'Mar', views: 9800 },
  { month: 'Apr', views: 15000 },
  { month: 'May', views: 18500 },
  { month: 'Jun', views: 22000 },
];

const monthlyViewsZh = [
  { month: '1月', views: 8500 },
  { month: '2月', views: 12000 },
  { month: '3月', views: 9800 },
  { month: '4月', views: 15000 },
  { month: '5月', views: 18500 },
  { month: '6月', views: 22000 },
];

const platformStats = [
  { platform: 'CSDN', articles: 45, views: 125000, likes: 3200, icon: '📚', url: 'https://blog.csdn.net/weixin_56622231' },
  { platform: 'Juejin', articles: 38, views: 89000, likes: 2100, icon: '💎', url: 'https://juejin.cn/user/2350111542479753' },
];

export default function BlogPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={styles.page}>
        <Navigation />
        <main className={styles.main}>
          <div className={styles.loading}>Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  const blog = t.blog;
  const monthlyViews = language === 'zh' ? monthlyViewsZh : monthlyViewsEn;
  const categoryDataLocalized = language === 'zh'
    ? categoryData
    : [
        { name: 'Python', value: 35, color: '#00d4ff' },
        { name: 'Web Dev', value: 28, color: '#bf5af2' },
        { name: 'AI/ML', value: 20, color: '#ff375f' },
        { name: 'Tools', value: 12, color: '#30d158' },
        { name: 'Other', value: 5, color: '#ff9500' },
      ];

  return (
    <div className={styles.page}>
      <Navigation />

      <main className={styles.main}>
        <section className={styles.hero}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.label}>{blog.label}</span>
            <h1 className={styles.title}>
              <span className="gradient-text">{blog.title.split('').slice(0, 2).join('')}</span>{blog.title.split('').slice(2).join('')}
            </h1>
            <p className={styles.subtitle}>{blog.subtitle}</p>
          </motion.div>
        </section>

        <section className={styles.stats}>
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              {platformStats.map((stat, i) => (
                <motion.a
                  key={stat.platform}
                  href={stat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.platformCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, borderColor: 'rgba(0, 212, 255, 0.5)' }}
                >
                  <div className={styles.platformHeader}>
                    <span className={styles.platformName}>{stat.platform === 'CSDN' ? (language === 'zh' ? 'CSDN' : 'CSDN') : (language === 'zh' ? '掘金' : 'Juejin')}</span>
                    <span className={styles.platformIcon}>{stat.icon}</span>
                  </div>
                  <div className={styles.platformStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>{stat.articles}</span>
                      <span className={styles.statLabel}>{blog.platformStats.articles}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>{(stat.views / 1000).toFixed(1)}k</span>
                      <span className={styles.statLabel}>{blog.platformStats.views}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>{(stat.likes / 1000).toFixed(1)}k</span>
                      <span className={styles.statLabel}>{blog.platformStats.likes}</span>
                    </div>
                  </div>
                  <div className={styles.platformLink}>
                    {blog.visitProfile} →
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.charts}>
          <div className={styles.container}>
            <div className={styles.chartsGrid}>
              <motion.div
                className={styles.chartCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className={styles.chartTitle}>{blog.monthlyViews}</h3>
                <div className={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlyViews}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          background: '#12121a',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: '#e0e0e0',
                        }}
                      />
                      <Bar dataKey="views" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00d4ff" />
                          <stop offset="100%" stopColor="#bf5af2" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div
                className={styles.chartCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className={styles.chartTitle}>{blog.categoryDistribution}</h3>
                <div className={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={categoryDataLocalized}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryDataLocalized.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: '#12121a',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: '#e0e0e0',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className={styles.pieLegend}>
                    {categoryDataLocalized.map((item) => (
                      <div key={item.name} className={styles.legendItem}>
                        <span className={styles.legendDot} style={{ background: item.color }} />
                        <span className={styles.legendLabel}>{item.name}</span>
                        <span className={styles.legendValue}>{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className={styles.articles}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              <span className="gradient-text">{blog.featured}</span> {blog.articles}
            </h2>
            <div className={styles.articlesGrid}>
              {blog.articlesData.map((article, i) => (
                <motion.a
                  key={i}
                  href={article.platform === 'CSDN' ? 'https://blog.csdn.net/weixin_56622231' : 'https://juejin.cn/user/2350111542479753'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.articleCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5, borderColor: 'rgba(0, 212, 255, 0.5)' }}
                >
                  <div className={styles.articleHeader}>
                    <span className={styles.articlePlatform}>
                      {article.platform === 'CSDN' ? `📚 ${language === 'zh' ? 'CSDN' : 'CSDN'}` : `💎 ${language === 'zh' ? '掘金' : 'Juejin'}`}
                    </span>
                    <span className={styles.articleDate}>{article.date}</span>
                  </div>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <div className={styles.articleStats}>
                    <span>👁 {article.views}</span>
                    <span>❤️ {article.likes}</span>
                  </div>
                  <div className={styles.articleTags}>
                    {article.tags.map((tag) => (
                      <span key={tag} className={styles.articleTag}>{tag}</span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.commentsSection}>
          <div className={styles.container}>
            <Comments />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}