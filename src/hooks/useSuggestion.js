import { useState } from 'react';
import { getLocalSuggestion, getServerSuggestion } from '../utils/getSuggestion';

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
    return true;
  };

  /**
   * Queue's an update to the suggestion state. If the source is a local one, this happens immediately. If the source
   * is on the server, this will use a timeout to delay server requests by the specified timeoutLength.
   * @param {Object} params Parameters of suggestion request, must have keys tokens, source, accuracy, amount.
   * @param {*} [timeoutLength=200] The length in milliseconds of the timeout delay.
   * @returns
   */
  const queueSuggestionUpdate = (params, timeoutLength = 200) => {
    if (isSourceLocal(params.source)) {
      const suggestion = getLocalSuggestion(params);
      setSuggestion(suggestion);
      return;
    }

    if (!isSuggestionTimedOut()) {
      console.log('No suggestion request queued, updating immediately.');
      getServerSuggestion(params).then((result) => {
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
      getServerSuggestion(params).then((result) => {
        setSuggestion(result);
      });
      setSuggestionTimeout(null);
    }, timeoutLength);
    setSuggestionTimeout(timeoutID);
  };

  return { suggestion, queueSuggestionUpdate, isSuggestionTimedOut };
};

export default useSuggestion;
