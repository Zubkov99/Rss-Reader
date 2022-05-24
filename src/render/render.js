import i18next from 'i18next';
import ru from '../localText.js';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import renderModal from './renderModal.js';

const i18nextInstance = i18next.createInstance();

i18nextInstance.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
  },
});

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
const renderValidInput = () => {
  feedback.textContent = i18nextInstance.t('validFeedback.valid');
  feedback.classList.remove('text-danger');
  feedback.classList.add('text-success');
  input.classList.remove(invalidClass);
  form.reset();
};

// eslint-disable-next-line consistent-return
const render = (state) => {
  const {
    posts, feeds, invalidKey,
  } = state;

  console.log(invalidKey);
  if (invalidKey) {
    renderInvalidInput(invalidKey);
    return;
  }

  renderValidInput();
  renderPosts(posts, postsConteiner);
  renderFeeds(feeds, feedsConteiner);
  renderModal(state);
};

export default render;
