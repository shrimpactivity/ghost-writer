export interface GutendexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: FullBook[];
}

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
}