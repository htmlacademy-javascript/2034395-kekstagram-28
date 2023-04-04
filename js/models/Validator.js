import Pristine from 'pristinejs/dist/pristine.js';

class Validator {
  static ADD_IMAGE_FORM_VALIDATOR = 'addImage';

  static VALIDATORS_METHODS = {
    ADD_IMAGE_FORM_VALIDATOR: (pristine, fields) => self.addImageFormValidator(pristine, fields),
  };

  /**
   * @param {Element} form Form to validate
   * @param {string} validator Name of validator, prefer to use class constants
   * @param {string|string[]} fields
   */
  constructor(form, validator, fields = 'all') {
    const pristine = new Pristine(form);

    this.validateMethod = self.VALIDATORS_METHODS[validator](pristine, fields);
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

    this.validateMethod();
  }

  /**
   * Checks if fields should be validated
   *
   * @param {string | string[]} fields
   * @param {string} field
   * @returns {boolean}
   */
  shouldValidateField(fields, field) {
    return fields === field || fields.includes(field) || field === 'all';
  }

  /**
   * Add Image Form validator
   *
   * @param {Pristine} pristine
   * @param {string | string[]} fields
   *
   * @return {boolean}
   */
  addImageFormValidator(pristine, fields) {
    if (!pristine || !fields) {
      return false;
    }

    if (self.shouldValidateField(fields, 'hashtags')) {
      // const hashtags = document.querySelector('.text__hashtags').value;

      // const splitHashtags = hashtags.split();

      // splitHashtags.forEach((hashtag) => {
      //
      // });
    }

    if (self.shouldValidateField(fields, 'description')) {
      // const description = document.querySelector('.text__description').value;
    }

    return pristine.validate(null, false);
  }
}

export default Validator;
