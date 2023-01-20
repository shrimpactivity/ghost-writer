/**
 * Returns an array of tokenized words that have had whitespace/special chars removed and lowercased.
 *
 * @param {String} text The text to be tokenized.
 * @returns {Array} an array of string tokens.
 */
const parseIntoTokens = (text) => {
  // How not to make a regex:
  // const relicOfSin = /\d:\d|[A-Z]{2,}\.*|\d+\.|[:;@#$%^&*()\[\]{}=+\\\/`~<>"\d_\u007B-\uFFFF]+/gu;

  if (!text.trim()) {
    return [];
  }
  const result = text
    .replace(/[-.?!]+/g, ' ')
    .replace(/[^A-Za-z\s]+/g, '')
    .replace(/[\s]+/g, ' ')
    .toLowerCase()
    .trim();

  if (!result) {
    return [];
  }
  return result.split(' ');
};

module.exports = parseIntoTokens;
