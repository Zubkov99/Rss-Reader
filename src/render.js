/* eslint-disable no-undef */
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

const render = (state) => {
  const form = document.querySelector('.rss-form');
  const input = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  const validClass = 'is-invalid';

  if (state.validFlug === false) {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.textContent = i18nextInstance.t('validFeedback.invalid');
    input.classList.add(validClass);
  } else {
    feedback.textContent = i18nextInstance.t('validFeedback.valid');
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    input.classList.remove(validClass);
    form.reset();
  }
};

export default render;
