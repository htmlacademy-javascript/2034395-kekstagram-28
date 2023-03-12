/**
 * Prepare picture to append in Document Fragment
 *
 * @param {string} url
 * @param {int} comments
 * @param {int} likes
 * @return {Node} Result Node
 */
const preparePicture = (url, comments, likes) => {
  const template = document.querySelector('#picture');

  const picture = template.content.cloneNode(true);

  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__comments').textContent = comments.toString();
  picture.querySelector('.picture__likes').textContent = likes.toString();

  return picture;
};

/**
 * Render Document Fragment with prepared pictures in pictures block
 *
 * @param {array} posts
 * @return {void}
 */
const renderPictures = (posts) => {
  const fragment = new DocumentFragment();

  posts.forEach((el) => {
    const picture = preparePicture(el['url'], el['likes'], el['comments'].length);

    fragment.append(picture);
  });

  const pictures = document.querySelector('.pictures');

  pictures.appendChild(fragment);
};

export {renderPictures};
