import { GUTENDEX_BASE_URI } from "../config/env";
import { logger } from "../config/logger";
import { Book, FullBook, GutendexResponse } from "../types/gutenberg";
import { formatGutenbergText } from "../util/format";

export class GutendexService {
  private static readonly BASE_URL = GUTENDEX_BASE_URI;

  async findById(id: number, excludeText=false): Promise<Book | null> {
    try {
      const response = await fetch(`${GutendexService.BASE_URL}/${id}`);
      const fullBook = (await response.json()) as FullBook;
      if (fullBook.id === undefined) {
        return null;
      }
      const book = this.formatBook(fullBook);
      if (excludeText === false && book.url) {
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
        `${GutendexService.BASE_URL}?search=${encodeURIComponent(query)}`,
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
