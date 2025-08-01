import { MarkovCoil } from "markov-coil";
import { logger } from "../config/logger";
import { Ghost } from "../types/ghost";
import { Book, FullBook, GutendexResponse } from "../types/gutenberg";
import { formatGutenbergText } from "../util/format";
import { tokenize } from "../util/tokenize";

export class GutenbergService {
  private baseURL = "https://gutendex.com/books";

  async findById(id: number): Promise<Book | null> {
    try {
      const response = await fetch(`${this.baseURL}/${id}`);
      const fullBook = (await response.json()) as FullBook;
      if (fullBook.id === undefined) {
        return null;
      }
      return this.trimBook(fullBook);
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
      return fullBooks.map((book) => this.trimBook(book)).filter(book => book.url !== undefined);
    } catch (err: any) {
      logger.error(err.message);
      throw new Error(`Error searching books on gutendex`);
    }
  }

  async findGhostById(id: number): Promise<Ghost | null>  {
    try {
      const book = await this.findById(id);
      if (!book || !book.url) {
        return null;
      }
      const ghost = await this.convertBook(book)
      return ghost;
    } catch (err: any) {
      throw(err);
    }
  }

  private trimBook(book: FullBook): Book {
    const formatKey = Object.keys(book.formats).filter(key => key.indexOf("text/plain") !== -1)[0];
    const url = book.formats[formatKey];
    return {
      id: book.id,
      title: book.title,
      authors: book.authors.map((author) => author.name),
      url: url
    };
  }

  private async convertBook(book: Book): Promise<Ghost>  {
    if (book.url === undefined) {
      throw new Error("Gutenberg book does not have plain text url");
    }
    try {
      const res = await fetch(book.url);
      const text = await res.text();
      const formattedText = formatGutenbergText(text);
      const markov = new MarkovCoil(tokenize(formattedText));
      return {
        id: Math.random(),
        gutenbergId: book.id,
        title: book.title,
        author: book.authors[0],
        data: markov.serialize(),
        local: false,
      }
    } catch (err: any) {
      logger.error(err.message);
      throw new Error(`Error fetching plain text from Project Gutenberg with id ${book.id}`);
    }
  }
}
