import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import theme from '../config/colorPalette';

const appBarStyle = {
  backgroundColor: theme.dark,
  color: theme.light,
  borderBottom: 'solid 1px',
  borderColor: theme.medium,
};

const titleContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  width: '100vw',
  justifyContent: 'center',
  alignItems: 'center',
};

const linkContainerStyle = {
  display: 'flex',
  flexGrow: 1,
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
  font: '15px',
  padding: '12px',
};

const Navbar = ({ onLoginClick, userLoggedIn }) => {
  return (
    <AppBar component="nav" position="static" style={appBarStyle}>
      <Toolbar>
        <Box style={titleContainerStyle}>
          <Box display="flex" justifyContent="center" flexBasis="50%">
            <Box pr="15px">
              <Typography variant="h4" component="div">
                GhostWriter
              </Typography>
            </Box>
            <Box display="flex">
              <AgricultureIcon fontSize="large" />
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
