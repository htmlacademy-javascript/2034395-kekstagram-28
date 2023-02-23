const validateStringLength = (string, maxLength) => string.trim().length <= maxLength;

const isStringPalindrome = (string) => {
  let result = string.toLowerCase().replace(/\W/g, '');

  return result === [...result].reverse().join('');
}

const getNumbersFromString = (val) => parseInt(val.toString().replace(/\D/g, ''));

const supplementString = (string, minLength, filling) => {
  if (string.length >= minLength) {
    return string;
  }

  let splitString = string.split('');
  let splitFilling = filling.split('');

  let diff = minLength - string.length;

  if (diff === splitFilling.length) {
    splitString.unshift(filling);

    return splitString.join('');
  }

  if (diff < splitFilling.length) {
    splitFilling.length = diff;

    splitString.unshift(splitFilling.join(''));

    return splitString.join('');
  }

  let insertsCount = diff / splitFilling.length;

  let result = [];

  for (let i = 0; i < Math.floor(insertsCount); i++) {
    result.unshift(filling);
  }

  if (insertsCount % 1 !== 0) {
    let float = insertsCount - Math.floor(insertsCount);
    let symbolsCount = Math.ceil(splitFilling.length * float);

    for (let i = 0; i < symbolsCount; i++) {
      result.unshift(splitFilling[i]);
    }
  }

  splitString.unshift(result.join(''));

  return splitString.join('');
}
