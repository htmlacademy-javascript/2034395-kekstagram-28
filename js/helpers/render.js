/**
 * Render Document Fragment with prepared pictures in pictures block
 *
 * @param {Post[]} posts
 * @return {boolean}
 */
const renderPictures = (posts) => {
  const fragment = new DocumentFragment();

  posts.forEach((post) => fragment.append(post.preparePicture()));

  const pictures = document.querySelector('.pictures');

  return !!pictures.appendChild(fragment);
};

export {renderPictures};
