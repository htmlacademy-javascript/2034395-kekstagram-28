import test from './helpers/test.js';
import {
  getClearFloat,
  getNumbersFromString,
  isStringPalindrome,
  supplementString,
  validateStringLength
} from './helpers/main.js';

const ENV_MODES = {
  dev: 'development',
  prod: 'production'
};

const ENV_MODE = ENV_MODES.prod;

const isDev = ENV_MODE === ENV_MODES.dev;

if (isDev) {
  // eslint-disable-next-line no-console
  console.log('!!! DEVELOPER MODE ENABLED !!! \n');

  // validateStringLength(string: string, maxLength: number)
  test(true, validateStringLength, 'проверяемая строка', 20);
  test(true, validateStringLength, 'проверяемая строка', 18);
  test(false, validateStringLength, 'проверяемая строка', 10);

  // isStringPalindrome(string: string)
  test(true, isStringPalindrome, 'топот');
  test(true, isStringPalindrome, 'ДовОд');
  test(false, isStringPalindrome, 'Кекс');
  test(true, isStringPalindrome, 'Лёша на полке клопа нашёл');

  // getNumbersFromString(val: string|number)
  test(2023, getNumbersFromString, '2023 год');
  test(2022, getNumbersFromString, 'ECMAScript 2022');
  test(105, getNumbersFromString, '1 кефир, 0.5 батона');
  test(7, getNumbersFromString, 'агент 007');
  test(NaN, getNumbersFromString, 'а я томат');
  test(2023, getNumbersFromString, 2023);
  test(1, getNumbersFromString, -1);
  test(15, getNumbersFromString, 1.5);

  // supplementString(string: string, minLength: number, filling: string)
  test('01', supplementString, '1', 2, '0');
  test('0001', supplementString, '1', 4, '0');
  test('werq', supplementString, 'q', 4, 'werty');
  test('wweq', supplementString, 'q', 4, 'we');
  test('qwerty', supplementString, 'qwerty', 2, '0');

  // getClearFloat(val: number)
  test('1.0', getClearFloat, '1');
  test('1.0', getClearFloat, 1);
  test('1.0', getClearFloat, '1.00000');
  test('1.0', getClearFloat, 1.0000);
  test('1.0', getClearFloat, '1.0');
  test('1.0001', getClearFloat, '1.0001');
  test('1.0001', getClearFloat, '1.000111');
  test('1.001', getClearFloat, '1.001');
  test('1.01', getClearFloat, '1.01');
  test('1.1', getClearFloat, '1.100');
  test('2.11', getClearFloat, '2.110034582');
}
