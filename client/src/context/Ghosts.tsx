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
  weighted: false,
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
        notify("Processing ecto-plasmetic prose...")
        const markov = new MarkovCoil(bookWithText.text.split(" "));
        setGhost({ book: { ...bookWithText, text: undefined }, markov });
        setIsLoading(false);
        notify(`Data ritual completed`, 5000);
      })
      .catch((err) => {
        notify(err.message, 10000);
        setIsLoading(false);
      });
  }

  function loadBooks(): Promise<BookWithText> {
    return bookService.getInit().then((data) => {
      setBooks(data.books);
      notify("Summoning ghost through data ritual...");
      return data.default as BookWithText;
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

        notify("Processing ecto-plasmetic prose...");
        const markov = new MarkovCoil(text.split(" "));
        setGhost({ book, markov });
        setIsLoading(false);
        notify(
          "Summoning completed",
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
      const prediction = ghost.markov.predictSequence(
        tokensToUse,
        settings.predictionLength,
        settings.weighted,
      );
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
        getPrediction,
      }}
    >
      {children}
    </GhostsContext.Provider>
  );
}
