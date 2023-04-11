import {closeBigPicture, showAlert} from './helpers/render.js';
import {closeEditor, initAddImageForm, isFieldInFocus} from './helpers/addImage.js';
import ApiService from './api/ApiService.js';
import {IMAGE_FILTERS_ELEMENT} from './utils/const.js';

(new ApiService())
  .getPosts()
  .then(() => {
    IMAGE_FILTERS_ELEMENT.classList.remove('img-filters--inactive');
  })
  .catch((event) => showAlert(true, event.message));

initAddImageForm();

document.addEventListener('keydown', (event) => {
  if (event.code === 'Escape') {
    if (!isFieldInFocus) {
      closeBigPicture();
      closeEditor();
    }
  }
});
