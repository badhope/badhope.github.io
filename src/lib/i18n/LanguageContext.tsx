'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Language, Translations, en, zh } from './translations';

export type { Language, Translations };
export { en, zh };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  mounted: boolean;
  /** Full translations object */
  translations: Translations;
  /** Alias for translations - same object */
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'badhope-language';

function getTranslations(lang: Language): Translations {
  return lang === 'zh' ? zh : en;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with 'zh' on server to match SSR
  // useEffect syncs with localStorage after hydration
  const [language, setLanguageState] = useState<Language>('zh');
  const [mounted, setMounted] = useState(false);
  const translations = getTranslations(language);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    const resolvedLang: Language = (saved === 'zh' || saved === 'en') ? saved :
      (navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en');
    setLanguageState(resolvedLang);
    document.documentElement.setAttribute('data-lang', resolvedLang);
    document.documentElement.classList.add('lang-' + resolvedLang);
    setMounted(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.classList.remove('lang-en', 'lang-zh');
    document.documentElement.classList.add('lang-' + lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, translations, t: translations, setLanguage, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // SSR fallback - return zh translations
    return {
      language: 'zh' as Language,
      translations: zh,
      t: zh,
      setLanguage: (_: Language) => {},
      mounted: false,
    };
  }
  return ctx;
}
