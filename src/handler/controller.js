/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import * as yup from 'yup';
import axios from 'axios';
import parseXml from './parseXml.js';
import updateState from './updateState.js';

const readStream = (query, state) => {
  axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${query}`)
    .then((response) => {
      console.log('New request received');
      return parseXml(response);
    })
    .then((data) => {
      updateState(state, data, query);
    })
    .catch((error) => {
      if (error.message === 'Parse Error') {
        state.inputType = 'rssMissing';
        throw error;
      }
      state.inputType = 'networkError';
      throw error;
    });
};

const getNewContent = (state) => {
  const timeToWait = 5000;

  Promise.allSettled(state.content.urls.map(((item) => {
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
          throw new Error('Is this an invalid link');
        }
        if (state.content.urls.includes(url)) {
          state.inputType = 'notUnique';
          throw new Error('Is this not a unique link');
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

  getNewContent(state);
};

export default controller;
