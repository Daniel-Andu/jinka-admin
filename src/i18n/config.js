import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import am from './locales/am.json';
import or from './locales/or.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            am: { translation: am },
            or: { translation: or },
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
