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