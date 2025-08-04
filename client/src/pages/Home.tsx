import CenterHorizontal from "../components/layout/CenterHorizontal";
import { useGhosts } from "../context/Ghosts";
import { useNotification } from "../context/Notification";
import { useComposition } from "../hooks/Composition";
import { formatAuthorName } from "../utils/format";

function Home() {
  const { books, ghost, isLoading, setCurrentBook } = useGhosts();
  const { notify } = useNotification();
  const composition = useComposition();

  function handleGhostSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    const bookId = Number(e.target.value);
    const book = books.find((book) => book.id === bookId);
    setCurrentBook(book!);
  }

  function handleCompositionInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const value = e.target.value;
    if (!value.trim()) {
      composition.setInput("");
    }
    if (value.endsWith(" ")) {
      composition.concatInput();
    } else {
      composition.setInput(value);
    }
  }

  if (isLoading) {
    return (
      <CenterHorizontal>
        <p>TODO: Loading...</p>
      </CenterHorizontal>
    );
  }

  const rawTokens = composition.text.trim().split(" ");

  return (
    <CenterHorizontal>
      <div>
        <h1>Home</h1>
        <div className="ghost-select">
          <select
            value={ghost?.book.id}
            onChange={(e) => handleGhostSelection(e)}
          >
            {books.map((book) => (
              <option
                key={book.id}
                value={book.id}
              >{`${formatAuthorName(book.authors[0])} (${book.title})`}</option>
            ))}
          </select>
        </div>
        <div className="editor" style={{ display: "flex", gap: "0.5em", flexWrap: "wrap" }}>
          {rawTokens.map((token, i) => (
            <span key={i}>{token}</span>
          ))}
          <input
            type="text"
            className="composition-input"
            value={composition.input}
            onChange={(e) => handleCompositionInputChange(e)}
          />
          <span className="prediction" style={{color: "red"}}>{composition.prediction.join(" ")}</span>
        </div>
      </div>
    </CenterHorizontal>
  );
}

export default Home;
