/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
import _ from 'lodash';

const checkUrl = (document) => document.querySelector('parsererror');

const parseXml = (servResponse, model, query) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(servResponse.data.contents, 'text/xml');
  console.log(doc);
  if (checkUrl(doc)) {
    model.invalidKey = 'rssMissing';
    model.inputType = 'rssMissing';
    // здесь новый ключ
    model.urlHaveRss = false;
    return;
  }
  if (!model.urls.includes(query)) {
    model.urls.push(query);
  }
  const feedTitle = doc.querySelector('title').textContent;
  const feedDescription = doc.querySelector('description').textContent;
  const posts = doc.querySelectorAll('item');

  if (!_.find(model.feeds, { title: feedTitle, description: feedDescription })) {
    model.feeds.push({ title: feedTitle, description: feedDescription });
  }

  posts.forEach((item) => {
    const contentId = _.uniqueId();
    const link = item.querySelector('link').textContent;
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const isRead = false;
    if (!_.find(model.posts, {
      link, title, description,
    })) {
      model.posts.push({
        link, title, description, isRead, id: contentId,
      });
      model.inputType = 'rssReceived';
      model.invalidKey = null;
    }
  });
};

export default parseXml;
