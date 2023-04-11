import ApiService from '../api/ApiService.js';
import {showAlert} from '../helpers/render.js';
import {closeEditor} from '../helpers/addImage.js';
import {HASHTAG_REGEX, HASHTAGS_ELEMENT, UPLOAD_FORM_ELEMENT} from '../utils/const.js';

/**
 * Add Image Form validator
 *
 * @return {boolean}
 */
export default async () => {
  const pristine = new Pristine(UPLOAD_FORM_ELEMENT);

  const isDuplicates = (hashtags) => hashtags.length !== new Set(hashtags).size;

  const isCountValid = (hashtags) => hashtags.length <= 5;

  const isHashtagValid = (hashtag) => HASHTAG_REGEX.test(hashtag);

  const validateHashtags = (hashtags) => {
    hashtags = hashtags.trim().split(' ').filter((hashtag) => hashtag.trim().length);

    return isCountValid(hashtags) && !isDuplicates(hashtags) && hashtags.every(isHashtagValid);
  };

  pristine.addValidator(HASHTAGS_ELEMENT, validateHashtags, 'Формат введенных хештегов не соответствует требованиям.');

  if (!pristine.validate()) {
    return false;
  }

  await (new ApiService()).createPost(new FormData(UPLOAD_FORM_ELEMENT))
    .then(() => {
      UPLOAD_FORM_ELEMENT.reset();
      closeEditor();
      showAlert(false, 'Фотография отправлена');
    })
    .catch((event) => showAlert(true, event.message));

  return true;
};
