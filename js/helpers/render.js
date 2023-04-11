import {
  ALERT_ELEMENT,
  ALERT_MESSAGE_ELEMENT,
  ALERT_TITLE_ELEMENT,
  BIG_PICTURE_CANCEL_ELEMENT,
  BIG_PICTURE_COMMENTS_COUNT_ELEMENT,
  BIG_PICTURE_DESCRIPTION_ELEMENT,
  BIG_PICTURE_ELEMENT,
  BIG_PICTURE_IMG_ELEMENT,
  BIG_PICTURE_LIKES_COUNT_ELEMENT,
  COMMENT_TEMPLATE,
  COMMENTS_COUNT_ELEMENT,
  COMMENTS_ELEMENT,
  COMMENTS_LOADER_ELEMENT,
  PICTURE_TEMPLATE,
  PICTURES_ELEMENT,
  PICTURES_ELEMENTS
} from '../utils/const.js';

let commentsCount = 0;

const alertsQueue = [];
let isAlertActive = false;

/**
 * Show big picture block
 */
const showBigPicture = () => {
  BIG_PICTURE_ELEMENT.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

/**
 * Hide big picture block && remove comments
 */
const closeBigPicture = () => {
  BIG_PICTURE_ELEMENT.classList.add('hidden');
  document.body.classList.remove('modal-open');

  while (COMMENTS_ELEMENT.firstChild) {
    COMMENTS_ELEMENT.removeChild(COMMENTS_ELEMENT.firstChild);
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
  const node = COMMENT_TEMPLATE.content.cloneNode(true);

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
  const node = PICTURE_TEMPLATE.content.cloneNode(true);

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
  const commentsFragment = new DocumentFragment();

  if (comments.length > 5) {
    COMMENTS_COUNT_ELEMENT.classList.remove('hidden');
    COMMENTS_LOADER_ELEMENT.classList.remove('hidden');
  } else {
    COMMENTS_COUNT_ELEMENT.classList.add('hidden');
    COMMENTS_LOADER_ELEMENT.classList.add('hidden');
  }

  const _comments = comments.length > 5 ? comments.slice(commentsCount, commentsCount + 5 > comments.length ? comments.length : commentsCount + 5) : comments;

  commentsCount = commentsCount + 5 > comments.length ? comments.length : commentsCount + 5;

  if (commentsCount === comments.length) {
    COMMENTS_LOADER_ELEMENT.classList.add('hidden');
  }

  _comments.forEach((comment) => commentsFragment.append(prepareComment(comment)));

  COMMENTS_ELEMENT.appendChild(commentsFragment);

  COMMENTS_COUNT_ELEMENT.innerHTML = `${commentsCount.toString()} из <span class='comments-count'>${comments.length}</span> комментариев`;
};

/**
 * Render Document Fragment with prepared pictures in pictures block
 *
 * @param {Post[]} posts
 */
const renderPictures = (posts) => {
  const picturesFragment = new DocumentFragment();

  posts.forEach((post) => picturesFragment.append(preparePicture(post)));

  PICTURES_ELEMENT.appendChild(picturesFragment);

  PICTURES_ELEMENTS.forEach((picture) => {
    picture.addEventListener('click', (event) => {
      const element = event.target.parentElement;

      const post = posts[element.id];

      BIG_PICTURE_IMG_ELEMENT.children[0].src = post.url;
      BIG_PICTURE_LIKES_COUNT_ELEMENT.textContent = post.likes.toString();
      BIG_PICTURE_COMMENTS_COUNT_ELEMENT.textContent = post.comments.length.toString();
      BIG_PICTURE_DESCRIPTION_ELEMENT.textContent = post.description;

      renderComments(post.comments);

      /** Event listener **/
      const eventRenderComments = () => renderComments(post.comments);

      COMMENTS_LOADER_ELEMENT.replaceWith(COMMENTS_LOADER_ELEMENT.cloneNode(true));

      COMMENTS_LOADER_ELEMENT.addEventListener('click', eventRenderComments);

      showBigPicture();
    });
  });

  BIG_PICTURE_CANCEL_ELEMENT.addEventListener('click', closeBigPicture);
};

/**
 * Render notification about success or error
 */
const renderAlert = () => {
  if (isAlertActive) {
    return;
  }

  isAlertActive = true;

  const alert = alertsQueue.shift();

  const type = alert.isError ? 'error' : 'success';

  ALERT_MESSAGE_ELEMENT.textContent = alert.message;

  ALERT_TITLE_ELEMENT.textContent = alert.isError ? 'Ошибка' : 'Успех';

  ALERT_ELEMENT.classList.add(`alert--${type}`);

  setTimeout(() => {
    ALERT_ELEMENT.classList.remove(`alert--${type}`);

    isAlertActive = false;

    if (alertsQueue.length > 0) {
      setTimeout(() => renderAlert(), 1000);
    }
  }, 6500);
};

/**
 * Add notification about success or error to queue
 *
 * @param {boolean} isError
 * @param {string} message
 */
const showAlert = (isError, message) => {
  alertsQueue.push({isError, message});

  renderAlert();
};

export {showBigPicture, closeBigPicture, renderPictures, showAlert};
