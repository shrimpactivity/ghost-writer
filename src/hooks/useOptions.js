import { useState } from 'react';

const useOptions = () => {
  const [suggestionAccuracy, setSuggestionAccuracy] = useState(3);
  const [suggestionCount, setSuggestionCount] = useState(1);
  const [showSuggestionPreview, setShowSuggestionPreview] = useState(true);

  const onSuggestionAccuracyChange = (event) => {
    console.log('Suggestion accuracy changed to: ', event.target.value);
    setSuggestionAccuracy(Number(event.target.value));
  }

  const onSuggestionCountChange = (event) => {
    console.log('Number of suggested words changed to: ', event.target.value);
    setSuggestionCount(Number(event.target.value));
  }

  const onShowSuggestionPreviewChange = () => {
    console.log('Suggestion preview changed to: ', !showSuggestionPreview);
    setShowSuggestionPreview(!showSuggestionPreview);
  }

  return {
    suggestionAccuracy,
    suggestionCount,
    showSuggestionPreview,
    suggestionAccuracyField: {value: suggestionAccuracy, onChange: onSuggestionAccuracyChange},
    suggestionCountField: {value: suggestionCount, onChange: onSuggestionCountChange},
    showSuggestionPreviewField: {value: showSuggestionPreview, onChange: onShowSuggestionPreviewChange},
  };
};

export default useOptions;
