import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../theme/palette';
import { IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
          
          <IconButton
            aria-label="search"
            variant="contained"
            onClick={onSubmit}
          >
            <SearchIcon sx={{ color: theme.light }} fontSize="medium" />
          </IconButton>
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
