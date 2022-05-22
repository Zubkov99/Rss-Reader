import _ from 'lodash';

const renderModal = (model) => {
  const { modal, posts } = model;
  if (!modal) return;
  const { title, description, link } = _.find(posts, { id: modal });
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const modalButton = document.querySelector('#modal_button');
  modalButton.setAttribute('href', link);
  modalTitle.textContent = title;
  modalBody.textContent = description;
};

export default renderModal;
