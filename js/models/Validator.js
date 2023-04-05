class Validator {
  static ADD_IMAGE_FORM_VALIDATOR = 'addImage';

  /**
   * @param {HTMLFormElement} form Form to validate
   * @param {string} validator Name of validator, prefer to use class constants
   */
  constructor(form, validator) {
    this.form = form;
    this.pristine = new Pristine(form);
    this.validator = validator;
  }

  /**
   * Validate base method
   *
   * @param {Event} e
   *
   * @return {boolean}
   */
  validate(e) {
    e.preventDefault();

    let isValid = true;

    switch (this.validator) {
      case self.ADD_IMAGE_FORM_VALIDATOR:
        isValid = (new Validator(this.form, this.validator)).addImageFormValidator();
        break;
      default:
        isValid = false;
        break;
    }

    if (isValid) {
      this.form.submit();
      return true;
    }

    return false;
  }

  /**
   * Add Image Form validator
   *
   * @return {boolean}
   */
  addImageFormValidator() {
    if (!this.pristine) {
      return false;
    }

    const hashtags = document.querySelector('.text__hashtags');

    const splitHashtags = hashtags.value.split().map((el) => el.toLowerCase());

    const validateHashtags = () => {
      if (splitHashtags.length > 5) {
        return false;
      }

      if (splitHashtags.length !== new Set(splitHashtags).size) {
        return false;
      }

      splitHashtags.forEach((hashtag) => {
        const regexp = /^#[a-zа-яё0-9]{1, 19}$/i;

        if (!regexp.test(hashtag.toString())) {
          return false;
        }
      });
    };

    this.pristine.addValidator(hashtags, validateHashtags, 'Формат введенных хэштегов не соответствует требованиям.');

    return this.pristine.validate();
  }
}

export default Validator;
