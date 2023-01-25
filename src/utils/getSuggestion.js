import suggestionService from "../services/suggestionService";

const getLocalSuggestion = (tokens, accuracy, amount, suggestionMachine) => {
  const relevantTokens = tokens.slice(-1 * accuracy);
  console.log(
    'Retrieving suggestion using local source with tokens: ',
    relevantTokens
  );
  if (amount > 1) {
    let result;
    suggestionMachine
      .suggestSequenceFor(relevantTokens, amount, accuracy)
      .forEach((suggestion) => {
        result += suggestion + ' ';
      });
    console.log('Suggestion found: ', result.trim());
    return result.trim();
  }
  return suggestionMachine.suggestFor(relevantTokens);
};

const getServerSuggestion = (tokens, accuracy, amount, source) => {
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
