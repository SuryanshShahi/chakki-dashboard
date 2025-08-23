import english from './en.json';

interface Dictionary {
  [key: string]: string;
}

const translations = {
  en: {
    ...english,
  },
};

export const localize = (key: string) => {
  const lang = 'en';
  const dictionary = translations[lang] as Dictionary;
  return (dictionary && dictionary[key]) ?? `missing translation: ${key}`;
};
