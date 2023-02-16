import { useState } from 'react';
import calculateSuggestion from '../services/calculateSuggestion';
import suggestionService from '../services/suggestionService';

const useSuggestion = () => {
  const [suggestion, setSuggestion] = useState('');
  const [suggestionTimeout, setSuggestionTimeout] = useState(null);
  const TIMEOUT_LENGTH = 250;

  /**
   * Returns true if a suggestion request to the server is queued up.
   * @returns {boolean}
   */
  const isTimedOut = () => {
    return suggestionTimeout !== null;
  };

  /**
   * Times out server requests for suggestions so that any following request is made TIMEOUT_LENGTH
   * milliseconds in the future.
   */
  const timeOutUpdates = (duration = TIMEOUT_LENGTH) => {
    if (!isTimedOut) {
      const timeoutID = setTimeout(() => {
        setSuggestionTimeout(null);
      }, duration);
      setSuggestionTimeout(timeoutID);
    }
  };

  /**
   *
   * @param {Object} suggestionMachine
   * @param {*[]} params The tokens, accuracy, amount, weighted, and exclude parameters.
   */
  const updateFromLocalMachine = (suggestionMachine, suggestionParams) => {
    const suggestion = calculateSuggestion(
      suggestionMachine,
      suggestionParams
    );
    setSuggestion(suggestion);
    console.log('Suggestion found from local source: ', suggestion);
  };

  const queueUpdateFromServer = (
    source,
    suggestionParams,
    timeoutLength = TIMEOUT_LENGTH
  ) => {
    if (!isTimedOut()) {
      suggestionService
        .retrieveSuggestionFromServer(source, suggestionParams)
        .then((result) => {
          setSuggestion(result);
          console.log('Suggestion found for server source: ', result);
        });
      const timeoutID = setTimeout(() => {
        setSuggestionTimeout(null);
      }, timeoutLength);
      setSuggestionTimeout(timeoutID);
      return;
    }

    clearTimeout(suggestionTimeout);
    const timeoutID = setTimeout(() => {
      suggestionService
        .retrieveSuggestionFromServer(source, suggestionParams)
        .then((result) => {
          setSuggestion(result);
          console.log('Suggestion found for server source: ', result);
        });
      setSuggestionTimeout(null);
    }, timeoutLength);
    setSuggestionTimeout(timeoutID);
  };

  return {
    value: suggestion,
    updateFromLocalMachine,
    queueUpdateFromServer,
    isTimedOut,
    timeOutUpdates,
  };
};

export default useSuggestion;
