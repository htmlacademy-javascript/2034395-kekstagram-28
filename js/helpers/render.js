let commentsCount = 0;

/**
 * Show big picture block
 */
const showBigPicture = () => {
  document.querySelector('.big-picture').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

/**
 * Hide big picture block && remove comments
 */
const closeBigPicture = () => {
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  const commentsBlock = document.querySelector('.social__comments');

  while (commentsBlock.firstChild) {
    commentsBlock.removeChild(commentsBlock.firstChild);
  }

  commentsCount = 0;
};

/**
 * Prepare comment to append in Document Fragment
 *
 * @param {Comment} comment
 *
 * @return {Node} Result Node
 */
const prepareComment = (comment) => {
  const template = document.querySelector('#comments');

  const node = template.content.cloneNode(true);

  node.querySelector('.social__picture').src = comment.avatar;
  node.querySelector('.social__picture').alt = comment.name;
  node.querySelector('.social__text').textContent = comment.message;

  return node;
};

/**
 * Prepare picture to append in Document Fragment
 *
 * @param {Post} post
 *
 * @return {Node} Result Node
 */
const preparePicture = (post) => {
  const template = document.querySelector('#picture');

  const node = template.content.cloneNode(true);

  node.querySelector('.picture').id = post.id.toString();
  node.querySelector('.picture__img').src = post.url;
  node.querySelector('.picture__comments').textContent = post.comments.length.toString();
  node.querySelector('.picture__likes').textContent = post.likes.toString();

  return node;
};

/**
 * Render Document Fragment with prepared comments in comments block
 *
 * @param {Comment[]} comments
 */
const renderComments = (comments) => {
  const commentsBlock = document.querySelector('.social__comments');

  const commentsFragment = new DocumentFragment();

  if (comments.length > 5) {
    document.querySelector('.social__comment-count').classList.remove('hidden');
    document.querySelector('.comments-loader').classList.remove('hidden');
  } else {
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
  }

  const _comments = comments.length > 5
    ? comments.slice(commentsCount, commentsCount + 5 > comments.length ? comments.length : commentsCount + 5)
    : comments;

  commentsCount = commentsCount + 5 > comments.length ? comments.length : commentsCount + 5;

  if (commentsCount === comments.length) {
    document.querySelector('.comments-loader').classList.add('hidden');
  }

  _comments
    .forEach((comment) => commentsFragment.append(prepareComment(comment)));

  commentsBlock.appendChild(commentsFragment);

  document.querySelector('.social__comment-count').innerHTML =
    `${commentsCount.toString()} из <span class='comments-count'>${comments.length}</span> комментариев`;
};

/**
 * Render Document Fragment with prepared pictures in pictures block
 *
 * @param {Post[]} posts
 */
const renderPictures = (posts) => {
  const picturesFragment = new DocumentFragment();

  posts.forEach((post) => picturesFragment.append(preparePicture(post)));

  const picturesBlock = document.querySelector('.pictures');

  picturesBlock.appendChild(picturesFragment);

  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((picture) => {
    picture.addEventListener('click', (e) => {
      const element = e.target.parentElement;

      const post = posts[element.id];

      document.querySelector('.big-picture__img').children[0].src = post.url;
      document.querySelector('.likes-count').textContent = post.likes.toString();
      document.querySelector('.comments-count').textContent = post.comments.length.toString();
      document.querySelector('.social__caption').textContent = post.description;

      renderComments(post.comments);

      /** Event listener **/
      const eventRenderComments = () => renderComments(post.comments);

      const loader = document.querySelector('.social__comments-loader');

      loader.replaceWith(loader.cloneNode(true));

      document.querySelector('.social__comments-loader').addEventListener('click', eventRenderComments);

      showBigPicture();
    });
  });

  document
    .querySelector('.big-picture__cancel')
    .addEventListener('click', closeBigPicture);
};

export {showBigPicture, closeBigPicture, renderPictures};
