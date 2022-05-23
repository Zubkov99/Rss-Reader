const renderPosts = (data, postsConteiner) => {
  postsConteiner.innerHTML = '';
  const feedsHeader = document.createElement('h2');
  feedsHeader.textContent = 'Посты';

  postsConteiner.append(feedsHeader);

  data.forEach(({
    title, link, id, isRead,
  }) => {
    const cardConteiner = document.createElement('div');
    cardConteiner.classList.add('post-item', 'bg-light', 'p-3', 'mt-3', 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const feedsTitle = document.createElement('h5');
    feedsTitle.textContent = title;

    const postsLink = document.createElement('a');
    if (!isRead) {
      postsLink.classList.remove('fw-normal');
      postsLink.classList.add('fw-bold');
    } else {
      postsLink.classList.add('fw-normal');
    }

    postsLink.href = link;
    postsLink.textContent = title;
    postsLink.setAttribute('target', '_blank');
    postsLink.setAttribute('data-id', id);
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = 'Просмотр';
    cardConteiner.append(postsLink, button);
    postsConteiner.append(cardConteiner);
  });
};

export default renderPosts;
