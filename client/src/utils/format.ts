export const formatAuthorName = (author: string) => {
  // Remove parenthetical
  if (author.indexOf("(") !== -1) {
    author = author.slice(0, author.indexOf("(")).trim();
  }

  if (author.indexOf(',') === -1) {
    return author;
  }

  const last = author.slice(0, author.indexOf(','));
  const first = author.slice(author.indexOf(',') + 1);
  return `${first} ${last}`;
}

export const capitalize = (text: string) => {
  if (text.trim().length === 0) {
    return text;
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const endsWithTerminalPunctuation = (text: string) => {
  if (!text || text.length === 0) {
    return false;
  }

  const terminalRegex = /[.!?]$/;

  return terminalRegex.test(text);
}