import axios from 'axios';
const baseURL = '/api/suggest';

const formatTokensIntoQuery = (tokens) => {
  let query = 'q=';
  if (tokens.length) {
    for (let token of tokens) {
      query += `${token}+`;
    }
    query = query.slice(0, query.length - 1);
  }
  return query;
};

const retrieveSuggestion = (tokens, source, accuracy, amount) => {
  if (tokens.length > accuracy) {
    tokens = tokens.slice(tokens.length - accuracy);
  }

  let url = `${baseURL}/${
    source.id
  }/?n=${amount}&a=${accuracy}&${formatTokensIntoQuery(tokens)}`;
  const request = axios.get(url);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(
        `Error retrieving suggestion for tokens ${tokens} from source ${source.title}: ${error}`
      );
      return null;
    });
};

export default { retrieveSuggestion };
