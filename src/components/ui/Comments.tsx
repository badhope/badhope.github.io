'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Comments.module.css';

interface CommentsProps {
  className?: string;
}

export default function Comments({ className }: CommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!commentsRef.current || commentsRef.current.hasAttribute('data-giscus')) return;

    const timeout = setTimeout(() => {
      if (isLoading) {
        setLoadError(true);
        setIsLoading(false);
      }
    }, 10000);

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

    script.onload = () => {
      clearTimeout(timeout);
      setIsLoading(false);
    };

    script.onerror = () => {
      clearTimeout(timeout);
      setLoadError(true);
      setIsLoading(false);
    };

    commentsRef.current.appendChild(script);

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

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

      {loadError ? (
        <div className={styles.fallback}>
          <p>评论服务暂时不可用</p>
          <a
            href="https://github.com/badhope/github.io/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fallbackLink}
          >
            前往 GitHub Discussions 评论
          </a>
        </div>
      ) : (
        <div ref={commentsRef} className={styles.giscus} data-giscus />
      )}
    </div>
  );
}
