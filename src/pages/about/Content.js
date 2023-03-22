import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/palette';
import WelcomeImg from '../../assets/Welcome.png';
import { useNavigate } from 'react-router-dom';

const imageStyle = {
  display: 'inline',
  width: '100px',
};

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: theme.complement,
    },
  },
});

const Content = (props) => {

  const nav = useNavigate();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={WelcomeImg} style={imageStyle} />
      </div>

      <p>
        Write with your favorite authors from beyond the grave! Be it a sonnet
        with Shakespeare, a novel with Jane Austen, or an angry internet comment
        with Homer - the only limit is you (and the ghost's) imagination.
      </p>
      
      <p style={{ textAlign: 'center' }}>
        First time here? Have a look at the
        <span>
          <ThemeProvider theme={buttonTheme}>
            <Button
              onClick={() => nav('/tutorial')}
              variant="text"
              sx={{ padding: '3px 5px 2px 5px', marginLeft: '6px' }}
            >
              tutorial
            </Button>
          </ThemeProvider>
        </span>
      </p>
      <p>
        This application was built with a custom predictive text model designed
        to accept seed tokens (e.g., the words of a book) and provide suggestions. 
        For more information, check out the GitHub page - link in the top right.  
      </p>
      <p>
        <span style={{ color: theme.complement }}>
          <b>Warning:</b> The texts have not been filtered in any way. Unsavory
          (and possibly offensive) language in the original literature may be
          generated by this application.
        </span>
      </p>
    </div>
  );
};

Content.propTypes = {
  onShowTutorial: PropTypes.func.isRequired,
};

export default Content;
