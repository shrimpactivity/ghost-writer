import { useState } from "react";
import { BookService } from "../services/BookService";
import { useNotification } from "../context/Notification";
import { useGhosts } from "../context/Ghosts";
import { useNavigate } from "react-router";
import CenterHorizontal from "../components/layout/CenterHorizontal";
import { Book } from "../types";

const bookService = new BookService();

interface BookTableProps {
  books: Book[];
  onRowClick: (book: Book) => void;
}

function BookTable({ books, onRowClick }: BookTableProps) {
  if (books.length === 0) {
    return <p>No results</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id} onClick={() => onRowClick(book)}>
            <td>{book.authors.join(" / ")}</td>
            <td>{book.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Search() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { setCurrentBook } = useGhosts();
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitted(true);
    notify("Searching beyond the grave...");
    bookService.search(query).then(results => {
      setSearchResults(results);
      setIsLoading(false);
      notify("");
    }).catch(err => {
      notify(err.message);
      setIsLoading(false);
    });
  };

  const handleRowClick = (book: Book) => {
    setCurrentBook(book);
    navigate("/")
  };

  return (
    <CenterHorizontal>
      <div>
        <h1>Search Project Gutenberg</h1>
        <div>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        { isLoading ? <p>Loading...</p> : null }
        { submitted && isLoading === false ? <BookTable books={searchResults} onRowClick={handleRowClick} /> : null}
      </div>
    </CenterHorizontal>
  );
}

export default Search;
