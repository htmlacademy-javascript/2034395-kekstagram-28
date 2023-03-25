const showBigPicture = () => {
  document.querySelector('.big-picture').classList.remove('hidden');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const closeBigPicture = () => {
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');

  const commentsCollection = document.querySelector('.social__comments');

  const comments = Array.from(commentsCollection.children);

  comments.forEach((comment) => comment.remove());
};

/**
 * Render Document Fragment with prepared pictures in pictures block
 *
 * @param {Post[]} posts
 */
const renderPictures = (posts) => {
  const picturesFragment = new DocumentFragment();

  posts.forEach((post) => picturesFragment.append(post.preparePicture()));

  const picturesBlock = document.querySelector('.pictures');

  picturesBlock.appendChild(picturesFragment);

  const pictures = Array.from(picturesBlock.children);

  pictures.forEach((picture) => {
    if (picture.className === 'picture') {
      picture.addEventListener('click', (e) => {
        const element = e.target.parentElement;

        const post = posts[element.id];

        document.querySelector('.big-picture__img').children[0].src = post.url;
        document.querySelector('.likes-count').textContent = post.likes.toString();
        document.querySelector('.comments-count').textContent = post.comments.length.toString();
        document.querySelector('.social__caption').textContent = post.description;

        const commentsFragment = new DocumentFragment();

        post.comments.forEach((comment) => commentsFragment.append(comment.prepareComment()));

        const comments = document.querySelector('.social__comments');

        comments.appendChild(commentsFragment);

        showBigPicture();
      });
    }
  });
};

export {showBigPicture, closeBigPicture, renderPictures};
