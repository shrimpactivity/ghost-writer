import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import catalogService from '../../services/catalog';
import theme from '../../config/colorPalette';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const titleStyle = {
  color: theme.light,
  fontSize: '22px',
  textAlign: 'center'
};

const SearchContainer = ({ notification, onSearchResultClick }) => {
  const [results, setResults] = useState([]);

  const handleBookSearchSubmit = (event) => {
    event.preventDefault();
    const query = event.target[0].value;
    if (query.trim()) {
      console.log('Searching catalog for ', query);
      catalogService.searchCatalog(query).then((results) => {
        setResults(results);
        if (results.length === 0) {
          notification.update(`No results found for ${query}`);
        } else {
          notification.update(`${results.length} results found`);
        }
      });
    } else {
      setResults([]);
    }
  };

  return (
    <div style={containerStyle}>
      <span style={titleStyle}>Find Authors on Project Gutenberg</span>
      <div>
        <SearchForm onSubmit={handleBookSearchSubmit} />
      </div>
      <div>
        <SearchResults results={results} onResultClick={onSearchResultClick} />
      </div>
    </div>
  );
};

SearchContainer.propTypes = {
  notification: PropTypes.object.isRequired,
  onSearchResultClick: PropTypes.func.isRequired,
};

export default SearchContainer;
