import {closeEditor, isFieldInFocus} from '../helpers/addImage.js';
import {closeBigPicture} from '../helpers/render.js';

export default (event) => {
  if (event.code === 'Escape') {
    if (!isFieldInFocus) {
      closeBigPicture();
      closeEditor();
    }
  }
};
