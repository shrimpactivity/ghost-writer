import axios from 'axios';
const baseURL = '/api/suggest';

const getSuggestionFromMachine = (
  suggestionMachine,
  tokens,
  accuracy,
  amount,
  weighted
) => {
  const relevantTokens = accuracy > 0 ? tokens.slice(-1 * accuracy) : [];
  console.log(
    'Retrieving suggestion using local source with tokens: ',
    relevantTokens
  );
  if (amount > 1) {
    let result = '';
    const sequence = suggestionMachine.suggestSequenceFor(
      relevantTokens,
      amount,
      accuracy,
      weighted
    );
    sequence.forEach((word) => (result += word + ' '));
    console.log('Suggestion found: ', result.trim());
    return result.trim();
  }

  const result = suggestionMachine.suggestFor(relevantTokens, weighted);

  return result;
};

const formatTokensIntoQuery = (tokens) => {
  let query = '';
  if (tokens.length) {
    query += 'q=';
    for (let token of tokens) {
      query += `${token}+`;
    }
    query = query.slice(0, query.length - 1);
  }
  return query;
};

const getRelevantTokens = (tokens, accuracy) => {
  let result = tokens.slice(-1 * accuracy);
  if (accuracy === 0) {
    result = [];
  }
  return result;
}

const getRequestURL = (source, tokens, accuracy, amount, weighted) => {
  return `${baseURL}/${
    source.id
  }/?${formatTokensIntoQuery(tokens)}&n=${amount}&a=${accuracy}&w=${weighted}`;
};

const retrieveSuggestionFromServer = (source, tokens, accuracy, amount, weighted) => {
  const relevantTokens = getRelevantTokens(tokens, accuracy);
  const url = getRequestURL(source, relevantTokens, accuracy, amount, weighted);
  const request = axios.get(url);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(
        `Error retrieving suggestion for tokens ${relevantTokens} from source ${source.title}: ${error}`
      );
      return null;
    });
};

export default { getSuggestionFromMachine, retrieveSuggestionFromServer };
