import {closeBigPicture, renderPictures} from './helpers/render.js';
import {closeEditor, initAddImageForm, isFieldInFocus} from './helpers/addImage.js';
import Mock from './models/Mock.js';

const posts = Array.from({length: 25}, (_, key) => (new Mock()).getPost(key));

renderPictures(posts);

initAddImageForm();

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    if (!isFieldInFocus) {
      closeBigPicture();
      closeEditor();
    }
  }
});
