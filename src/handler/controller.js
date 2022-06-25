/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */

import * as yup from 'yup';
import axios from 'axios';
import parseXml from './parseXml.js';
import updateState from './updateState.js';
import { mapping, errorHandler } from './errorHandler.js';

const getProxyUrl = (query) => {
  const proxy = 'https://allorigins.hexlet.app';
  const params = { disableCache: true, url: query };
  const proxyUrl = new URL('/get', proxy);
  const searchParams = new URLSearchParams(params);
  proxyUrl.search = searchParams.toString();
  return proxyUrl;
};

const readStream = (query, state) => {
  const proxyUrl = getProxyUrl(query);
  return axios.get(proxyUrl)
    .then((response) => {
      console.log('New request received');
      const parsingData = parseXml(response);
      updateState(state, parsingData, query);
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

const sendRequests = (state) => state.content.feeds.urls.map((item) => new Promise((resolve) => {
  resolve(readStream(item, state));
}));

const getNewContent = (state, delay) => {
  Promise.allSettled(sendRequests(state))
    .finally(() => {
      setTimeout(() => getNewContent(state, delay), delay);
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
        state.inputType = 'waitResponse';
        readStream(url, state);
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
