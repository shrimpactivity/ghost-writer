import { useState } from 'react';
import {
  getServerSuggestion,
  getLocalSuggestion,
} from '../utils/getSuggestion';

const useSuggestion = () => {
  const [suggestion, setSuggestion] = useState('');
  const [suggestionTimeout, setSuggestionTimeout] = useState(null);
  const TIMEOUT_LENGTH = 300;

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
  const timeSuggestionOut = () => {
    if (!isSuggestionTimedOut) {
      const timeoutID = setTimeout(() => {
        setSuggestionTimeout(null);
      }, TIMEOUT_LENGTH);
      setSuggestionTimeout(timeoutID);
    }
  }

  const updateLocalSuggestion = (
    tokens,
    accuracy,
    amount,
    suggestionMachine
  ) => {
    const suggestion = getLocalSuggestion(
      tokens,
      accuracy,
      amount,
      suggestionMachine
    );
    setSuggestion(suggestion);
  };

  const queueSuggestionUpdateFromServer = (
    tokens,
    accuracy,
    amount,
    source,
    timeoutLength = TIMEOUT_LENGTH
  ) => {
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

  return {
    suggestion,
    updateLocalSuggestion,
    queueSuggestionUpdateFromServer,
    isSuggestionTimedOut,
    timeSuggestionOut,
  };
};

export default useSuggestion;
