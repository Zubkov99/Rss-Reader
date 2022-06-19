/* eslint-disable no-undef */
import i18nextInstance from '../locales/index.js';

const form = document.querySelector('.rss-form');
const input = document.querySelector('#url-input');
const feedback = document.querySelector('.feedback');
const invalidClass = 'is-invalid';

const renderInvalidInput = (key) => {
  feedback.classList.remove('text-success');
  feedback.classList.add('text-danger');
  feedback.textContent = i18nextInstance.t(`validFeedback.${key}`);
  input.classList.add(invalidClass);
};

const renderLoadInput = () => {
  feedback.classList.remove('text-danger');
  feedback.classList.remove('text-success');
  feedback.textContent = i18nextInstance.t('validFeedback.waitResponse');
};

const renderValidInput = () => {
  feedback.textContent = i18nextInstance.t('validFeedback.valid');
  feedback.classList.remove('text-danger');
  feedback.classList.add('text-success');
  input.classList.remove(invalidClass);
  form.reset();
};

const renderInput = (inputStatus) => {
  switch (inputStatus) {
    case 'waitResponse':
      renderLoadInput();
      break;
    case 'rssReceived':
      renderValidInput();
      break;
    default:
      renderInvalidInput(inputStatus);
      break;
  }
};

export default renderInput;
