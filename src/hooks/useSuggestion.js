import { useState } from 'react';
import suggestionService from '../services/suggestionService';

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

  /**
   * Returns true if the source exists locally - that is, it has a defined machine key. 
   * @param {Object} source 
   * @returns {boolean}
   */
  const isSourceLocal = (source) => {
    if (!source.machine) {
      return false;
    }
    return true
  };

  const updateLocalSuggestion = ({ tokens, source, accuracy, amount }) => {
    const relevantTokens = tokens.slice(-1 * accuracy);
    console.log('Updating suggestion using local source with tokens: ', relevantTokens);
    if (amount > 1) {
      let result;
      source.machine
        .suggestSequenceFor(relevantTokens, amount, accuracy)
        .forEach((suggestion) => {
          result += suggestion + ' ';
        });
      console.log('Suggestion found: ', result.trim());
      setSuggestion(result.trim());
      return;
    }

    setSuggestion(source.machine.suggestFor(relevantTokens));
  };

  const updateServerSuggestion = ({ tokens, source, accuracy, amount }) => {
    const relevantTokens = tokens.slice(-1 * accuracy);
    console.log('Updating suggestion from server source for tokens: ', relevantTokens);
    suggestionService
      .retrieveSuggestion(relevantTokens, source, accuracy, amount)
      .then((result) => {
        console.log('Suggestion found: ', result);
        setSuggestion(result);
      });
  };

  /**
   * Queue's an update to the suggestion state. If the source is a local one, this happens immediately. If the source
   * is on the server, this will use a timeout to delay server requests by the specified timeoutLength. 
   * @param {Object} params Parameters of suggestion request, must have keys tokens, source, accuracy, amount.
   * @param {*} [timeoutLength=200] The length in milliseconds of the timeout delay. 
   * @returns 
   */
  const queueSuggestionUpdate = (
    params,
    timeoutLength = 200
  ) => {
    if (isSourceLocal(params.source)) {
      updateLocalSuggestion(params);
      return;
    }

    if (!isSuggestionTimedOut()) {
      console.log('No suggestion request queued, updating immediately.')
      updateServerSuggestion(params);
      const timeoutID = setTimeout(() => {
        setSuggestionTimeout(null);
      }, timeoutLength);
      setSuggestionTimeout(timeoutID);
      return;
    }

    console.log('Suggestion already queued, setting new request to be queued.');

    clearTimeout(suggestionTimeout);
    const timeoutID = setTimeout(() => {
      updateServerSuggestion(params);
      setSuggestionTimeout(null);
    }, timeoutLength);
    setSuggestionTimeout(timeoutID);
  };

  return { suggestion, queueSuggestionUpdate, isSuggestionTimedOut };
};

export default useSuggestion;
