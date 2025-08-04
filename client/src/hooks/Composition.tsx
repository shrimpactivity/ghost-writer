import { useEffect, useState } from "react";
import { useGhosts } from "../context/Ghosts";
import { tokenize } from "../utils/tokenize";

export function useComposition() {
  const { getPrediction, ghost } = useGhosts();
  const [composition, setComposition] = useState("");
  const [compositionInput, setCompositionInput] = useState("");
  const [prediction, setPrediction] = useState<string[]>([]);

  useEffect(() => {
    const tokens = tokenize(composition);
    setPrediction(getPrediction(tokens));
  }, [composition, ghost]);

  function addInputToComposition() {
    // TODO: consider punctuation
    setComposition(composition.concat(" ", compositionInput.trim()));
    setCompositionInput("");
  }

  function addPredictionToComposition() {
    setComposition(composition.concat(" ", prediction.join(' ')));
  }

  return {
    text: composition,
    setText: setComposition,
    input: compositionInput,
    setInput: setCompositionInput,
    prediction,
    concatInput: addInputToComposition,
    concatPrediction: addPredictionToComposition
  };
}
