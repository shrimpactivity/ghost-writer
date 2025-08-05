import { Book, InitData } from "../types";

export class BookService {
  private static readonly BASE_URL = import.meta.env.VITE_API_URL || "/api";
  
  async getInit() {
    const response = await fetch(`${BookService.BASE_URL}/init`);
    if (!response.ok) {
      await this.handleError(response);
    }
    const initData: InitData = await response.json()
    return initData;
  }

  async search(query: string) {
    const response = await fetch(`${BookService.BASE_URL}/gutenberg?search=${encodeURIComponent(query)}`);
    if (!response.ok) {
      await this.handleError(response);
    }
    const books: Book[] = await response.json();
    return books;
  }

  async getById(id: number) {
    const response = await fetch(`${BookService.BASE_URL}/gutenberg/${id}`);
    if (!response.ok) {
      await this.handleError(response);
    }
    const book: Book = await response.json();
    return book;
  }

  private async handleError(response: Response) {
    const body = await response.text();
    const errorMessage = `${response.status} - ${body}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}