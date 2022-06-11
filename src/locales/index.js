import i18next from 'i18next';
import ru from './localText.js';

const i18nextInstance = i18next.createInstance();

i18nextInstance.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
  },
});

export default i18nextInstance;
