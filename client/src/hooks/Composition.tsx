import { useEffect, useState } from "react";
import { useGhosts } from "../context/Ghosts";
import { tokenize } from "../utils/tokenize";

export function useComposition() {
  const { getPrediction } = useGhosts();
  const [composition, setComposition] = useState("");
  const [compositionInput, setCompositionInput] = useState("");
  const [prediction, setPrediction] = useState<string[]>([]);

  useEffect(() => {
    const tokens = tokenize(composition);
    setPrediction(getPrediction(tokens));
  }, [composition]);

  function addInputToComposition() {
    // TODO: consider punctuation
    setComposition(composition.concat(" ", compositionInput));
    setCompositionInput("");
  }

  function addPredictionToComposition() {
    setComposition(composition.concat(" ", prediction.join(' ')));
  }

  return {
    composition,
    setComposition,
    compositionInput,
    setCompositionInput,
    addInputToComposition,
    prediction,
    addPredictionToComposition
  };
}
