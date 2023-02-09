import { useState } from 'react';
import storage from '../services/localStorage';

const useOptions = () => {

  const [options, setOptions] = useState({
    suggestionAccuracy: 3,
    suggestionCount: 1,
    showSuggestionPreview: true,
    highlightGhostWords: true,
    weightedSuggestions: true,
  })

  const onSuggestionAccuracyChange = (event) => {
    const newValue = Number(event.target.value);
    console.log('Suggestion accuracy changed to: ', newValue);
    setOptions({...options, suggestionAccuracy: newValue});
  }

  const onSuggestionCountChange = (event) => {
    const newValue = Number(event.target.value);
    console.log('Number of suggested words changed to: ', newValue);
    setOptions({...options, suggestionCount: newValue});
  }

  const onShowSuggestionPreviewChange = () => {
    const newValue = !options.showSuggestionPreview;
    console.log('Suggestion preview changed to: ', newValue);
    setOptions({...options, showSuggestionPreview: newValue});
  }

  const onHighlightGhostWordsChange = () => {
    const newValue = !options.highlightGhostWords;
    console.log('Highlight ghost words changed to: ', newValue);
    setOptions({...options, highlightGhostWords: newValue});
  }

  const onWeightedSuggestionsChange = () => {
    const newValue = !options.weightedSuggestions;
    console.log('Weighted suggestions changed to: ', newValue);
    setOptions({...options, weightedSuggestions: newValue});
  }

  return {
    values: options,
    setOptions,
    suggestionAccuracy: options.suggestionAccuracy,
    suggestionCount: options.suggestionCount,
    showSuggestionPreview: options.showSuggestionPreview,
    highlightGhostWords: options.highlightGhostWords,
    weightedSuggestions: options.weightedSuggestions, 
    suggestionAccuracyField: {value: options.suggestionAccuracy, onChange: onSuggestionAccuracyChange},
    suggestionCountField: {value: options.suggestionCount, onChange: onSuggestionCountChange},
    showSuggestionPreviewField: {value: options.showSuggestionPreview, onChange: onShowSuggestionPreviewChange},
    highlightGhostWordsField: {value: options.highlightGhostWords, onChange: onHighlightGhostWordsChange},
    WeightedSuggestionsField: {value: options.weightedSuggestions, onChange: onWeightedSuggestionsChange}
  };
};

export default useOptions;
