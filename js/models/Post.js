import {getRandomElement, getRandomInt} from '../helpers/main.js';
import {TEST_DESCRIPTIONS} from '../utils/const.js';
import Comment from './Comment.js';

class Post {
  _url = null;
  _description = null;
  _likes = null;
  _comments = [];

  /**
   * @param {int} id
   */
  constructor(id) {
    this.id = id;
  }

  /**
   * @param {?string} url
   */
  set url(url) {
    this._url = url;
  }

  get url() {
    return this._url;
  }

  /**
   * @param {?string} description
   */
  set description(description) {
    this._description = description;
  }

  get description() {
    return this._description;
  }

  /**
   * @param {?int} likes
   */
  set likes(likes) {
    this._likes = likes;
  }

  get likes() {
    return this._likes;
  }

  /**
   * @param {Comment[]} comments
   */
  set comments(comments) {
    this._comments = comments;
  }

  get comments() {
    return this._comments;
  }

  /**
   * Generates mock post
   *
   * @param {number} id Post identifier
   * @return {Post}
   */
  static mock(id) {
    const post = new this(id);

    post.url = `photos/${id + 1}.jpg`;
    post.description = getRandomElement(TEST_DESCRIPTIONS);
    post.likes = getRandomInt(15, 200);
    post.comments = Array.from({length: getRandomInt(1, 15)}, (_, key) => Comment.mock(key, id));

    return post;
  }

  /**
   * Prepare picture to append in Document Fragment
   *
   * @return {Node} Result Node
   */
  preparePicture() {
    const template = document.querySelector('#picture');

    const picture = template.content.cloneNode(true);

    picture.querySelector('.picture__img').src = this.url;
    picture.querySelector('.picture__comments').textContent = this.comments.length.toString();
    picture.querySelector('.picture__likes').textContent = this.likes.toString();

    return picture;
  }
}

export default Post;
