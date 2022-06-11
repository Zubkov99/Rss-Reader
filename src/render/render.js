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

const renderInput = (inputStatus, state) => {
  const { inputType } = state;

  switch (inputType) {
    case 'waitResponse':
      renerLoadInput();
      break;
    case 'rssReceived':
      renderValidInput();
      break;
    default:
      renderInvalidInput(inputType);
      break;
  }
};

// const render = (state) => {
//   const {
//     posts, feeds, invalidKey,
//   } = state;

//   if (state.waitResponse) {
//     renerLoadInput();
//   }

//   if (invalidKey) {
//     renderInvalidInput(invalidKey);
//     return;
//   }

//   if (state.canRender === true) {
//     renderValidInput();
//     renderPosts(posts, postsConteiner);
//     renderFeeds(feeds, feedsConteiner);
//   }
//   renderModal(state);
// };

const watch = (initialState) => onChange(initialState, (path, value) => {
  if (path === 'inputType') {
    // console.log(path, value, previousValue, applyData);
    renderInput(value, initialState);
  }
  if (path === 'urls' || path === 'posts' || path === 'feeds') {
    renderFeeds(initialState.feeds, feedsConteiner);
    renderPosts(initialState.posts, postsConteiner);
  }
  // console.log(path, value);
  renderModal(initialState);
});

export default watch;

// export default render;
