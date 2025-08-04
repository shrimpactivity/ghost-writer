export const tokenize = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'") // Normalize unicode apostrophes
    .replace(/[-\u2010\u2011\u2012\u2013\u2014\u2015]/g, " ") // Replace all hyphen variants with space
    .replace(/[^a-z\s']/g, "") // Remove non-alphabetic characters (keep letters, whitespace, and apostrophes)
    .replace(/\s+/g, " ") // Replace multiple whitespace/newlines with single space
    .trim()
    .split(" ");
};
