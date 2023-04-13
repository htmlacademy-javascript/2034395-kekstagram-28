import {showAlert} from './helpers/render.js';
import {initAddImageForm} from './helpers/addImage.js';
import ApiService from './api/ApiService.js';
import {IMAGE_FILTERS_ELEMENT, IMG_SORT_TYPE_ELEMENTS} from './utils/const.js';
import sortImages from './helpers/sortImages.js';

(new ApiService())
  .getPosts('default')
  .then(() => {
    IMAGE_FILTERS_ELEMENT().classList.remove('img-filters--inactive');
  })
  .catch((error) => showAlert(true, error.message));

IMG_SORT_TYPE_ELEMENTS().forEach((element) => {
  element.addEventListener('click', (event) => sortImages(event.target));
});

initAddImageForm();
