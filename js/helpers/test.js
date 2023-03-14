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

export default test;
