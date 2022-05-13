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

const form = document.querySelector('.rss-form');
const input = document.querySelector('#url-input');
const feedback = document.querySelector('.feedback');
const feedsConteiner = document.querySelector('.feeds');
const postsConteiner = document.querySelector('.posts');

const renderPosts = (data) => {
  postsConteiner.innerHTML = '';

  const feedsHeader = document.createElement('h2');
  feedsHeader.textContent = 'Посты';

  postsConteiner.append(feedsHeader);

  data.forEach(({ title, description, link }) => {
    const cardConteiner = document.createElement('div');
    cardConteiner.classList.add('post-item', 'card', 'bg-light', 'p-3', 'mt-3');

    const feedsTitle = document.createElement('h5');
    feedsTitle.textContent = title;

    const feedsDescription = document.createElement('p');
    feedsDescription.textContent = description;

    const postsLink = document.createElement('a');
    postsLink.href = link;
    postsLink.textContent = i18nextInstance.t('posts.link');

    cardConteiner.append(feedsTitle, feedsDescription, postsLink);
    postsConteiner.append(cardConteiner);
  });
};

const renderFeeds = (data) => {
  feedsConteiner.innerHTML = '';
  const feedsHeader = document.createElement('h2');
  feedsHeader.textContent = 'Фиды';
  feedsConteiner.append(feedsHeader);

  const feedsWrapper = document.createElement('div');
  const ul = document.createElement('ul');
  feedsWrapper.append(ul);
  feedsWrapper.classList.add('card', 'border-0');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  feedsConteiner.append(feedsWrapper);

  data.forEach(({ title, description }) => {
    const li = document.createElement('li');
    const feedsTitle = document.createElement('h5');
    const feedsDescription = document.createElement('p');

    feedsDescription.textContent = description;
    feedsTitle.textContent = title;

    li.classList.add('list-group-item', 'border-0', 'border-end-0');

    li.append(feedsTitle, feedsDescription);
    ul.append(li);
  });
};

const render = (state) => {
  const validClass = 'is-invalid';
  const { posts, feeds } = state;

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
  renderPosts(posts);
  renderFeeds(feeds);
};

export default render;
