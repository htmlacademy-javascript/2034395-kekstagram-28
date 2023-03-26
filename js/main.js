import {closeBigPicture, renderPictures} from './helpers/render.js';
import Mock from './models/Mock.js';

const posts = Array.from({length: 25}, (_, key) => (new Mock()).getPost(key));

renderPictures(posts);

document.querySelector('.big-picture__cancel').addEventListener('click', () => closeBigPicture());

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    closeBigPicture();
  }
});
