import axios from 'axios';
const baseURL = '/api/suggest';

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
  let result = accuracy > 0 ? tokens.slice(-1 * accuracy) : [];
  return result;
};

const getRequestURL = (source, suggestionParams) => {
  const { tokens, accuracy, amount, weighted, exclude } = suggestionParams;
  let result = `${baseURL}/${source.id}/?`;
  result += formatTokensIntoQuery(tokens);
  if (amount) result += `&n=${amount}`;
  if (accuracy) result += `&a=${accuracy}`;
  if (weighted) result += `&w=${weighted}`;
  if (exclude) result += `&x=${exclude}`;
  return result;
};

const retrieveSuggestionFromServer = (source, suggestionParams) => {
  const { tokens, accuracy } = suggestionParams;
  const relevantTokens = getRelevantTokens(tokens, accuracy);
  const url = getRequestURL(source, {
    ...suggestionParams,
    tokens: relevantTokens,
  });
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

export default { retrieveSuggestionFromServer };
