'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CosmicEntry.module.css';

interface CosmicEntryProps {
  onComplete: () => void;
}

interface Star {
  x: number; y: number; z: number;
  prevX: number; prevY: number;
  color: string; size: number; brightness: number;
}

const STAR_COLORS = ['#ffffff', '#f0d060', '#4d9fff', '#a78bfa', '#67e8f9', '#d4af37'];

export default function CosmicEntry({ onComplete }: CosmicEntryProps) {
  const [phase, setPhase] = useState<'intro' | 'warp' | 'done'>('intro');
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animRef = useRef<number>(0);
  const speedRef = useRef(0.5);
  const targetSpeedRef = useRef(0.5);
  const warpTimeRef = useRef(0);

  // Init stars
  useEffect(() => {
    const stars: Star[] = [];
    for (let i = 0; i < 400; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 1000,
        z: Math.random() * 800 + 200,
        prevX: 0, prevY: 0,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        size: Math.random() * 2 + 0.5,
        brightness: Math.random() * 0.5 + 0.5,
      });
    }
    starsRef.current = stars;
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Fade trail effect
      ctx.fillStyle = 'rgba(4, 7, 26, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth speed lerp
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.04;

      starsRef.current.forEach((star) => {
        star.prevX = star.x;
        star.prevY = star.y;
        star.z -= speedRef.current;

        if (star.z <= 1) {
          star.x = (Math.random() - 0.5) * 1000;
          star.y = (Math.random() - 0.5) * 1000;
          star.z = 800 + Math.random() * 200;
          star.prevX = star.x;
          star.prevY = star.y;
        }

        const scale = 300 / Math.max(star.z, 1);
        const sx = star.x * scale + cx;
        const sy = star.y * scale + cy;
        const px = star.prevX * scale + cx;
        const py = star.prevY * scale + cy;

        if (sx < -10 || sx > canvas.width + 10 || sy < -10 || sy > canvas.height + 10) return;

        const alpha = Math.min(1, Math.max(0, 1 - star.z / 800)) * star.brightness;
        const starSize = Math.max(0.3, scale * star.size * 0.5);

        // Trail (only in warp)
        if (speedRef.current > 3 && phase === 'warp') {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = star.color;
          ctx.globalAlpha = alpha * 0.5;
          ctx.lineWidth = Math.max(0.3, starSize * 0.4);
          ctx.stroke();
        }

        // Star core
        ctx.beginPath();
        ctx.arc(sx, sy, starSize, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Glow for bright stars
        if (starSize > 1) {
          ctx.beginPath();
          ctx.arc(sx, sy, starSize * 3, 0, Math.PI * 2);
          const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, starSize * 3);
          grd.addColorStop(0, star.color + '88');
          grd.addColorStop(1, 'transparent');
          ctx.fillStyle = grd;
          ctx.globalAlpha = alpha * 0.3;
          ctx.fill();
        }
      });

      // Central glow (gentle in intro, strong in warp)
      const glowIntensity = phase === 'warp' ? 0.08 : 0.04;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width * 0.3);
      grd.addColorStop(0, `rgba(212, 175, 55, ${glowIntensity})`);
      grd.addColorStop(0.5, `rgba(26, 115, 232, ${glowIntensity * 0.5})`);
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [phase]);

  // Countdown
  useEffect(() => {
    if (phase !== 'intro') return;
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleStartWarp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // Progress
  useEffect(() => {
    if (phase !== 'warp') return;
    warpTimeRef.current += 1;
    setProgress(Math.min(100, warpTimeRef.current * 2.2));
    if (warpTimeRef.current >= 45) {
      setPhase('done');
      setTimeout(onComplete, 800);
    }
  }, [phase, onComplete]);

  const handleStartWarp = useCallback(() => {
    setPhase('warp');
    targetSpeedRef.current = 45;
  }, []);

  const handleEnterNow = useCallback(() => {
    setPhase('warp');
    targetSpeedRef.current = 45;
  }, []);

  const handleSkip = useCallback(() => {
    cancelAnimationFrame(animRef.current);
    onComplete();
  }, [onComplete]);

  return (
    <div className={styles.entry}>
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Phase: Intro */}
      <AnimatePresence>
        {phase === 'intro' && (
          <motion.div
            className={styles.introContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <motion.div
              className={styles.logoWrap}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, type: 'spring', stiffness: 100 }}
            >
              <span className={styles.logoStar}>⭐</span>
              <div className={styles.logoRing1} />
              <div className={styles.logoRing2} />
              <div className={styles.logoRing3} />
            </motion.div>

            {/* Title */}
            <motion.div
              className={styles.titleBlock}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h1 className={styles.titleMain}>badhope</h1>
              <p className={styles.titleSub}>
                Full-Stack Developer &amp; AI Explorer
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              className={styles.divider}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />

            {/* Tagline */}
            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              探索代码与创意的宇宙
            </motion.p>

            {/* Countdown indicator */}
            <motion.div
              className={styles.countdownWrap}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.div
                className={styles.countdownNum}
                key={countdown}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {countdown}
              </motion.div>
              <p className={styles.countdownText}>秒后自动穿越星空</p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              className={styles.btnRow}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <motion.button
                className={styles.enterBtn}
                onClick={handleEnterNow}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                <span className={styles.enterBtnZh}>🚀 穿越星空</span>
                <span className={styles.enterBtnEn}>穿越星空</span>
              </motion.button>

              <motion.button
                className={styles.skipBtn}
                onClick={handleSkip}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                跳过 →
              </motion.button>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className={styles.introProgress}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.5 }}
            >
              <div className={styles.introProgressTrack}>
                <motion.div
                  className={styles.introProgressFill}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.5, duration: 5, ease: 'linear' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase: Warp */}
      <AnimatePresence>
        {phase === 'warp' && (
          <motion.div
            className={styles.warpContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.warpBadge}>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ⭐ WARP DRIVE
              </motion.span>
            </div>

            <div className={styles.warpStats}>
              <div className={styles.warpStat}>
                <span className={styles.warpStatLabel}>SPEED</span>
                <span className={styles.warpStatValue}>
                  {Math.floor(speedRef.current * 24.6)}
                </span>
              </div>
              <div className={styles.warpStat}>
                <span className={styles.warpStatLabel}>PROGRESS</span>
                <span className={styles.warpStatValue}>{Math.floor(progress)}%</span>
              </div>
            </div>

            <div className={styles.warpProgress}>
              <div className={styles.warpProgressTrack}>
                <motion.div
                  className={styles.warpProgressFill}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <button className={styles.warpSkip} onClick={handleSkip}>
              跳过 warp →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase: Done flash */}
      <AnimatePresence>
        {phase === 'done' && (
          <motion.div
            className={styles.doneFlash}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className={styles.doneText}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              ⭐ Welcome Aboard
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
