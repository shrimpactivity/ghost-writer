export interface FullBook {
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

export interface Book {
  id: number;
  title: string;
  authors: string[];
  url?: string;
  text?: string;
}

export interface InitData {
  books: Book[];
  defaultText: string;
}

export interface RequestError {
  code: number;
  message: string;
}