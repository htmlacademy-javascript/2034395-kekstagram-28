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

  /**
   * Prepare comment to append in Document Fragment
   *
   * @return {Node} Result Node
   */
  prepareComment() {
    const template = document.querySelector('#comments');

    const comment = template.content.cloneNode(true);

    comment.querySelector('.social__picture').src = this.avatar;
    comment.querySelector('.social__picture').alt = this.name;
    comment.querySelector('.social__text').textContent = this.message;

    return comment;
  }
}

export default Comment;
