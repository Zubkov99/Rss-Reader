import 'bootstrap';
import onChange from 'on-change';
import './style.css';
import controller from './controller.js';
import render from './render.js';

const state = {
  urls: [],
  feeds: [],
  posts: [],
};

const watchedState = onChange(state, () => {
  render(state);
  console.log('update');
});

controller(watchedState);
