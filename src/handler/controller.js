/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import * as yup from 'yup';
import axios from 'axios';
import parseXml from './parseXml.js';
import updateState from './updateState.js';
import { mapping, errorHandler } from './errorHandler.js';

const readStream = (query, state) => {
  const proxy = 'https://allorigins.hexlet.app';
  const params = { disableCache: true, url: query };
  const proxyUrl = new URL('/get', proxy);
  const searchParams = new URLSearchParams(params);
  proxyUrl.search = searchParams.toString();

  axios.get(proxyUrl)
    .then((response) => {
      console.log('New request received');
      return parseXml(response);
    })
    .then((data) => {
      updateState(state, data, query);
    })
    .catch((error) => {
      if (error instanceof mapping.parsingError) {
        state.inputType = 'rssMissing';
        throw error;
      }
      if (error.isAxiosError) {
        state.inputType = 'networkError';
        throw error;
      }
      errorHandler();
    });
};

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
  getNewContent(state);
};

export default controller;
