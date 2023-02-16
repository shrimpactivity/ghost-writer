import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../config/colorPalette';

const inputStyle = {
  borderRadius: "5px",
  border: "2px solid",
  borderColor: theme.light,
  backgroundColor: theme.darker,
  color: theme.lightest,
  minWidth: "300px",
  marginRight: "10px",
  height: "30px",
  fontSize: "14px"
};

const SearchForm = ({ onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="search"
          id="catalog-search"
          placeholder="Try title, author, subject, or gutenberg ID"
          name="q"
          spellCheck="true"
          style={inputStyle}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchForm;
