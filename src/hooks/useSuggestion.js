import { useState } from 'react';
import suggestionService from '../services/suggestionService';

const useSuggestion = () => {
  const [suggestion, setSuggestion] = useState('');
  const [suggestionTimeout, setSuggestionTimeout] = useState(null);
  const TIMEOUT_LENGTH = 250;

  /**
   * Returns true if a suggestion request to the server is queued up.
   * @returns {boolean}
   */
  const isSuggestionTimedOut = () => {
    return suggestionTimeout !== null;
  };

  /**
   * Times out server requests for suggestions so that any following request is made TIMEOUT_LENGTH
   * milliseconds in the future.
   */
  const timeSuggestionOut = (duration = TIMEOUT_LENGTH) => {
    if (!isSuggestionTimedOut) {
      const timeoutID = setTimeout(() => {
        setSuggestionTimeout(null);
      }, duration);
      setSuggestionTimeout(timeoutID);
    }
  };

  const updateLocalSuggestion = (suggestionMachine, params) => {
    const suggestion = suggestionService.getSuggestionFromMachine(
      suggestionMachine,
      ...params
    );
    setSuggestion(suggestion);
    console.log('Suggestion found from local source: ', suggestion);
  };

  const queueSuggestionUpdateFromServer = (
    source,
    params,
    timeoutLength = TIMEOUT_LENGTH
  ) => {
    if (!isSuggestionTimedOut()) {
      suggestionService
        .retrieveSuggestionFromServer(source, ...params)
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
        .retrieveSuggestionFromServer(source, ...params)
        .then((result) => {
          setSuggestion(result);
          console.log('Suggestion found for server source: ', result);
        });
      setSuggestionTimeout(null);
    }, timeoutLength);
    setSuggestionTimeout(timeoutID);
  };

  return {
    suggestion,
    updateLocalSuggestion,
    queueSuggestionUpdateFromServer,
    isSuggestionTimedOut,
    timeSuggestionOut,
  };
};

export default useSuggestion;
