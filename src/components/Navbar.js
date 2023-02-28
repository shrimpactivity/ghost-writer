import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../config/colorPalette';
import LogoImg from '../assets/logo.png';

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

const navbarContainerStyle = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  alignItems: 'center',
};

const Navbar = ({ onLoginClick, userLoggedIn, onAboutClick }) => {
  return (
    <div style={navbarContainerStyle}>
      <div >
        <img style={{ width: '350px' }} src={LogoImg} alt="ghostwriter icon" />
      </div>
      <div >
        <ThemeProvider theme={buttonTheme}>
          {/* TODO: <Button onClick={onLoginClick} style={linkButtonStyle}>
                {userLoggedIn ? 'Logout' : 'Login'}
              </Button> */}
          <Button onClick={onAboutClick} style={linkButtonStyle}>
            {'About'}
          </Button>
          <Button
            style={linkButtonStyle}
            href="https://github.com/shrampi/ghostwriter-web"
            target="_blank"
          >
            GitHub
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  onLoginClick: PropTypes.func,
  userLoggedIn: PropTypes.bool,
};

export default Navbar;
