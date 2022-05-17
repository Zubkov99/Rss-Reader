/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import * as yup from 'yup';
import axios from 'axios';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const parseXml = (servResponse, model) => {
  const parser = new DOMParser();

  const doc = parser.parseFromString(servResponse.data.contents, 'text/xml');
  const feedTitle = doc.querySelector('title').textContent;
  const feedDescription = doc.querySelector('description').textContent;
  const posts = doc.querySelectorAll('item');

  if (!_.find(model.feeds, { title: feedTitle, description: feedDescription })) {
    model.feeds.push({ title: feedTitle, description: feedDescription });
  }

  posts.forEach((item) => {
    const contentId = uuidv4();
    const link = item.querySelector('link').textContent;
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const isRead = false;
    if (!_.find(model.posts, {
      link, title, description,
    })) {
      model.posts.push({
        link, title, description, isRead, id: contentId,
      });
    }
  });
};

const readStream = (query, state) => {
  axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${query}`)
    .then((response) => {
      parseXml(response, state);
    })
    .catch((error) => {
      throw error;
    })
    .finally(() => {
      setTimeout(() => {
        state.urls.forEach((item) => readStream(item, state));
        console.log('New request received');
      }, 6000);
    });
};

const controller = (state) => {
  const watchedState = state;
  const shema = yup.string().url();
  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url').trim();
    shema.isValid(url)
      .then((data) => {
        if (data === false || watchedState.urls.includes(url)) throw new Error('Is this an invalid or duplicate link');
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
};

export default controller;
