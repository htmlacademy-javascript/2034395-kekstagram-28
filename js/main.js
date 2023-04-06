import {closeBigPicture, showAlert} from './helpers/render.js';
import {closeEditor, initAddImageForm, isFieldInFocus} from './helpers/addImage.js';
import ApiService from './api/ApiService.js';

(new ApiService())
  .getPosts()
  .then(() => {
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  })
  .catch((e) => showAlert(true, e.message));

initAddImageForm();

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    if (!isFieldInFocus) {
      closeBigPicture();
      closeEditor();
    }
  }
});
