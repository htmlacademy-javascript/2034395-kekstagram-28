import {getRandomElement, getRandomInt} from '../helpers/main.js';
import {TEST_COMMENTS, TEST_DESCRIPTIONS, TEST_NAMES} from '../utils/const.js';
import Comment from './Comment.js';
import Post from './Post.js';

class Mock {
  /**
   * Generates mock post
   *
   * @param {number} id Post identifier
   * @return {Post}
   */
  getPost(id) {
    return new Post(
      id,
      `photos/${id + 1}.jpg`,
      getRandomElement(TEST_DESCRIPTIONS),
      getRandomInt(15, 200),
      Array.from({length: getRandomInt(1, 15)}, (_, key) => this.getComment(key, id))
    );
  }

  /**
   * Generates mock comment
   *
   * @param {number} id Comment identifier
   * @param {number} postId Post identifier
   * @return {Comment}
   */
  getComment(id, postId) {
    return new Comment(
      parseInt(postId.toString() + id, 10),
      `img/avatar-${getRandomInt(1, 6)}.svg`,
      getRandomElement(TEST_COMMENTS),
      getRandomElement(TEST_NAMES)
    );
  }
}

export default Mock;
