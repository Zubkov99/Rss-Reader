/* eslint-disable no-undef */
const checkUrl = (document) => document.querySelector('parsererror');

const parseXml = (servResponse) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(servResponse.data.contents, 'text/xml');
  if (checkUrl(doc)) {
    throw new Error('Parse Error');
  }
  return doc;
};

export default parseXml;
