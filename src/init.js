import 'bootstrap';
import './style.css';
import watch from './render/render.js';
import controller from './handler/controller.js';

const init = () => {
  const initialState = {
    content: {
      feeds: {
        urls: [],
        feedsContain: [],
      },
      posts: [],
    },
    modalId: null,
    inputType: null,
  };
  const watchedState = watch(initialState);

  controller(watchedState);
};

export default init;
