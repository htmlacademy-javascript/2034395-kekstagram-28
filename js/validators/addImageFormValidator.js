import ApiService from '../api/ApiService.js';

/**
 * Add Image Form validator
 *
 * @return {boolean}
 */
export default async () => {
  const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

  const form = document.querySelector('#upload-select-image');
  const hashtagsField = document.querySelector('#add-image-hashtags');
  const pristine = new Pristine(
    form,
    {
      classTo: 'img-upload__field-wrapper',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextClass: 'img-upload__error-text',
    }
  );

  const isDuplicates = (hashtags) => hashtags.length !== new Set(hashtags).size;
  const isCountValid = (hashtags) => hashtags.length <= 5;
  const isHashtagValid = (hashtag) => regexp.test(hashtag);

  const validateHashtags = (value) => {
    const hashtags = value.trim().split(' ').filter((hashtag) => hashtag.trim().length);

    return isCountValid(hashtags) && !isDuplicates(hashtags) && hashtags.every(isHashtagValid);
  };

  pristine.addValidator(hashtagsField, validateHashtags, 'Формат введенных хештегов не соответствует требованиям.');

  if (!pristine.validate()) {
    return false;
  }

  await (new ApiService()).createPost(new FormData(form))
    .then((data) => {
      console.log(data);
      form.reset();
      alert('Фотография отправлена!');
    })
    .catch((e) => alert(e.message));

  return true;
};
