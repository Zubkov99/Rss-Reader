/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import * as yup from 'yup';
import axios from 'axios';
// import _ from 'lodash';
import parseXml from './parseXml.js';

const readStream = (query, state) => {
  axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${query}`)
    .then((response) => {
      console.log('New request received');
      parseXml(response, state, query);
      // state.inputType = 'rssReceived';
      // здесь новый ключ
      state.canRender = true;
    })
    .catch((error) => {
      state.inputType = 'networkError';
      // здесь новый ключ
      state.invalidKey = 'networkError';
      throw error;
    })
    .finally(() => {
      state.canRender = false;
    });
};

const getNewContent = (state) => {
  const timeToWait = 5000;

  Promise.allSettled(state.urls.map(((item) => {
    readStream(item, state);
  })))
    .finally(() => {
      setTimeout(() => getNewContent(state), timeToWait);
    });
};

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
          state.inputType = 'invalidUrl';
          // здесь новый ключ
          state.invalidKey = 'invalidUrl';
          throw new Error('Is this an invalid link');
        }
        if (state.urls.includes(url)) {
          state.invalidKey = 'notUnique';
          // здесь новый ключ
          state.inputType = 'notUnique';
          throw new Error('Is this not a unique link');
        }
        return url;
      })
      .then((urlQuery) => {
        state.waitResponse = true;
        // здесь новый ключ
        state.inputType = 'waitResponse';
        readStream(urlQuery, state);
      })
      .finally(() => {
        state.waitResponse = false;
      });
  });

  const postsConteiner = document.querySelector('.posts');
  postsConteiner.addEventListener('click', (event) => {
    const { target } = event;
    const buttonsId = target.getAttribute('data-id');
    if (!buttonsId) return;
    state.posts.forEach((item) => {
      if (item.id === buttonsId) item.isRead = true;
    });
    state.modal = buttonsId;
  });

  getNewContent(state);
};

export default controller;
