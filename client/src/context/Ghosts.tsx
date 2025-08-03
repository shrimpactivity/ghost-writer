import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Book, Ghost, GhostSettings } from "../types";
import { useNotification } from "./Notification";
import { BookService } from "../services/BookService";
import { MarkovCoil } from "markov-coil";

interface GhostsContextType {
  ghost: Ghost;
  books: Book[];
  addBook: (book: Book) => void;
  search: (query: string) => Promise<Book[]>;
  results: Book[];
  settings: GhostSettings;
  setSettings: (settings: GhostSettings) => void;
  userTokens: string[];
  prediction: string;
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
  predictionDepth: 3
}

const bookService = new BookService();

export function GhostsProvider({ children}: PropsWithChildren) {
  const { notify } = useNotification();
  const [books, setBooks] = useState<Book[]>([]);
  const [settings, setSettings] = useState(defaultSettings);
  const [ghost, setGhost] = useState();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => loadInitData(), []);
  useEffect(() => loadLocalStorage(), []);

  function loadInitData() {
    setIsLoading(true);
    bookService.getInit().then((data) => {
      notify("")
      const books = data.books;
      setBooks(books);
      const tokens = data.defaultText.split(" ");
      const markov = new MarkovCoil(tokens);

    }).catch(err => {
      notify(err.message);
      setIsLoading(false);
    }) 
  }

  return (
    <GhostsContext.Provider value={}>
      {children}
    </GhostsContext.Provider>
  )
}

