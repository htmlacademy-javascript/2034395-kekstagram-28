class GetPostsException extends Error {
  constructor() {
    super();

    this.message = 'Ошибка запроса постов';
  }
}

export default GetPostsException;
