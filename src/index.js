import 'bootstrap';
import onChange from 'on-change';
import './style.css';
import render from './render/render.js';
import controller from './controller.js';

const rssReader = () => {
  const state = {
    urls: [],
    feeds: [],
    posts: [],
    modal: null,
    networkStatus: true,
    waitResponse: false,
  };

  const watchedState = onChange(state, () => {
    render(state);
  });

  controller(watchedState);
};

rssReader();

export default rssReader;
