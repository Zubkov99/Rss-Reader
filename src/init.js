import 'bootstrap';
import './style.css';
import watch from './render/render.js';
import controller from './handler/controller.js';

const init = () => {
  const state = {
    urls: [],
    feeds: [],
    posts: [],
    modal: null,
    canRender: null,
    invalidKey: null,
    networkStatus: true,
    waitResponse: false,
    urlHaveRss: false,
    inputType: null,
  };
  const watchedState = watch(state);

  controller(watchedState);
};

export default init;
