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
  useEffect(() => updateLocalStorage(), [settings]);

  function fetchInitData() {
    setIsLoading(true);
    bookService
      .getInit()
      .then((data) => {
        notify("Initializing cemetery abstraction...");
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
        notify("Ritual completed, proceed with spectral collaboration", 3000);
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
  }

  function updateLocalStorage() {
    localStorage.setItem("settings", JSON.stringify(settings));
  }

  // TODO:
  function addBook() {}

  return (
    <GhostsContext.Provider
      value={{ ghost, books, settings, setSettings, isLoading, addBook }}
    >
      {children}
    </GhostsContext.Provider>
  );
}
