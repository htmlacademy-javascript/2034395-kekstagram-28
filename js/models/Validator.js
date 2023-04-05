import addImageFormValidator from '../validators/addImageFormValidator.js';

class Validator {
  static ADD_IMAGE_FORM_VALIDATOR = 'addImage';

  /**
   * @type {?string}
   */
  validator = null;

  /**
   * @param {string} validator
   */
  constructor(validator) {
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

    switch (self.validator) {
      case self.ADD_IMAGE_FORM_VALIDATOR:
        return addImageFormValidator();
      default:
        return false;
    }
  }
}

export default Validator;
