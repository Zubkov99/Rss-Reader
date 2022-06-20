import readStream from './readStream.js';

const sendRequests = (state) => state.content.feeds.urls.map((item) => new Promise((resolve) => {
  resolve(readStream(item, state));
}));

const getNewContent = (state, delay) => {
  Promise.allSettled(sendRequests(state))
    .finally(() => {
      setTimeout(() => getNewContent(state, delay), delay);
    });
};

export default getNewContent;
