import Validator from '../models/Validator.js';

let isFieldInFocus = false;

/**
 * Open add image form after image load
 */
const editImage = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.querySelector('.img-upload__preview').children[0].src = 'soon';
};

/**
 * Close add image form
 */
const closeEditor = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.querySelector('#upload-select-image').reset();
};

/**
 * Add event listeners on add image form && add validation
 */
const initAddImageForm = () => {
  const addImageForm = document.querySelector('#upload-select-image');

  const validator = new Validator(Validator.ADD_IMAGE_FORM_VALIDATOR);

  addImageForm.addEventListener('submit', validator.validate);

  document.querySelector('#upload-file').onchange = () => editImage();

  // toggle Esc close event on focus/blur for hashtags field
  document.querySelector('.text__hashtags').onfocus = () => {
    isFieldInFocus = true;
  };
  document.querySelector('.text__hashtags').onblur = () => {
    isFieldInFocus = false;
  };

  // toggle Esc close event on focus/blur for description field
  document.querySelector('.text__description').onfocus = () => {
    isFieldInFocus = true;
  };
  document.querySelector('.text__description').onblur = () => {
    isFieldInFocus = false;
  };

  document.querySelector('#upload-cancel').addEventListener('click', closeEditor);
};

export {closeEditor, initAddImageForm, isFieldInFocus};
