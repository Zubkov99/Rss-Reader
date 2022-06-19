/* eslint-disable no-param-reassign */
import _ from 'lodash';

const updateState = (state, data, query) => {
  const { urls } = state.content.feeds;

  if (!urls.includes(query)) {
    urls.push(query);
  }
  const { feedTitle, feedDescription, posts } = data;
  const { feedsContain } = state.content.feeds;

  if (!_.find(feedsContain, { title: feedTitle, description: feedDescription })) {
    feedsContain.push({ title: feedTitle, description: feedDescription });
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
