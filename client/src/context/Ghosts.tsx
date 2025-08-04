import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Book, Ghost, GhostSettings } from "../types";
import { useNotification } from "./Notification";
import { BookService } from "../services/BookService";
import { MarkovCoil } from "markov-coil";
import { formatAuthorName } from "../utils/format";

interface GhostsContextType {
  ghost: Ghost | undefined;
  books: Book[];
  addBook: (book: Book) => void;
  settings: GhostSettings;
  setSettings: (settings: GhostSettings) => void;
  isLoading: boolean;
}

const GhostsContext = createContext<GhostsContextType | undefined>(undefined);

export function useGhosts() {
  const context = useContext(GhostsContext);
  if (!context) {
    throw new Error("useGhosts must be within GhostsProvider");
  }
  return context;
}

const defaultSettings: GhostSettings = {
  predictionLength: 1,
  predictionDepth: 3,
};

const bookService = new BookService();

export function GhostsProvider({ children }: PropsWithChildren) {
  const { notify } = useNotification();
  const [books, setBooks] = useState<Book[]>([]);
  const [settings, setSettings] = useState(defaultSettings);
  const [ghost, setGhost] = useState<Ghost>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => fetchInitData(), []);
  useEffect(() => loadLocalStorage(), []);
  useEffect(() => updateLocalStorage(), [settings, books]);

  function fetchInitData() {
    setIsLoading(true);
    notify("Initializing cemetery abstraction...");
    bookService
      .getInit()
      .then((data) => {
        const books = data.books;
        setBooks(books);
        notify("Summoning ghost through data ritual...");
        const tokens = data.defaultText.split(" ");
        const markov = new MarkovCoil(tokens);
        const defaultBookId = 2701; // Moby Dick
        const defaultBook = books.find((book) => book.id === defaultBookId);
        if (defaultBook === undefined) {
          throw new Error("Default book not available");
        }
        setGhost({ book: defaultBook, markov });
        notify("Data initialization ritual completed, proceed with spectral collaboration", 3000);
      })
      .catch((err) => {
        notify(err.message, 10000);
        setIsLoading(false);
      });
  }

  function loadLocalStorage() {
    const settingsJSON = localStorage.getItem("settings");
    if (settingsJSON) {
      setSettings(JSON.parse(settingsJSON));
    }

    const booksJSON = localStorage.getItem("books");
    if (booksJSON) {
      setBooks(JSON.parse(booksJSON));
    }
  }

  function updateLocalStorage() {
    localStorage.setItem("settings", JSON.stringify(settings));
    localStorage.setItem("books", JSON.stringify(books));
  }

  function addBook(book: Book) {
    setIsLoading(true);
    notify(`Resurrecting ${formatAuthorName(book.authors[0])}...`);
    bookService.getById(book.id).then(bookWithText => {
      const { text } = bookWithText;
      if (!text) {
        notify("Unable to locate book text on Project Gutenberg");
        return;
      }
      setBooks([...books, book]);
      notify("Parsing ecto-language...");
      const markov = new MarkovCoil(text.split(" "))
      setGhost({ book, markov })
      setIsLoading(false);
      notify("Summoning completed, proceed with spectral collaboration", 3000);
    }).catch(err => {
      console.error(err);
      notify(err.message);
    })
  }

  return (
    <GhostsContext.Provider
      value={{ ghost, books, settings, setSettings, isLoading, addBook }}
    >
      {children}
    </GhostsContext.Provider>
  );
}
