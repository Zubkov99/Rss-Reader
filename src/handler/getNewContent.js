import readStream from './readStream.js';

const sendRequests = (data, state) => {
  const promises = data.map((item) => new Promise((resolve) => {
    resolve(readStream(item, state));
  }));
  Promise.all(promises);
};

const getNewContent = (state) => {
  const timeToWait = 5000;
  Promise.allSettled(state.content.feeds.urls)
    .then((data) => data.map(({ value }) => value))
    .then((data) => {
      sendRequests(data, state);
    })
    .finally(() => {
      setTimeout(() => getNewContent(state), timeToWait);
    });
};

export default getNewContent;
