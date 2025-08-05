import { useEffect, useState } from "react";
import { useGhosts } from "../context/Ghosts";
import { tokenize } from "../utils/tokenize";
import { capitalize, endsWithTerminalPunctuation } from "../utils/format";

export function useComposition() {
  const { getPrediction, ghost } = useGhosts();
  const [tokens, setTokens] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [prediction, setPrediction] = useState<string[]>([]);

  useEffect(() => {
    const normalizedTokens = normalizedCompositionTokens();
    const formattedPrediction = formatPrediction(
      getPrediction(normalizedTokens),
    );
    setPrediction(formattedPrediction);
  }, [tokens, input, ghost]);

  useEffect(() => {
    const storedTokensJSON = localStorage.getItem("composition");
    if (storedTokensJSON) {
      setTokens(JSON.parse(storedTokensJSON));
    }
  }, []);

  useEffect(() => {
    if (tokens.length) {
      localStorage.setItem("composition", JSON.stringify(tokens));
    }
  }, [tokens]);

  function addInputToComposition() {
    if (input.trim().length > 0) {
      setTokens(tokens.concat(input));
    }
    setInput("");
  }

  function addPredictionToComposition() {
    let newTokens = [...tokens];
    if (input.trim().length > 0) {
      newTokens = newTokens.concat(input);
    }
    newTokens = newTokens.concat(prediction);
    setTokens(newTokens);
    setInput("");
  }

  function moveInputBack() {
    if (tokens.length > 0) {
      const newInput = tokens[tokens.length - 1];
      const newComposition = tokens.slice(0, tokens.length - 1);
      setTokens(newComposition);
      setInput(newInput === "\n" ? "" : newInput);
    }
  }

  function addNewLine() {
    let newTokens = [...tokens];
    if (input.trim().length > 0) {
      newTokens = newTokens.concat(input);
    }
    newTokens = newTokens.concat("\n");
    setTokens(newTokens);
    setInput("");
  }

  function normalizedCompositionTokens() {
    return tokenize(tokens.concat(input).join(" "));
  }

  function formatPrediction(predictionTokens: string[]) {
    return predictionTokens.map((token, i) => {
      if (token === "i") return "I";
      if (i === 0) {
        const lastCompositionWord = tokens[tokens.length - 1];
        const noInputAndTerminalEnding =
          input.length === 0 &&
          endsWithTerminalPunctuation(lastCompositionWord);
        const noInputAndNoComposition =
          input.length === 0 && tokens.length === 0;
        if (
          noInputAndTerminalEnding ||
          noInputAndNoComposition ||
          endsWithTerminalPunctuation(input)
        ) {
          return capitalize(token);
        }
      }
      return token;
    });
  }

  function clear() {
    setTokens([]);
    localStorage.setItem("composition", "[]");
  }

  return {
    tokens,
    setTokens,
    input,
    setInput,
    prediction,
    concatInput: addInputToComposition,
    concatPrediction: addPredictionToComposition,
    moveInputBack,
    addNewLine,
    clear,
  };
}
