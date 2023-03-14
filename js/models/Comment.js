import {getRandomElement, getRandomInt} from '../helpers/main.js';
import {TEST_COMMENTS, TEST_NAMES} from '../utils/const.js';

class Comment {
  _avatar = null;
  _message = null;
  _name = null;

  /**
   * @param {int} id
   */
  constructor(id) {
    this._id = id;
  }

  /**
   * @param {?string} url
   */
  set avatar(url) {
    this._avatar = url;
  }

  get avatar() {
    return this._avatar;
  }

  /**
   * @param {?string} message
   */
  set message(message) {
    this._message = message;
  }

  get message() {
    return this._message;
  }

  /**
   * @param {?string} name
   */
  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  /**
   * Generates mock comment
   *
   * @param {number} id Comment identifier
   * @param {number} postId Post identifier
   * @return {Comment}
   */
  static mock(id, postId) {
    const comment = new this(parseInt(postId.toString() + id, 10));

    comment.avatar = `img/avatar-${getRandomInt(1, 6)}.svg`;
    comment.message = getRandomElement(TEST_COMMENTS);
    comment.name = getRandomElement(TEST_NAMES);

    return comment;
  }
}

export default Comment;
