import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../theme/palette';
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

const Navbar = ({ onLoginClick, userLoggedIn, onAboutClick, onLogoClick }) => {
  return (
    <div style={navbarContainerStyle}>
      <div>
        <img style={{ width: '350px', cursor: 'pointer' }} src={LogoImg} alt="ghostwriter icon" onClick={onLogoClick}/>
      </div>
      <div>
        <ThemeProvider theme={buttonTheme}>
          <Button onClick={onLoginClick} style={linkButtonStyle}>
            {userLoggedIn ? 'Logout' : 'Login'}
          </Button>
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
  onAboutClick: PropTypes.func.isRequired,
  onLogoClick: PropTypes.func.isRequired,
};

export default Navbar;
