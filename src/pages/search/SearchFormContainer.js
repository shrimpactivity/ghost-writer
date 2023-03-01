import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import catalogService from '../../services/catalog';
import palette from '../../theme/palette';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px'
};

const titleStyle = {
  color: palette.light,
  backgroundColor: palette.dark,
  borderRadius: '10px',
  padding: '5px',
  paddingLeft: '10px',
  paddingRight: '10px',
  fontSize: '20px',
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
      <span style={titleStyle}>Search Project Gutenberg</span>
      <div>
        <SearchForm onSubmit={handleBookSearchSubmit} />
      </div>
      <div style={{maxHeight: '40vh', overflow: 'auto'}}>
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
