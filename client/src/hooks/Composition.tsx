import { useEffect, useState } from "react";
import { useGhosts } from "../context/Ghosts";
import { tokenize } from "../utils/tokenize";

export function useComposition() {
  const { getPrediction, ghost } = useGhosts();
  const [composition, setComposition] = useState<string[]>([]);
  const [compositionInput, setCompositionInput] = useState("");
  const [prediction, setPrediction] = useState<string[]>([]);

  useEffect(() => {
    const tokens = tokenize(composition.join(" "));
    setPrediction(getPrediction(tokens));
  }, [composition, ghost]);

  function addInputToComposition() { 
    // TODO: consider punctuation
    if (compositionInput !== " ") {
      setComposition(composition.concat(compositionInput));
    }
    const newComposition = composition.concat(compositionInput);
    setComposition(newComposition);
    setCompositionInput("");
  }

  function addPredictionToComposition() {
    setComposition(composition.concat(" ", prediction.join(' ')));
    setCompositionInput("");
  }

  function moveInputBack() {
    if (composition.length > 0) {
      const newInput = composition[composition.length - 1];
      const newComposition = words.slice(0, words.length - 1).join(" ");
      setComposition(newComposition);
      setCompositionInput(lastWord);
    }
  }

  function addNewLine() {
    setComposition(composition.concat(" \n"));
  }

  function compositionString() {
    return composition.join(" ");
  }

  return {
    composition,
    setText: setComposition,
    input: compositionInput,
    setInput: setCompositionInput,
    prediction,
    concatInput: addInputToComposition,
    concatPrediction: addPredictionToComposition,
    moveInputBack,
    addNewLine
  };
}
