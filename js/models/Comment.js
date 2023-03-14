import {getRandomElement, getRandomInt} from '../helpers/main.js';
import {TEST_COMMENTS, TEST_NAMES} from '../utils/const.js';

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
   * Generates mock comment
   *
   * @param {number} id Comment identifier
   * @param {number} postId Post identifier
   * @return {Comment}
   */
  static mock(id, postId) {
    return new this(
      parseInt(postId.toString() + id, 10),
      `img/avatar-${getRandomInt(1, 6)}.svg`,
      getRandomElement(TEST_COMMENTS),
      getRandomElement(TEST_NAMES)
    );
  }
}

export default Comment;
