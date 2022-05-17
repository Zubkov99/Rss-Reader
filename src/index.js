import 'bootstrap';
import onChange from 'on-change';
import './style.css';
import controller from './controller.js';
import render from './render.js';

const rssReader = () => {
  const state = {
    urls: [],
    feeds: [],
    posts: [],
    modal: null,
  };

  const watchedState = onChange(state, () => {
    render(state);
  });

  controller(watchedState);
};

rssReader();

export default rssReader;
