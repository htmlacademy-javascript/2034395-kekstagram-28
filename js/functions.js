const validateStringLength = (string, maxLength) => string.length <= maxLength;

function isStringPalindrome(string) {
  let result = string.toLowerCase()
    .split(" ")
    .join("")
    .split("");

  return result.join("") === result.reverse().join("");
}

function getNumbersFromString(string) {
  if (typeof string === "number") {
    string = string.toString();
  }

  const splitString = string.split(" ")
    .join("")
    .split("");

  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  let result = [];

  splitString.forEach(el => {
    if (values.includes(parseInt(el))) {
      result.push(el);
    }
  });

  if (result.length === 0) {
    return NaN;
  }

  return result.join("");
}

function supplementString(string, minLength, filling) {
  if (string.length >= minLength) {
    return string;
  }

  let splitString = string.split("");
  let splitFilling = filling.split("");

  let diff = minLength - string.length;

  if (diff === splitFilling.length) {
    splitString.unshift(filling);

    return splitString.join("");
  }

  if (diff < splitFilling.length) {
    splitFilling.length = diff;

    splitString.unshift(splitFilling.join(""));

    return splitString.join("");
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

  splitString.unshift(result.join(""));

  return splitString.join("");
}
