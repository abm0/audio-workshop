import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru.json';
import en from './en.json';
import { LANGUAGE_LS_KEY } from '../shared/constants';

const initialLng = localStorage.getItem(LANGUAGE_LS_KEY) || 'ru';

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
    lng: initialLng,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
