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
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './AISettings.module.css';

interface AISettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onAIEnabledChange?: (enabled: boolean) => void;
}

export default function AISettings({ isOpen, onClose, onAIEnabledChange }: AISettingsProps) {
  const { t, language } = useLanguage();
  const aiSettings = t.aiSettings;
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
    if (!config.apiKey) {
      setTestStatus('error');
      setTestMessage(aiSettings.testMessage.noApiKey);
      return;
    }

    setTestStatus('testing');
    setTestMessage(aiSettings.testMessage.testing);

    try {
      let testUrl = '';
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      switch (config.provider) {
        case 'openai':
          testUrl = 'https://api.openai.com/v1/models';
          headers['Authorization'] = `Bearer ${config.apiKey}`;
          break;
        case 'claude':
          testUrl = 'https://api.anthropic.com/v1/messages';
          headers['x-api-key'] = config.apiKey || '';
          headers['anthropic-version'] = '2023-06-01';
          break;
        case 'zhipu':
          const zhipuBase = config.baseUrl || 'https://open.bigmodel.cn/api/paas/v4';
          testUrl = `${zhipuBase}/models`;
          headers['Authorization'] = `Bearer ${config.apiKey}`;
          break;
        case 'ernie':
          testUrl = 'https://qianfan.baidubce.com/v2/chat/completions';
          headers['Authorization'] = `Bearer ${config.apiKey}`;
          break;
        case 'dashscope':
          testUrl = 'https://dashscope.aliyuncs.com/api/v1/models';
          headers['Authorization'] = `Bearer ${config.apiKey}`;
          break;
        default:
          setTestStatus('error');
          setTestMessage(aiSettings.testMessage.selectProvider);
          return;
      }

      const response = await fetch(testUrl, {
        method: 'GET',
        headers,
      });

      if (response.ok || response.status === 405) {
        setTestStatus('success');
        setTestMessage(aiSettings.testMessage.success);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setTestStatus('error');
        setTestMessage(errorData.error?.message || `连接失败 (${response.status})`);
      }
    } catch (err) {
      setTestStatus('error');
      setTestMessage(aiSettings.testMessage.failed);
    }

    setTimeout(() => setTestStatus('idle'), 5000);
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
              <h2 className={styles.title}>{aiSettings.title}</h2>
              <button className={styles.closeBtn} onClick={onClose}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className={styles.content}>
              <div className={styles.section}>
                <label className={styles.label}>{aiSettings.provider}</label>
                <div className={styles.providerGrid}>
                  <button
                    className={`${styles.providerBtn} ${config.provider === 'none' ? styles.active : ''}`}
                    onClick={() => setConfig({ ...config, provider: 'none' })}
                  >
                    <span className={styles.providerIcon}>🚫</span>
                    <span>{language === 'zh' ? '不使用AI' : 'No AI'}</span>
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
                    <label className={styles.label}>{aiSettings.apiKey}</label>
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
                        placeholder={aiSettings.baseUrl}
                        value={config.baseUrl || ''}
                        onChange={e => setConfig({ ...config, baseUrl: e.target.value })}
                      />
                    )}
                  </div>

                  <div className={styles.section}>
                    <label className={styles.label}>{aiSettings.model}</label>
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
                      {aiSettings.temperature}: {config.temperature || 0.7}
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
                      <span>{language === 'zh' ? '精确' : 'Precise'}</span>
                      <span>{language === 'zh' ? '创意' : 'Creative'}</span>
                    </div>
                  </div>

                  <div className={styles.section}>
                    <label className={styles.label}>{language === 'zh' ? '系统提示词' : 'System Prompt'}</label>
                    <textarea
                      className={styles.textarea}
                      rows={3}
                      placeholder={language === 'zh' ? '定义AI助手的角色和行为...' : 'Define AI assistant role and behavior...'}
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
                    {testStatus === 'testing' ? aiSettings.testButton.testing : aiSettings.testButton.test}
                  </button>
                </>
              )}
            </div>

            <div className={styles.footer}>
              <button className={styles.cancelBtn} onClick={onClose}>{t.common.cancel}</button>
              <button className={styles.saveBtn} onClick={handleSave}>{t.common.save}</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
