/**
 * Gets random integer in range
 *
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @return {number} Value in range
 */
const getRandomInt = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

/**
 * Gets random element from array
 *
 * @param {array} array
 * @return {*}
 */
const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

export {
  getRandomInt,
  getRandomElement,
};
