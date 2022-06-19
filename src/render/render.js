/* eslint-disable no-undef */
import onChange from 'on-change';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import renderModal from './renderModal.js';
import renderInput from './renderInput.js';

const feedsConteiner = document.querySelector('.feeds');
const postsConteiner = document.querySelector('.posts');

const watch = (initialState) => onChange(initialState, (path, value) => {
  const { posts } = initialState.content;
  const { feedsContain: feeds } = initialState.content.feeds;
  switch (path) {
    case 'inputType':
      renderInput(value);
      break;
    case 'content.posts':
      renderPosts(posts, postsConteiner);
      break;
    case 'content.feeds.feedsContain':
      renderFeeds(feeds, feedsConteiner);
      break;
    case 'modalId':
      renderModal(initialState);
      break;
    default:
      break;
  }
});

export default watch;
