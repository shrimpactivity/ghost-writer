import axios from 'axios';

const baseURL = '/api/search';

const searchCatalog = (query) => {
  query = query.replace(/[\s]+/g, '+');
  const url = baseURL + '/?q=' + query;
  const request = axios.get(url);
  return request.then(response => response.data).catch(error => {
    console.log('Error retrieving catalog data: ', error);
    return null;
  })
}

export default { searchCatalog }