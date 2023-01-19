/**
 * Removes header/footer content from Gutenberg book texts. Both header and footer start and end with '***'
 *
 * @param {String} text
 * @returns {String}
 */
const removeGutenbergLabels = (text) => {
  let result = text.slice();
  const headerStartIndex = result.indexOf('*** START OF THE PROJECT GUTENBERG');
  if (headerStartIndex === -1) {
    return result;
  }
  const headerEndIndex = result.indexOf('***', headerStartIndex + 3);
  const footerStartIndex = result.indexOf('*** END OF THE PROJECT GUTENBERG');
  result = result.slice(headerEndIndex + 3, footerStartIndex);
  return result;
};

module.exports = removeGutenbergLabels;
