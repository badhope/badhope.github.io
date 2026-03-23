'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AIConfig,
  AI_PROVIDERS,
  getAIConfig,
  saveAIConfig,
  isAIEnabled,
  AIProvider,
} from '@/lib/ai-api';
import styles from './AISettings.module.css';

interface AISettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onAIEnabledChange?: (enabled: boolean) => void;
}

export default function AISettings({ isOpen, onClose, onAIEnabledChange }: AISettingsProps) {
  const [config, setConfig] = useState<AIConfig>(getAIConfig());
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  useEffect(() => {
    setConfig(getAIConfig());
  }, [isOpen]);

  useEffect(() => {
    onAIEnabledChange?.(isAIEnabled());
  }, [config, onAIEnabledChange]);

  const handleSave = () => {
    saveAIConfig(config);
    onAIEnabledChange?.(isAIEnabled());
    onClose();
  };

  const handleTest = async () => {
    setTestStatus('testing');
    setTestMessage('正在测试连接...');

    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
        },
      });

      if (response.ok) {
        setTestStatus('success');
        setTestMessage('连接成功！AI功能已启用。');
      } else {
        setTestStatus('error');
        setTestMessage('API密钥无效或已过期');
      }
    } catch {
      setTestStatus('error');
      setTestMessage('连接失败，请检查网络和API配置');
    }

    setTimeout(() => setTestStatus('idle'), 3000);
  };

  const currentProvider = config.provider !== 'none' ? AI_PROVIDERS[config.provider] : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>AI 设置</h2>
              <button className={styles.closeBtn} onClick={onClose}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className={styles.content}>
              <div className={styles.section}>
                <label className={styles.label}>AI 提供商</label>
                <div className={styles.providerGrid}>
                  <button
                    className={`${styles.providerBtn} ${config.provider === 'none' ? styles.active : ''}`}
                    onClick={() => setConfig({ ...config, provider: 'none' })}
                  >
                    <span className={styles.providerIcon}>🚫</span>
                    <span>不使用AI</span>
                  </button>
                  {(Object.keys(AI_PROVIDERS) as Exclude<AIProvider, 'none'>[]).map(key => (
                    <button
                      key={key}
                      className={`${styles.providerBtn} ${config.provider === key ? styles.active : ''}`}
                      onClick={() => setConfig({ ...config, provider: key, model: AI_PROVIDERS[key].defaultModel })}
                    >
                      <span className={styles.providerIcon}>
                        {key === 'openai' ? '🤖' : key === 'claude' ? '🧠' : '🇨🇳'}
                      </span>
                      <span>{AI_PROVIDERS[key].nameCN}</span>
                    </button>
                  ))}
                </div>
              </div>

              {config.provider !== 'none' && (
                <>
                  <div className={styles.section}>
                    <label className={styles.label}>API 密钥</label>
                    <input
                      type="password"
                      className={styles.input}
                      placeholder="sk-..."
                      value={config.apiKey || ''}
                      onChange={e => setConfig({ ...config, apiKey: e.target.value })}
                    />
                    {currentProvider?.needsBaseUrl && (
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="自定义API地址（可选）"
                        value={config.baseUrl || ''}
                        onChange={e => setConfig({ ...config, baseUrl: e.target.value })}
                      />
                    )}
                  </div>

                  <div className={styles.section}>
                    <label className={styles.label}>模型选择</label>
                    <select
                      className={styles.select}
                      value={config.model || currentProvider?.defaultModel}
                      onChange={e => setConfig({ ...config, model: e.target.value })}
                    >
                      {currentProvider?.models.map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.section}>
                    <label className={styles.label}>
                      温度 (Temperature): {config.temperature || 0.7}
                    </label>
                    <input
                      type="range"
                      className={styles.slider}
                      min="0"
                      max="2"
                      step="0.1"
                      value={config.temperature || 0.7}
                      onChange={e => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                    />
                    <div className={styles.sliderLabels}>
                      <span>精确</span>
                      <span>创意</span>
                    </div>
                  </div>

                  <div className={styles.section}>
                    <label className={styles.label}>系统提示词</label>
                    <textarea
                      className={styles.textarea}
                      rows={3}
                      placeholder="定义AI助手的角色和行为..."
                      value={config.systemPrompt || ''}
                      onChange={e => setConfig({ ...config, systemPrompt: e.target.value })}
                    />
                  </div>

                  {testStatus !== 'idle' && (
                    <div className={`${styles.testResult} ${styles[testStatus]}`}>
                      {testMessage}
                    </div>
                  )}

                  <button
                    className={styles.testBtn}
                    onClick={handleTest}
                    disabled={!config.apiKey || testStatus === 'testing'}
                  >
                    {testStatus === 'testing' ? '测试中...' : '测试连接'}
                  </button>
                </>
              )}

              <div className={styles.info}>
                <p>💡 AI功能仅在配置API密钥后启用</p>
                <p>🔒 密钥仅存储在本地浏览器中</p>
                <p>🇨🇳 优先支持国产大模型（智谱、文心、通义）</p>
              </div>
            </div>

            <div className={styles.footer}>
              <button className={styles.cancelBtn} onClick={onClose}>取消</button>
              <button className={styles.saveBtn} onClick={handleSave}>保存设置</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
