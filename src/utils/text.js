/** 
 * Returns a capitalized copy of the provided word. 
 * @param {string} word
 * @returns {word}
*/
const capitalize = (word) => {
  if (!word) {
    return word;
  }
  return word.substr(0, 1).toUpperCase() + word.substr(1);
};

/**
 * Returns true if the word ends in a period, exclamation point, or question mark.
 * @param {string} word 
 * @returns {boolean}
 */
const endsInTerminalPunctuation = (word) => {
  if (!word) return false;
  return /[!\.?]+$/.test(word);
};

/**
 * Returns true if the word begins with a punctuation character.
 * @param {string} word 
 * @returns {boolean}
 */
const beginsWithPunctuation = (word) => {
  return /^[!\.?;:\-,]+/.test(word);
};

/**
 * Removes extra whitespace from around and within the text.
 * @param {string} text 
 * @returns {string}
 */
const removeExtraWhitespace = (text) => {
  return text.replace(/[\s]+/g, ' ').trim();
};

/**
 * Formats the array of word characters into a sentence string with correct 
 * spacing and capitalization. 
 * @param {string[]} words 
 * @returns {string}
 */
const formatWordArrayIntoSentence = (words) => {
  let result = '';
  if (!words.length) {
    return result;
  }
  result += capitalize(words[0]);
  for (let i = 1; i < words.length; i += 1) {
    let current = words[i];
    let prev = words[i - 1];
    if (endsInTerminalPunctuation(prev)) current = capitalize(current);

    if (current === '\n' || beginsWithPunctuation(current)) {
      result += current;
    }
    else {
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
