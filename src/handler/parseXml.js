/* eslint-disable no-undef */
import _ from 'lodash';
import { errorHandler } from './errorHandler.js';

const checkUrl = (document) => document.querySelector('parsererror');

const parseXml = (servResponse) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(servResponse.data.contents, 'text/xml');
  if (checkUrl(doc)) {
    errorHandler('parseError');
  }

  const feedTitle = doc.querySelector('title').textContent;
  const feedDescription = doc.querySelector('description').textContent;
  const posts = [];

  doc.querySelectorAll('item').forEach((item) => {
    const contentId = _.uniqueId();
    const link = item.querySelector('link').textContent;
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const isRead = false;
    posts.push({
      contentId, link, title, description, isRead,
    });
  });
  return { feedTitle, feedDescription, posts };
};

export default parseXml;
