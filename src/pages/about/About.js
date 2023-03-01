import React from 'react';
import { Button, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PropTypes from 'prop-types';

import Navbar from '../../components/Navbar';
import theme from '../../theme/palette';
import WelcomeImg from '../../assets/Welcome.png';

const containerStyle = {
  width: '95%',
  maxWidth: '700px',
  marginTop: '50px',
};

const imageStyle = {
  display: 'inline',
  margin: '20px',
  width: '400px',
};

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: theme.light,
    },
  },
});

const About = (props) => {
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={WelcomeImg} style={imageStyle} />
          </div>

          <p
            style={{
              borderBottom: '3px dotted',
              borderColor: theme.medium,
              paddingBottom: '15px',
            }}
          >
            Write with your favorite authors from beyond the grave! Whether it
            be a sonnet with Shakespeare, a novel with Jane Austen, or an angry
            internet comment with Martin Luther - the only limit is you (and the
            ghost's) imagination.
          </p>
          <div>
            <div style={{ textAlign: 'center', fontSize: '20px' }}>
              <em>How To</em>
            </div>
            <ul>
              <li>
                Add the ghost's suggestion to your work with the{' '}
                <AddCircleOutlineIcon fontSize="string" /> button or{' '}
                <em>Tab</em> key
              </li>
              <li>
                The ghost can replace words you've already written - simply
                click the word.{' '}
              </li>
              <li>
                Click <em>Find New Ghosts</em> to search{' '}
                <a
                  style={{ color: 'cyan' }}
                  href="https://www.gutenberg.org/"
                  target="_blank"
                >
                  Project Gutenberg
                </a>
                , a free online library of public domain texts. Your selection
                will be downloaded and processed into a new ghost, ready to
                write with you.
              </li>
            </ul>
          </div>
          <p>
            <span style={{ color: theme.complement }}>
              <b>Warning:</b> The texts have not been filtered in any way.
              Unsavory (and possibly offensive) language in the original
              literature may be generated by this application.
            </span>
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <div>
              <ThemeProvider theme={buttonTheme}>
                <Button onClick={props.onCloseClick} variant="outlined">
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
