class Comment {
  /**
   * @param {int} id
   * @param {string} avatarUrl
   * @param {string} message
   * @param {string} name
   */
  constructor(id, avatarUrl, message, name) {
    this._id = id;
    this._avatar = avatarUrl;
    this._message = message;
    this._name = name;
  }

  get id() {
    return this._id;
  }

  get avatar() {
    return this._avatar;
  }

  get message() {
    return this._message;
  }

  get name() {
    return this._name;
  }
}

export default Comment;
