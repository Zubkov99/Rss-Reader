/* eslint-disable no-undef */
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
  const posts = doc.querySelectorAll('item');

  return { feedTitle, feedDescription, posts };
};

export default parseXml;
