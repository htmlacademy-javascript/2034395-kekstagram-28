class Validator {
  static ADD_IMAGE_FORM = 'addImage';

  /**
   * @param {Element} form
   * @param {string} validator
   */
  constructor(form, validator) {
    this._form = form;
    this._validator = validator;
  }

  get form() {
    return this._form;
  }

  get validator() {
    return this._validator;
  }

  /**
   * Validate add image form
   *
   * @param {Event} e
   *
   * @return {boolean}
   */
  validate(e) {
    e.preventDefault();

    const pristine = new Pristine(this.form);

    switch (this.validator) {
      case Validator.ADD_IMAGE_FORM:
        this.addImageFormValidator(pristine);
        break;
      default:
        break;
    }
  }

  /**
   * Add Image Form validator
   *
   * @param {Pristine} pristine
   * @return {boolean}
   */
  addImageFormValidator(pristine) {
    return pristine.validate();
  }
}

export default Validator;
