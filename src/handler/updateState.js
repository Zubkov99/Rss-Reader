/* eslint-disable no-param-reassign */
import _ from 'lodash';

const addNewPosts = (data, state) => {
  const { posts } = state.content;

  data.forEach(({
    contentId, link, title, description, isRead,
  }) => {
    if (!_.find(posts, {
      link, title, description,
    })) {
      posts.push({
        link, title, description, isRead, id: contentId,
      });
    }
  });
};

const updateState = (state, data, query) => {
  const { urls } = state.content.feeds;

  if (!urls.includes(query)) {
    urls.push(query);
  }
  const { feedTitle, feedDescription, posts } = data;
  const { feedsContain } = state.content.feeds;

  if (!_.find(feedsContain, { title: feedTitle, description: feedDescription })) {
    feedsContain.push({ title: feedTitle, description: feedDescription });
    state.inputType = 'rssReceived';
  }
  addNewPosts(posts, state);
};

export default updateState;
