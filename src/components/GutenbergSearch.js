import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import catalogService from '../services/catalogService';

const GutenbergSearch = ({ onResultClick }) => {
  const [results, setResults] = useState([]);

  const handleBookSearchSubmit = (event) => {
    event.preventDefault();
    const query = event.target[0].value;
    if (query.trim()) {
      console.log('Searching catalog for ', query);
      catalogService.searchCatalog(query).then((results) => {
        setResults(results);
      });
    }
    else {
      setResults([]);
    }
  };

  return (
    <div>
      <SearchForm onSubmit={handleBookSearchSubmit} />
      <SearchResults results={results} onResultClick={onResultClick} />
    </div>
  );
};

GutenbergSearch.propTypes = {
  onResultClick: PropTypes.func,
};

export default GutenbergSearch;
