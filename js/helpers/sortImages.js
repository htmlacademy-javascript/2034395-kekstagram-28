import {removePictures, showAlert} from './render.js';
import {IMG_SORT_TYPE_ACTIVE_ELEMENT} from '../utils/const.js';
import ApiService from '../api/ApiService.js';
import debounce from '../utils/debounce.js';

export default debounce((element) => {
  IMG_SORT_TYPE_ACTIVE_ELEMENT().classList.remove('img-filters__button--active');

  element.classList.add('img-filters__button--active');

  removePictures();

  (new ApiService())
    .getPosts(element.id)
    .catch((error) => showAlert(true, error.message));
});
