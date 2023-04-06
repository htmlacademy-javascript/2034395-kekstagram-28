import {closeBigPicture, showAlert} from './helpers/render.js';
import {closeEditor, initAddImageForm, isFieldInFocus} from './helpers/addImage.js';
import ApiService from './api/ApiService.js';

try {
  (new ApiService()).getPosts();
} catch (e) {
  showAlert(true, e.message);
}

initAddImageForm();

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    if (!isFieldInFocus) {
      closeBigPicture();
      closeEditor();
    }
  }
});
