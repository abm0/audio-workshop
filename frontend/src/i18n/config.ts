import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru.json';
import en from './en.json';

console.log(ru);

const resources = {
  ru: {
    translation: ru
  },
  en: {
    translation: en,
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });
