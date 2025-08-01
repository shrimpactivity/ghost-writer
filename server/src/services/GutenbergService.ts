import { Book, FullBook, GutendexResponse } from "../types/gutenberg";

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
    } catch (error: any) {
      throw new Error(`Error retrieving book: ${error.message}`);
    }
  }

  async search(query: string): Promise<Book[]> {
    try {
      const response = await fetch(
        `${this.baseURL}?search=${encodeURIComponent(query)}`,
      );
      const data = (await response.json()) as GutendexResponse;
      const fullBooks = data.results;
      return fullBooks.map((book) => this.trimBook(book));
    } catch (error: any) {
      throw new Error(`Error searching books: ${error.message}`);
    }
  }

  private trimBook(book: FullBook): Book {
    return {
      id: book.id,
      title: book.title,
      authors: book.authors.map((author) => author.name),
    };
  }
}
