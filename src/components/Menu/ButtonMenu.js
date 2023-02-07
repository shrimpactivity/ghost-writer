import React from 'react';
import PropTypes from 'prop-types';
import OptionInputs from './OptionInputs';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../../config/colorPalette';

const buttonContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
};

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: theme.light,
    },
  },
});

const searchButtonTheme = createTheme({
  palette: {
    primary: {
      main: theme.complement,
    },
  },
})

const buttonStyle = {
  paddingLeft: '20px',
  paddingRight: '20px'
}

const ButtonMenu = ({
  showOptions,
  onOptionButtonClick,
  onSearchButtonClick,
}) => {
  return (
    <div style={buttonContainerStyle}>
      <ThemeProvider theme={searchButtonTheme}>
        <Button sx={buttonStyle} variant="text" onClick={onSearchButtonClick}>
          Find New Ghosts
        </Button>
        </ThemeProvider>
        <ThemeProvider theme={buttonTheme}>
        <Button sx={buttonStyle} variant="text" onClick={onOptionButtonClick}>
          {showOptions ? 'Hide Options' : 'Options'}
        </Button>
        <Button sx={buttonStyle} variant="text">Save</Button>
        <Button sx={buttonStyle} variant="text">Load</Button>
      </ThemeProvider>
    </div>
  );
};

ButtonMenu.propTypes = {
  showOptions: PropTypes.bool.isRequired,
  onOptionButtonClick: PropTypes.func.isRequired,
  onSearchButtonClick: PropTypes.func.isRequired,
};

export default ButtonMenu;
