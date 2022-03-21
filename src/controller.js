/* eslint-disable */
import * as yup from 'yup'

const controller = () => {  
  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url');

  })

};

export default controller;
