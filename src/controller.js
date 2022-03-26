import * as yup from 'yup';

const controller = (state) => {
  const watchedState = state;
  const shema = yup.string().url();
  // eslint-disable-next-line no-undef
  const form = document.querySelector('.rss-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    const formData = new FormData(event.target);
    const url = formData.get('url');
    shema.isValid(url)
      .then((data) => {
        if (data === false || watchedState.urls.includes(url)) throw new Error('Its false, man');
        watchedState.urls.push(url);
        watchedState.validFlug = true;
      })
      .catch(() => {
        watchedState.validFlug = false;
      });
  });
};

export default controller;
