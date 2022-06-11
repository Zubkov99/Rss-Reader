/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import i18nextInstance from '../locales/index.js';

const renderFeeds = (data, feedsConteiner) => {
  feedsConteiner.innerHTML = '';
  const feedsHeader = document.createElement('h2');
  feedsHeader.textContent = i18nextInstance.t('headers.feeds');
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

export default renderFeeds;
