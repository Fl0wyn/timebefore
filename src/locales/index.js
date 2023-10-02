import { data } from './data'

const langNavigator = () => {
  const detectedLanguage = window.navigator.language
    ? window.navigator.language.split('-')[0]
    : 'en';

  const language = detectedLanguage === 'en' || detectedLanguage === 'fr'
    ? detectedLanguage
    : 'en';

  return Object.keys(data).reduce((acc, l) => (
    acc[l] = data[l][language], acc), {}
  );
}

export const lang = langNavigator();