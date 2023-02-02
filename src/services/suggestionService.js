import axios from 'axios';
const baseURL = '/api/suggest';

const getSuggestionFromMachine = (tokens, accuracy, amount, suggestionMachine) => {
  const relevantTokens = accuracy > 0 
  ? tokens.slice(-1 * accuracy)
  : [];
  console.log(
    'Retrieving suggestion using local source with tokens: ',
    relevantTokens
  );
  if (amount > 1) {
    let result  = '';
    const sequence = suggestionMachine.suggestSequenceFor(relevantTokens, amount, accuracy);
    sequence.forEach(word => result += word + ' ');
    console.log('Suggestion found: ', result.trim());
    return result.trim();
  }
  return suggestionMachine.suggestFor(relevantTokens);
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

const getRequestURL = (tokens, accuracy, amount, source) => {
  return `${baseURL}/${
    source.id
  }/?n=${amount}&a=${accuracy}&${formatTokensIntoQuery(tokens)}`;
}

const retrieveSuggestionFromServer = (tokens, accuracy, amount, source) => {
  let relevantTokens = tokens.slice(-1 * accuracy);
  if (accuracy === 0) {
    relevantTokens = [];
  }

  let url = getRequestURL(relevantTokens, accuracy, amount, source);
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
