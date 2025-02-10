import React, { useState } from 'react';
import { Button, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';
import Content from './Content';
import theme from '../../theme/palette';

const containerStyle = {
  width: '95%',
  maxWidth: '700px',
  marginTop: '60px',
  paddingLeft: '30px',
  paddingRight: '30px',
};

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: theme.light,
    },
  },
});

const About = (props) => {
  const [showTutorial, setShowTutorial] = useState(false);

  const handleClose = () => {
    props.onCloseClick();
    setShowTutorial(false);
  }

  return (
    <>
      <CssBaseline />
      <Navbar
        onLoginClick={props.onLoginClick}
        userLoggedIn={props.userLoggedIn}
        onAboutClick={props.onAboutClick}
        onLogoClick={props.onLogoClick}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="welcome basic-container" style={containerStyle}>
          {showTutorial ? (
            <Tutorial />
          ) : (
            <Content onShowTutorial={() => setShowTutorial(true)}/>
          )}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <div>
              <ThemeProvider theme={buttonTheme}>
                <Button onClick={handleClose} variant="outlined">
                  Let's go!
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

About.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  userLoggedIn: PropTypes.bool.isRequired,
  onAboutClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
};

export default About;
