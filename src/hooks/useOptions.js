import { useState } from 'react';

const useOptions = () => {
  const [suggestionAccuracy, setSuggestionAccuracy] = useState(3);
  const [numSuggestedWords, setNumSuggestedWords] = useState(1);
  const [showSuggestionPreview, setShowSuggestionPreview] = useState(true);

  const onSuggestionAccuracyChange = (event) => {
    console.log('Suggestion accuracy changed to: ', event.target.value);
    setSuggestionAccuracy(Number(event.target.value));
  }

  const onNumSuggestedWordsChange = (event) => {
    console.log('Number of suggested words changed to: ', event.target.value);
    setNumSuggestedWords(Number(event.target.value));
  }

  const onShowSuggestionPreviewChange = () => {
    console.log('Suggestion preview changed to: ', !showSuggestionPreview);
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
