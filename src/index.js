import 'bootstrap';
import onChange from 'on-change';
import './style.css';
import controller from './controller.js';
import render from './render.js';

const state = {
  urls: [],
};

const watchedState = onChange(state, () => {
  render(state);
});

controller(watchedState);
