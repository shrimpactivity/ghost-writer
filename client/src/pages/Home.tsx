import { useRef } from "react";
import CenterHorizontal from "../components/layout/CenterHorizontal";
import { useGhosts } from "../context/Ghosts";
import { useComposition } from "../hooks/Composition";
import "./Home.css";
import LoadingIcon from "../components/LoadingIcon";

function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { books, ghost, isLoading, setCurrentBook } = useGhosts();
  const composition = useComposition();

  function handleGhostSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    const bookId = Number(e.target.value);
    const book = books.find((book) => book.id === bookId);
    setCurrentBook(book!);
  }

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

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

  function handleInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.code) {
      case "Backspace":
        if (composition.input.length === 0) {
          e.preventDefault();
          composition.moveInputBack();
        }
        break;
      case "Tab":
        e.preventDefault();
        composition.concatPrediction();
        break;

      case "Enter":
        // Add proposal to composition. Don't add suggestion.
        // Pressing enter multiple times should create more than one new line.
        e.preventDefault();
        composition.addNewLine();
        break;
    }
  }

  const handleAcceptPrediction = () => {
    composition.concatPrediction();
    focusInput();
  };

  const handleCopyComposition = () => {
    const formattedContent = composition.tokens.join(" ");
    navigator.clipboard.writeText(formattedContent);
    focusInput();
  };

  const handleClear = () => {
    if (window.confirm("Delete entire composition?")) {
      composition.clear();
    }
    focusInput();
  };

  function authorCompare(a?: string, b?: string) {
    if (!a) return 1;
    if (!b) return -1;
    return a.localeCompare(b);
  }

  if (isLoading) {
    return (
      <CenterHorizontal>
        <LoadingIcon />
      </CenterHorizontal>
    );
  }

  return (
    <CenterHorizontal>
      <div>
        <CenterHorizontal>
          <div>
            <select
              className="ghost-select"
              value={ghost?.book.id}
              onChange={(e) => handleGhostSelection(e)}
            >
              {books.sort((a, b) => authorCompare(a.authors[0], b.authors[0])).map((book) => (
                <option
                  key={book.id}
                  value={book.id}
                >{`${book.authors[0] ? book.authors[0] + " " : ""}(${book.title})`}</option>
              ))}
            </select>
          </div>
        </CenterHorizontal>
        <CenterHorizontal>
          <div className="editor-btns">
            <button onClick={() => handleAcceptPrediction()}>
              Accept (Tab)
            </button>
            <button onClick={() => handleCopyComposition()}>Copy</button>
            <button onClick={() => handleClear()}>Clear</button>
          </div>
        </CenterHorizontal>

        <div className="editor" onClick={() => focusInput()}>
          {composition.tokens.map((token, i) => {
            if (token === "\n") {
              return <br key={i} />;
            }
            return (
              <span className="token" key={i}>
                {token}
              </span>
            );
          })}
          <input
            type="text"
            autoFocus
            ref={inputRef}
            className="composition-input"
            value={composition.input}
            onChange={(e) => handleCompositionInputChange(e)}
            onKeyDown={(e) => handleInputKey(e)}
            style={{
              width:
                composition.input.length === 0
                  ? "0.6em"
                  : `${composition.input.length * 0.6}em`,
            }}
          />
          {composition.prediction.map((predictionToken, i) => (
            <span key={i + 1} className="prediction-token">
              {predictionToken.split("").map((char, j) => (
                <span
                  key={Math.random()}
                  className="prediction-char"
                  style={{ "--i": (i + 1) * (j + 1) } as any}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </CenterHorizontal>
  );
}

export default Home;
