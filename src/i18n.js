import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import khTranslation from './locales/kh.json';
import cnTranslation from './locales/cn.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      kh: { translation: khTranslation },
      zh: { translation: cnTranslation }
    },
    supportedLngs: ['en', 'kh', 'zh'],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage'],
      caches: ['cookie']
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;