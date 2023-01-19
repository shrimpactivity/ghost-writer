import axios from 'axios';
const baseURL = '/api/sources';

const getSourcesInfo = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const getSourceInfo = (id) => {
  const request = axios.get(baseURL + id);
  return request.then((response) => response.data);
};

export default { getSourcesInfo, getSourceInfo };
