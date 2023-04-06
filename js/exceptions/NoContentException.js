class NoContentException extends Error {
  constructor() {
    super();

    this.message = 'Данные не получены';
  }
}

export default NoContentException;
