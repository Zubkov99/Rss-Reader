/* eslint-disable no-undef */
import _ from 'lodash';

const renderModal = (model) => {
  const { modalId } = model;
  const { posts } = model.content;
  if (!modalId) return;
  const { title, description, link } = _.find(posts, { id: modalId });
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const modalButton = document.querySelector('#modal_button');
  modalButton.setAttribute('href', link);
  modalTitle.textContent = title;
  modalBody.textContent = description;
};

export default renderModal;
