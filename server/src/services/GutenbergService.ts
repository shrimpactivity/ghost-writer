import { logger } from "../config/logger";
import { Book, FullBook, GutendexResponse } from "../types/gutenberg";
import { formatGutenbergText } from "../util/format";

export class GutenbergService {
  private baseURL = "https://gutendex.com/books";

  async findById(id: number): Promise<Book | null> {
    try {
      const response = await fetch(`${this.baseURL}/${id}`);
      const fullBook = (await response.json()) as FullBook;
      if (fullBook.id === undefined) {
        return null;
      }
      const book = this.formatBook(fullBook);
      if (book.url) {
        const textData = await fetch(book.url);
        const rawText = await textData.text();
        book.text = formatGutenbergText(rawText);
      }
      return book;
    } catch (err: any) {
      logger.error(err.message);
      throw new Error(`Error retrieving book from gutendex`);
    }
  }

  async search(query: string): Promise<Book[]> {
    try {
      const response = await fetch(
        `${this.baseURL}?search=${encodeURIComponent(query)}`,
      );
      const data = (await response.json()) as GutendexResponse;
      const fullBooks = data.results;
      return fullBooks.map((book) => this.formatBook(book)).filter(book => book.url !== undefined);
    } catch (err: any) {
      logger.error(err.message);
      throw new Error(`Error searching books on gutendex`);
    }
  }

  private formatBook(book: FullBook): Book {
    const formatKey = Object.keys(book.formats).filter(key => key.indexOf("text/plain") !== -1)[0];
    const url = book.formats[formatKey];
    return {
      id: book.id,
      title: book.title,
      authors: book.authors.map((author) => author.name),
      url: url
    };
  }
}
