import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { MarkovCoil } from "markov-coil";
import { BookService } from "../services/BookService";
import { useNotification } from "./Notification";
import { formatAuthorName } from "../utils/format";
import { Book, BookWithText, Ghost, GhostSettings } from "../types";

interface GhostsContextType {
  ghost: Ghost | undefined;
  books: Book[];
  setCurrentBook: (book: Book) => void;
  settings: GhostSettings;
  setSettings: (settings: GhostSettings) => void;
  isLoading: boolean;
  getPrediction: (tokens: string[]) => string[];
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
  weighted: false
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

  function fetchInitData() {
    setIsLoading(true);
    notify("Initializing cemetery abstraction...");
    loadBooks()
      .then((bookWithText) => {
        const markov = new MarkovCoil(bookWithText.text.split(" "));
        setGhost({ book: { ...bookWithText, text: undefined }, markov });
        setIsLoading(false);
        notify(
          `Data initialization ritual completed, now collaborating with ${formatAuthorName(bookWithText.authors[0])}`,
          5000,
        );
      })
      .catch((err) => {
        notify(err.message, 10000);
        setIsLoading(false);
      });
  }

  function loadBooks(): Promise<BookWithText> {
    return bookService.getInit().then((data) => {
      const storedBooksJSON = localStorage.getItem("books");
      const storedBooks = storedBooksJSON ? JSON.parse(storedBooksJSON) : [];
      const books: Book[] = storedBooks.length > 0 ? storedBooks : data.books;
      setBooks(books);
      notify("Summoning ghost through data ritual...");
      const defaultBookId = 2701; // Moby Dick
      const defaultBook = books.find((book) => book.id === defaultBookId);
      if (defaultBook === undefined) {
        throw new Error(`Default book with id ${defaultBookId} not available`);
      }
      return { ...defaultBook, text: data.defaultText } as BookWithText;
    });
  }

  function loadLocalStorage() {
    const settingsJSON = localStorage.getItem("settings");
    if (settingsJSON) {
      setSettings(JSON.parse(settingsJSON));
    }
  }

  function updateSettings(settings: GhostSettings) {
    localStorage.setItem("settings", JSON.stringify(settings));
    setSettings(settings);
  }

  function setCurrentBook(book: Book) {
    setIsLoading(true);
    notify(
      `Resurrecting ${formatAuthorName(book.authors[0])} (${book.title})...`,
    );
    bookService
      .getById(book.id)
      .then((bookWithText) => {
        const { text } = bookWithText;
        if (!text) {
          notify("Unable to locate book text on Project Gutenberg");
          return;
        }

        // Add to books stored list if not already there
        if (books.find((b) => b.id === book.id) === undefined) {
          setBooks([...books, book]);
          localStorage.setItem("books", JSON.stringify([...books, book]));
        }

        notify("Parsing ecto-language...");
        const markov = new MarkovCoil(text.split(" "));
        setGhost({ book, markov });
        setIsLoading(false);
        notify(
          `Summoning completed, now collaborating with ${formatAuthorName(book.authors[0])}`,
          5000,
        );
      })
      .catch((err) => {
        console.error(err);
        notify(err.message);
      });
  }

  function getPrediction(tokens: string[]) {
    const tokensToUse = tokens.slice(-1 * settings.predictionDepth);
    if (ghost) {
      const prediction = ghost.markov.predictSequence(tokensToUse, settings.predictionLength, settings.weighted);
      return prediction;
    }
    return [];
  }

  return (
    <GhostsContext.Provider
      value={{
        ghost,
        books,
        settings,
        setSettings: updateSettings,
        isLoading,
        setCurrentBook,
        getPrediction
      }}
    >
      {children}
    </GhostsContext.Provider>
  );
}
