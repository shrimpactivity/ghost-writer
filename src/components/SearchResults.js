import React from 'react';
import PropTypes from 'prop-types';

const SearchResults = ({ results, onResultClick }) => {
  return (
    <div>
      {results.map((result, index) => {
        const resultText = result.title + ' - ' + result.authors;
        return (
          <div key={index} onClick={() => onResultClick(results[index])}>
            {resultText}
          </div>
        );
      })}
    </div>
  )
}

SearchResults.propTypes= {
  results: PropTypes.array,
  onResultClick: PropTypes.func
}

export default SearchResults;