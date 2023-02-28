import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../../../config/colorPalette';

const buttonContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: theme.complement,
    },
  },
});

const searchButtonTheme = createTheme({
  palette: {
    primary: {
      main: theme.light,
    },
  },
});

const buttonStyle = {
  margin: '10px',
};

const ButtonMenu = ({
  showOptions,
  onOptionButtonClick,
  onSearchButtonClick,
}) => {
  return (
    <div style={buttonContainerStyle}>
      <div style={{ justifySelf: 'flex-start' }}>
        <ThemeProvider theme={searchButtonTheme}>
          <Button
            sx={buttonStyle}
            variant="outlined"
            onClick={onSearchButtonClick}
          >
            Find New Ghosts
          </Button>
        </ThemeProvider>
      </div>
      <div style={{ justifySelf: 'flex-end' }}>
        <ThemeProvider theme={buttonTheme}>
          <Button
            sx={{ ...buttonStyle, width: '140px' }}
            variant="outlined"
            onClick={onOptionButtonClick}
          >
            {showOptions ? 'Hide Options' : 'Options'}
          </Button>
          {/* TODO: <Button sx={buttonStyle} variant="outlined">
            Save
          </Button>
          <Button sx={buttonStyle} variant="outlined">
            Load
          </Button> */}
        </ThemeProvider>
      </div>
    </div>
  );
};

ButtonMenu.propTypes = {
  showOptions: PropTypes.bool.isRequired,
  onOptionButtonClick: PropTypes.func.isRequired,
  onSearchButtonClick: PropTypes.func.isRequired,
};

export default ButtonMenu;
