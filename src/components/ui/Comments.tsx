'use client';

import { useEffect, useRef } from 'react';
import styles from './Comments.module.css';

interface CommentsProps {
  className?: string;
}

export default function Comments({ className }: CommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentsRef.current || commentsRef.current.hasAttribute('data-giscus')) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'badhope/github.io');
    script.setAttribute('data-repo-id', 'R_kgDOOMzRyg');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOOMzRys4Cjvm7');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'dark');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    commentsRef.current.appendChild(script);
  }, []);

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.icon}>💬</span>
          评论
        </h3>
        <p className={styles.subtitle}>
          使用 GitHub 账号登录后发表评论
        </p>
      </div>
      <div ref={commentsRef} className={styles.giscus} data-giscus />
    </div>
  );
}
