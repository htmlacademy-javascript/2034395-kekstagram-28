class PostNotSentException extends Error {
  constructor() {
    super();

    this.message = 'Пост не отправлен';
  }
}

export default PostNotSentException;
