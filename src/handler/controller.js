/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */

import * as yup from 'yup';
import { errorHandler } from './errorHandler.js';
import getNewContent from './getNewContent.js';
import readStream from './readStream.js';

const controller = (state) => {
  const shema = yup.string().url();
  const form = document.querySelector('.rss-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url').trim();
    shema.isValid(url)
      .then((data) => {
        if (!data) {
          errorHandler('invalidUrl', state);
        }
        if (state.content.feeds.urls.includes(url)) {
          errorHandler('notUnique', state);
        }
        return url;
      })
      .then((urlQuery) => {
        state.inputType = 'waitResponse';
        readStream(urlQuery, state);
      });
  });

  const postsConteiner = document.querySelector('.posts');
  postsConteiner.addEventListener('click', (event) => {
    const { target } = event;
    const buttonsId = target.getAttribute('data-id');
    if (!buttonsId) return;
    state.content.posts.forEach((item) => {
      if (item.id === buttonsId) item.isRead = true;
    });
    state.modalId = buttonsId;
  });

  const timeToWait = 5000;
  getNewContent(state, timeToWait);
};

export default controller;
