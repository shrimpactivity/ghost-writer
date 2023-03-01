import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../theme/palette';
import { Button, Tooltip } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const inputStyle = {
  borderRadius: '5px',
  border: '2px solid',
  borderColor: theme.light,
  backgroundColor: theme.darker,
  color: theme.lightest,
  minWidth: '300px',
  height: '30px',
  fontSize: '14px',
  margin: '10px',
  marginRight: '3px',
};

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: theme.light,
    },
  },
});

const SearchForm = ({ onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="search"
          placeholder="Try title, author, or subject..."
          style={inputStyle}
        />
        <ThemeProvider theme={buttonTheme}>
          <Tooltip title="Search">
            <Button type="submit">Search</Button>
          </Tooltip>
        </ThemeProvider>
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchForm;
