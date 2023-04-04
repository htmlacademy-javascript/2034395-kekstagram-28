import {closeBigPicture, renderPictures} from './helpers/render.js';
import {closeEditor, editImage} from './helpers/addImage.js';
import Mock from './models/Mock.js';
import Validator from './models/Validator.js';

const posts = Array.from({length: 25}, (_, key) => (new Mock()).getPost(key));

renderPictures(posts);

document.querySelector('.big-picture__cancel').addEventListener('click', () => closeBigPicture());
document.querySelector('#upload-cancel').addEventListener('click', () => closeEditor());

const addImageForm = document.querySelector('#upload-select-image');
const addImageFormValidator = new Validator(addImageForm, Validator.ADD_IMAGE_FORM);
addImageForm.addEventListener('submit', addImageFormValidator.validate);

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    closeBigPicture();
    closeEditor();
  }
});

document.querySelector('#upload-file').onchange = () => editImage();
