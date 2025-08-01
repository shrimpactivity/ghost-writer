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
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'")  // Normalize unicode apostrophes
    .replace(/[^a-z\s']/g, '')  
    .replace(/\s+/g, ' ')    
    .trim();
};
