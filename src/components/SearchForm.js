import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({onSubmit}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="search"
          id="catalog-search"
          placeholder="Try title, author, subject, or gutenberg ID"
          name="q"
          spellCheck="true"
        />
        <button type='submit'>Search</button>
      </form>
        
    </div>
  )
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func
}

export default SearchForm;