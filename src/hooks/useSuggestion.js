import { useState } from 'react';
import { getServerSuggestion, getLocalSuggestion } from '../utils/getSuggestion';

const useSuggestion = () => {
  const [suggestion, setSuggestion] = useState('');
  const [suggestionTimeout, setSuggestionTimeout] = useState(null);

  /**
   * Returns true if a suggestion request to the server is queued up.
   * @returns {boolean}
   */
  const isSuggestionTimedOut = () => {
    return suggestionTimeout !== null;
  };

  const updateLocalSuggestion = (tokens, accuracy, amount, suggestionMachine) => {
    const suggestion = getLocalSuggestion(tokens, accuracy, amount, suggestionMachine);
    setSuggestion(suggestion);
  }

  const queueSuggestionUpdateFromServer = (tokens, accuracy, amount, source, timeoutLength = 200) => {

    if (!isSuggestionTimedOut()) {
      console.log('No suggestion request queued, updating immediately.');
      getServerSuggestion(tokens, accuracy, amount, source).then((result) => {
        setSuggestion(result);
      });
      const timeoutID = setTimeout(() => {
        setSuggestionTimeout(null);
      }, timeoutLength);
      setSuggestionTimeout(timeoutID);
      return;
    }

    console.log('Suggestion already queued, setting new request to be queued.');

    clearTimeout(suggestionTimeout);
    const timeoutID = setTimeout(() => {
      getServerSuggestion(tokens, accuracy, amount, source).then((result) => {
        setSuggestion(result);
      });
      setSuggestionTimeout(null);
    }, timeoutLength);
    setSuggestionTimeout(timeoutID);
  };

  return { suggestion, updateLocalSuggestion, queueSuggestionUpdateFromServer, isSuggestionTimedOut };
};

export default useSuggestion;
