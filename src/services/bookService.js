import axios from 'axios';
import random from '../utils/random';

const baseURL = '/api/books';

const getFormattedBook = (id) => {
  let book = ''
  let letters = ['a', 'b', 'c', 'd', 'e'];
  for (let i = 0; i < 60000; i += 1) {
    let word = ''
    for (let j = 0; j < 5; j += 1) {
      word += letters[Math.floor(letters.length * Math.random())];
    }
    book += word + ' ';
  }
  
  return new Promise((resolve, reject) => {
    resolve(book);
  })

  const bookURL = `${baseURL}/${id}`;
  const request = axios.get(bookURL);
  return request
    .then((response) => response.data)
    .catch((error) => console.log('Error retrieving book: ', error));
};

export default { getFormattedBook };
