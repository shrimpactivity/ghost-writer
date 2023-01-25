import { useState } from 'react';

const useOptions = () => {
  const [suggestionAccuracy, setSuggestionAccuracy] = useState(3);
  const [numSuggestedWords, setNumSuggestedWords] = useState(1);
  const [showSuggestionPreview, setShowSuggestionPreview] = useState(true);

  const onSuggestionAccuracyChange = (event) => {
    setSuggestionAccuracy(Number(event.target.value));
  }

  const onNumSuggestedWordsChange = (event) => {
    setNumSuggestedWords(Number(event.target.value));
  }

  const onShowSuggestionPreviewChange = () => {
    setShowSuggestionPreview(!showSuggestionPreview);
  }

  return {
    suggestionAccuracy,
    numSuggestedWords,
    showSuggestionPreview,
    suggestionAccuracyField: {value: suggestionAccuracy, onChange: onSuggestionAccuracyChange},
    numSuggestedWordsField: {value: numSuggestedWords, onChange: onNumSuggestedWordsChange},
    showSuggestionPreviewField: {value: showSuggestionPreview, onChange: onShowSuggestionPreviewChange},
  };
};

export default useOptions;
