import axios from 'axios';

const baseURL = '/api/books';

const getFormattedBook = (id) => {
  return new Promise((resolve, reject) => {
    resolve('This is some sample text');
  });
  const bookURL = `${baseURL}/${id}`;
  const request = axios.get(bookURL);
  return request
    .then((response) => response.data)
    .catch((error) => console.log('Error retrieving book: ', error));
};

export default { getFormattedBook };
