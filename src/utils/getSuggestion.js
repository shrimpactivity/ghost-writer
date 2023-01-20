import suggestionService from "../services/suggestionService";

const getLocalSuggestion = ({ tokens, source, accuracy, amount }) => {
  const relevantTokens = tokens.slice(-1 * accuracy);
  console.log(
    'Retrieving suggestion using local source with tokens: ',
    relevantTokens
  );
  if (amount > 1) {
    let result;
    source.machine
      .suggestSequenceFor(relevantTokens, amount, accuracy)
      .forEach((suggestion) => {
        result += suggestion + ' ';
      });
    console.log('Suggestion found: ', result.trim());
    return result.trim();
  }
  return source.machine.suggestFor(relevantTokens);
};

const getServerSuggestion = ({ tokens, source, accuracy, amount }) => {
  const relevantTokens = tokens.slice(-1 * accuracy);
  console.log(
    'Retrieving suggestion from server source for tokens: ',
    relevantTokens
  );
  return suggestionService.retrieveSuggestion(
    relevantTokens,
    source,
    accuracy,
    amount
  );
};

export { getLocalSuggestion, getServerSuggestion };
