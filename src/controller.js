/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import * as yup from 'yup';
import axios from 'axios';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const checkUrl = (document) => document.querySelector('parsererror');

const parseXml = (servResponse, model, query) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(servResponse.data.contents, 'text/xml');
  if (checkUrl(doc)) {
    model.invalidKey = 'rssMissing';
    model.urlHaveRss = false;
    return;
  }
  if (!model.urls.includes(query)) {
    model.urls.push(query);
  }
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
      model.invalidKey = null;
    }
  });
};

const readStream = (query, state) => {
  axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${query}`)
    .then((response) => {
      parseXml(response, state, query);
    })
    .catch((error) => {
      state.invalidKey = 'networkError';
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
  const shema = yup.string().url();
  const form = document.querySelector('.rss-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url').trim();
    shema.isValid(url)
      .then((data) => {
        if (!data) {
          state.invalidKey = 'invalidUrl';
          throw new Error('Is this an invalid link');
        }
        if (state.urls.includes(url)) {
          state.invalidKey = 'notUnique';
          throw new Error('Is this not a unique link');
        }
        return url;
      })
      .then((urlQuery) => {
        state.waitResponse = true;
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
};

export default controller;
