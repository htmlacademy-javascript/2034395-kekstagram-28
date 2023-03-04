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
 * @param {string} string String to check
 * @return {boolean} String test result
 */
const isStringPalindrome = (string) => {
  const result = string.toLowerCase().replace(/\W/g, '');

  return result === [...result].reverse().join('');
};

/**
 * Gets all numbers from string and concat them
 *
 * @param val Any value which contains numbers
 * @return {number|NaN} All numbers that were found and combined into one number or NaN if numbers not exists
 */
const getNumbersFromString = (val) => parseInt(val.toString().replace(/\D/g, ''), 10);

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

  const result = [];

  for (let i = 0; i < Math.floor(insertsCount); i++) {
    result.unshift(filling);
  }

  if (insertsCount % 1 !== 0) {
    const float = insertsCount - Math.floor(insertsCount);
    const symbolsCount = Math.ceil(splitFilling.length * float);

    for (let i = 0; i < symbolsCount; i++) {
      result.unshift(splitFilling[i]);
    }
  }

  splitString.unshift(result.join(''));

  return splitString.join('');
};

/**
 * Returns a floating point number compressed to the minimum length without losing the mathematical value
 *
 * @param val Any value which contains number (integer or float)
 * @return {string} Floating point number
 */
const getClearFloat = (val) =>
  val - parseInt(val, 10) === 0 ?
    parseFloat(val).toFixed(1) :
    Number(parseFloat(val).toFixed(4)).toString();

export {validateStringLength, isStringPalindrome, getNumbersFromString, supplementString, getClearFloat};
