import axios from 'axios';
const baseURL = '/api/sources';

const getSources = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
}

export default { getSources };