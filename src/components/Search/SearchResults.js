import React from 'react';
import PropTypes from 'prop-types';
import Result from './Result';

const SearchResults = ({ results, onResultClick }) => {
  return (
    <div style={{overflow: 'auto', maxHeight: '600px'}}>
      {results.map((result, index) => {
        return (
          <div key={result.id} style={{display: 'flex'}} onClick={() => onResultClick(result)}>
            <Result value={result} />
          </div>
        );
      })}
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.array,
  onResultClick: PropTypes.func,
};

export default SearchResults;
