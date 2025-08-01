export const removeGutenbergLabels = (text: string) => {
  let result = text.slice();
  const headerStartIndex = result.indexOf("*** START");
  if (headerStartIndex === -1) {
    return result;
  }
  const headerEndIndex = result.indexOf("***", headerStartIndex + 3) + 3;
  const footerStartIndex = result.indexOf("*** END");
  result = result.slice(headerEndIndex, footerStartIndex);
  return result;
};

export const formatGutenbergText = (text: string) => {
  return removeGutenbergLabels(text)
    .replace(/[-.?!]+/g, " ")
    .replace(/[^A-Za-z\s]+/g, "")
    .replace(/[\s]+/g, " ")
    .toLowerCase()
    .trim();
};
