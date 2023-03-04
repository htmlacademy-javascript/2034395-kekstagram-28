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

/**
 * Creates new array with a given length
 * @param {number} length Length of new array
 * @param {function} mapFn Function which generating elements values
 * @param args Other values for function params
 * @return {*[]} New array
 */
const createArray = (length, mapFn, ...args) => Array.from({length: length}, (_, key) => mapFn(key, ...args));

/**
 * Adds quotes to the value if it is a string
 *
 * @param val Any value
 * @return {string} If value is not a string returns origin value, else return a value with quotes
 */
const markVarAsString = (val) => typeof val === 'string' ? `'${val}'` : val;

/**
 * Testing function
 *
 * @param expected Any result expected from function
 * @param {function} func Function to test
 * @param args Any values that implement the parameters of the function under test
 * @return {void}
 */
const test = (expected, func, ...args) => {
  const result = func(...args);

  let _args = [...args].map((el) => `${markVarAsString(el)} (${typeof el}) \n`);

  _args = _args.join(' ');

  // eslint-disable-next-line no-console
  return console.log(`Проверяется функция ${func.name}() с аргументами: \n
    ${_args}
    Ожидается: ${markVarAsString(expected)} (${typeof expected}), ответ: ${markVarAsString(result)} (${typeof result}) \n`);
};

export {getRandomInt, getRandomElement, createArray, test};
