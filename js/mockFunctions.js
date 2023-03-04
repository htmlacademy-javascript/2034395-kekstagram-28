import {getRandomElement, getRandomInt} from './utils.js';
import {TEST_COMMENTS, TEST_DESCRIPTIONS, TEST_NAMES} from './const.js';
import {createArray} from './utils.js';

/**
 * Generates mock comment to post
 *
 * @param {number} id Comment identifier
 * @param {number} postId Post identifier
 * @return {{name: string, id: number, avatar: string, message: string}}
 */
const generateComment = (id, postId) => ({
  id: parseInt(postId.toString() + id.toString(), 10),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomElement(TEST_COMMENTS),
  name: getRandomElement(TEST_NAMES)
});

/**
 *
 * @param {number} id
 * @return {{comments: {name: string, id: number, avatar: string, message: string}[], description: string, id: number, url: string, likes: number}}
 */
const generatePost = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomElement(TEST_DESCRIPTIONS),
  likes: getRandomInt(15, 200),
  comments: createArray(getRandomInt(1, 15), generateComment, id)
});

export {generatePost, generateComment};
