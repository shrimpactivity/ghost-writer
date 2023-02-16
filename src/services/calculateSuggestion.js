const calculateSuggestionSequence = (machine, params) => {
  let result = "";
  machine
    .suggestSequenceFor(
      params.tokens,
      params.amount,
      params.accuracy,
      params.weighted
    )
    .forEach((suggestion) => {
      result += suggestion + " ";
    });

  return result.trim();
};

const calculateSuggestionExcluding = (machine, params) => {
  const possibleSuggestions = machine.getAllSuggestionsFor(params.tokens);

  if (params.accuracy === 0) {
    return possibleSuggestions[
      Math.floor(possibleSuggestions.length * Math.random())
    ];
  }

  const filteredSuggestions = possibleSuggestions.filter(
    (word) => word !== params.exclude
  );

  if (filteredSuggestions.length > 0) {
    return filteredSuggestions[
      Math.floor(filteredSuggestions.length * Math.random())
    ];
  }

  params.accuracy -= 1;
  return calculateSuggestion(machine, params);
};

const filterRelevantTokens = (params) => {
  const relevantTokens =
    params.accuracy > 0
      ? params.tokens.slice(-1 * params.accuracy)
      : [];
  return {...params, tokens: relevantTokens };
}

const calculateSuggestion = (machine, params) => {
  params = filterRelevantTokens(params);
 
  if (params.amount > 1) {
    return calculateSuggestionSequence(machine, params);
  }

  if (params.exclude && params.accuracy > 0) {
    return calculateSuggestionExcluding(machine, params);
  }

  return machine.suggestFor(params.tokens, params.weighted);
};

export default calculateSuggestion;