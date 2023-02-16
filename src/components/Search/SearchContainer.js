import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import catalogService from '../../services/catalogService';

const containerStyle = {
  width: '100%',
  overflow: 'auto',
};

const SearchContainer = ({ onSearchResultClick }) => {
  const [results, setResults] = useState([]);

  const handleBookSearchSubmit = (event) => {
    event.preventDefault();
    const query = event.target[0].value;
    if (query.trim()) {
      console.log('Searching catalog for ', query);
      catalogService.searchCatalog(query).then((results) => {
        setResults(results);
      });
    } else {
      setResults([]);
    }
  };

  return (
    <div style={containerStyle}>
      <SearchForm onSubmit={handleBookSearchSubmit} />
      <SearchResults results={results} onResultClick={onSearchResultClick} />
    </div>
  );
};

SearchContainer.propTypes = {
  onSearchResultClick: PropTypes.func.isRequired,
};

export default SearchContainer;
