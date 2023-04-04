class Post {
  /**
   * @param {int} id
   * @param {?string} url
   * @param {?string} description
   * @param {?int} likes
   * @param {Comment[]} comments
   */
  constructor(id, url, description, likes, comments) {
    this._id = id;
    this._url = url;
    this._description = description;
    this._likes = likes;
    this._comments = comments;
  }

  get id() {
    return this._id;
  }

  get url() {
    return this._url;
  }

  get description() {
    return this._description;
  }

  get likes() {
    return this._likes;
  }

  get comments() {
    return this._comments;
  }
}

export default Post;
