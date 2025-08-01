import axios from "axios"

interface GutendexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: FullBook[];
}

interface FullBook {
  id: number;
  title: string;
  authors: Array<{
    name: string;
    birth_year: number | null;
    death_year: number | null;
  }>;
  subjects: string[];
  languages: string[];
  download_count: number;
  formats: { [key: string]: string };
}

interface Book {
  id: number;
  title: string;
  authors: string[];
}

export class GutenbergService {
  private baseURL = "https://gutendex.com/books" 

  async findById(id: number): Promise<Book | null> {
    const response = await axios.get<FullBook>(`${this.baseURL}/${id}`);
    const fullBook = response.data;
    if (fullBook.id === undefined) {
      return null;
    }
    return this.trimBook(fullBook);
  }

  async search(query: string): Promise<Book[]> {
    const response = await axios.get<GutendexResponse>(`${this.baseURL}?search=${encodeURIComponent(query)}`);
    const fullBooks = response.data.results;
    return fullBooks.map(book => this.trimBook(book));
  }

  private trimBook(book: FullBook): Book {
    return {
      id: book.id,
      title: book.title,
      authors: book.authors.map(author => author.name)
    }
  }
}