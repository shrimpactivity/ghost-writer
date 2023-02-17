import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../config/colorPalette';

const appBarStyle = {
  backgroundColor: theme.darkest,
  color: theme.light,
};

const titleContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  flex: '1',
  width: '100vw',
  justifyContent: 'center',
  alignItems: 'center',
};

const linkContainerStyle = {
  display: 'flex',
  flex: '1',
  alignItems: 'center',
  justifyContent: 'center',
};

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: theme.light,
    },
  },
});

const linkButtonStyle = {
  borderRadius: '5px',
  fontSize: '16px',
  padding: '12px',
};

const Navbar = ({ onLoginClick, userLoggedIn }) => {
  return (
    <AppBar component="nav" position="static" style={appBarStyle}>
      <Toolbar>
        <Box style={titleContainerStyle}>
          <Box display="flex" justifyContent="center" flexBasis="50%">
            <Box display="flex" justifyContent={"center"}>
              <img style={{width: '350px'}} src="logo.png" alt="ghostwriter icon" />
            </Box>
          </Box>
          <Box style={linkContainerStyle}>
            <ThemeProvider theme={buttonTheme}>
              <Button onClick={onLoginClick} style={linkButtonStyle}>
                {userLoggedIn ? 'Logout' : 'Login'}
              </Button>
              <Button
                style={linkButtonStyle}
                href="https://github.com/shrampi/ghostwriter-web"
                target="_blank"
              >
                GitHub
              </Button>
            </ThemeProvider>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  onLoginClick: PropTypes.func,
  userLoggedIn: PropTypes.bool,
};

export default Navbar;
