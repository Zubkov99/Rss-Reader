/* eslint-disable no-param-reassign */
import _ from 'lodash';

const updateState = (state, data, query) => {
  if (!state.content.urls.includes(query)) {
    state.content.urls.push(query);
  }
  const feedTitle = data.querySelector('title').textContent;
  const feedDescription = data.querySelector('description').textContent;
  const posts = data.querySelectorAll('item');

  if (!_.find(state.content.feeds, { title: feedTitle, description: feedDescription })) {
    state.content.feeds.push({ title: feedTitle, description: feedDescription });
  }

  posts.forEach((item) => {
    const contentId = _.uniqueId();
    const link = item.querySelector('link').textContent;
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const isRead = false;
    if (!_.find(state.content.posts, {
      link, title, description,
    })) {
      state.content.posts.push({
        link, title, description, isRead, id: contentId,
      });
      state.inputType = 'rssReceived';
    }
  });
};

export default updateState;
