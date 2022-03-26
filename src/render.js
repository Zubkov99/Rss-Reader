/* eslint-disable no-undef */
const render = (state) => {
  const form = document.querySelector('.rss-form');
  const input = document.querySelector('#url-input');
  const validClass = 'is-invalid';

  if (state.validFlug === false) {
    input.classList.add(validClass);
  } else {
    input.classList.remove(validClass);
    form.reset();
  }
};

export default render;
