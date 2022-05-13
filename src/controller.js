/* eslint-disable no-undef */
import * as yup from 'yup';
import axios from 'axios';

let idCounter = 1;
const readStream = (query, state) => {
  const parser = new DOMParser();

  axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(query)}`)
    .then((response) => {
      const doc = parser.parseFromString(response.data.contents, 'text/xml');
      const feedTitle = doc.querySelector('title').textContent;
      const feedDescription = doc.querySelector('description').textContent;

      const posts = doc.querySelectorAll('item');

      state.feeds.push({ title: feedTitle, description: feedDescription, id: idCounter });

      posts.forEach((item) => {
        const link = item.querySelector('link').textContent;
        const title = item.querySelector('title').textContent;
        const description = item.querySelector('description').textContent;
        state.posts.push({
          link, title, description, id: idCounter,
        });
      });

      idCounter += 1;
    })
    .catch((error) => {
      throw error;
    });
};

const controller = (state) => {
  const watchedState = state;
  const shema = yup.string().url();
  // eslint-disable-next-line no-undef
  const form = document.querySelector('.rss-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    const formData = new FormData(event.target);
    const url = formData.get('url');
    shema.isValid(url)
      .then((data) => {
        if (data === false || watchedState.urls.includes(url)) throw new Error('Its false, man');
        watchedState.urls.push(url);
        watchedState.validFlug = true;
        return url;
      })
      .then((urlQuery) => {
        readStream(urlQuery, state);
      })
      .catch(() => {
        watchedState.validFlug = false;
      });
  });
};

export default controller;
