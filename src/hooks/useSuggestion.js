import { useState } from 'react';
import suggestionService from '../services/suggestionService';

const useSuggestion = () => {
  const [suggestion, setSuggestion] = useState('');
  const [suggestionTimeout, setSuggestionTimeout] = useState(null);

  const isSuggestionTimedOut = () => {
    return suggestionTimeout !== null;
  };

  const isSourceOnClient = (source) => {
    return source.machine === true;
  };

  const updateLocalSuggestion = (params) => {
    const relevantTokens = params.tokens.slice(-1 * params.accuracy);
    if (params.amount > 1) {
      let result;
      params.source.machine
        .suggestSequenceFor(relevantTokens, params.amount, params.accuracy)
        .forEach((suggestion) => {
          result += suggestion + ' ';
        });
      setSuggestion(result.trim());
      return;
    }

    setSuggestion(machine.suggestFor(relevantTokens));
  };

  const updateServerSuggestion = ({ tokens, source, accuracy, amount }) => {
    suggestionService.retrieveSuggestion(tokens, source, accuracy, amount).then((result) => {
      setSuggestion(result);
    });
  };

  const SUGGESTION_REQUEST_INTERVAL = 200;

  const queueSuggestionUpdate = (
    params,
    timeoutLength = SUGGESTION_REQUEST_INTERVAL
  ) => {
    if (isSourceOnClient(params.source)) {
      updateLocalSuggestion(params);
      return;
    }

    if (!isSuggestionTimedOut()) {
      updateServerSuggestion(params);
      const timeoutID = setTimeout(() => {
        setSuggestionTimeout(null);
      }, timeoutLength);
      setSuggestionTimeout(timeoutID);
      return;
    }

    clearTimeout(suggestionRequestTimeout);
    const timeoutID = setTimeout(() => {
      updateServerSuggestion(params);
      setSuggestionRequestTimeout(null);
    }, timeoutLength);
    setSuggestionTimeout(timeoutID);
  };

  return { suggestion, queueSuggestionUpdate, isSuggestionTimedOut };
};

export default useSuggestion;