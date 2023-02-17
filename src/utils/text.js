const capitalize = (word) => {
  if (!word) {
    return word;
  }
  return word.substr(0, 1).toUpperCase() + word.substr(1);
};

const endsInTerminalPunctuation = (word) => {
  if (!word) return false;
  return /[!.?]+$/.test(word);
};

const beginsWithPunctuation = (word) => {
  return /^[!.?;:\-,]+/.test(word);
};

const removeExtraWhitespace = (text) => {
  return text.replace(/[\s]+/g, ' ').trim();
};

const formatWordArrayIntoSentence = (input) => {
  let result = '';
  if (!input.length) {
    return result;
  }
  result += capitalize(input[0]);
  for (let i = 1; i < input.length; i += 1) {
    let current = input[i];
    let prev = input[i - 1];
    if (endsInTerminalPunctuation(prev)) {
      result += ' ' + capitalize(current);
    } else {
      result += ' ' + current;
    }
  }
  return result;
};

const formatStringIntoSentence = (input) => {
  const inputArray = removeExtraWhitespace(input).split(' ');
  return formatWordArrayIntoSentence(inputArray);
};

module.exports = {
  capitalize,
  endsInTerminalPunctuation,
  beginsWithPunctuation,
  removeExtraWhitespace,
  formatWordArrayIntoSentence,
  formatStringIntoSentence,
};
