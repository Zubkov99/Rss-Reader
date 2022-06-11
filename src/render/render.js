/* eslint-disable no-undef */
import onChange from 'on-change';
import i18nextInstance from '../locales/index.js';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import renderModal from './renderModal.js';

const form = document.querySelector('.rss-form');
const input = document.querySelector('#url-input');
const feedback = document.querySelector('.feedback');
const feedsConteiner = document.querySelector('.feeds');
const postsConteiner = document.querySelector('.posts');
const invalidClass = 'is-invalid';

const renderInvalidInput = (key) => {
  feedback.classList.remove('text-success');
  feedback.classList.add('text-danger');
  feedback.textContent = i18nextInstance.t(`validFeedback.${key}`);
  input.classList.add(invalidClass);
};

const renerLoadInput = () => {
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
      renerLoadInput();
      break;
    case 'rssReceived':
      renderValidInput();
      break;
    default:
      renderInvalidInput(inputStatus);
      break;
  }
};

const watch = (initialState) => onChange(initialState, (path, value) => {
  const { posts, feeds } = initialState.content;

  if (path === 'inputType') {
    renderInput(value);
  }
  if (path.includes('content')) {
    renderFeeds(feeds, feedsConteiner);
    renderPosts(posts, postsConteiner);
  }
  renderModal(initialState);
});

export default watch;
