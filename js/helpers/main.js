/**
 * Checks a string for the specified maximum length
 *
 * @param {string} string String to check
 * @param {number} maxLength Max length of string
 * @return {boolean} String test result
 */
const validateStringLength = (string, maxLength) => string.trim().length <= maxLength;

/**
 * Checks if a string is a palindrome
 *
 * @param {string} value String to check
 * @return {boolean} String test result
 */
const isStringPalindrome = (value) => {
  const result = value.toLowerCase().replace(/\W/g, '');

  return result === [...result].reverse().join('');
};

/**
 * Gets all numbers from string and concat them
 *
 * @param value Any value which contains numbers
 * @return {number|NaN} All numbers that were found and combined into one number or NaN if numbers not exists
 */
const getNumbersFromString = (value) => parseInt(value.toString().replace(/\D/g, ''), 10);

/**
 * If the length of the string is less than that specified in minLength, then it inserts the value
 * specified in filling at the beginning of it exactly as many times as necessary until the string is exactly completed
 *
 * @param {string} string String which need to be supplemented
 * @param {number} minLength Minimal length of string
 * @param {string} filling Supplement to origin string
 * @return {string} Supplemented with filling origin string
 */
const supplementString = (string, minLength, filling) => {
  if (string.length >= minLength) {
    return string;
  }

  const splitString = string.split('');
  const splitFilling = filling.split('');

  const diff = minLength - string.length;

  if (diff === splitFilling.length) {
    splitString.unshift(filling);

    return splitString.join('');
  }

  if (diff < splitFilling.length) {
    splitFilling.length = diff;

    splitString.unshift(splitFilling.join(''));

    return splitString.join('');
  }

  const insertsCount = diff / splitFilling.length;

  const insertValues = [];

  for (let i = 0; i < Math.floor(insertsCount); i++) {
    insertValues.unshift(filling);
  }

  if (insertsCount % 1 !== 0) {
    const float = insertsCount - Math.floor(insertsCount);
    const symbolsCount = Math.ceil(splitFilling.length * float);

    for (let i = 0; i < symbolsCount; i++) {
      insertValues.unshift(splitFilling[i]);
    }
  }

  splitString.unshift(insertValues.join(''));

  return splitString.join('');
};

/**
 * Returns a floating point number compressed to the minimum length without losing the mathematical value
 *
 * @param value Any value which contains number (integer or float)
 * @return {string} Floating point number
 */
const getClearFloat = (value) =>
  value - parseInt(value, 10) === 0 ?
    parseFloat(value).toFixed(1) :
    Number(parseFloat(value).toFixed(4)).toString();

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
  validateStringLength,
  isStringPalindrome,
  getNumbersFromString,
  supplementString,
  getClearFloat,
  getRandomInt,
  getRandomElement,
};
