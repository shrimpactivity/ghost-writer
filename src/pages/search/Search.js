import React from 'react';
import PropTypes from 'prop-types';
import { Button, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SearchFormContainer from './SearchFormContainer';
import LocalSourcesList from './LocalSourcesList';
import Navbar from '../../components/Navbar';
import Notification from '../../components/Notification';

import palette from '../../theme/palette';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: palette.lightest,
  maxWidth: '1000px',
};

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: palette.complement,
    },
  },
});

const Search = (props) => {
  return (
    <>
      <CssBaseline />
      <Navbar
        onLoginClick={props.onLoginClick}
        userLoggedIn={props.userLoggedIn}
        onAboutClick={props.onAboutClick}
        onLogoClick={props.onLogoClick}
      />
      <Notification text={props.notification.text} />
      <div
        className="page-container"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <div
          className="basic-container"
          style={containerStyle}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            <div style={{ maxWidth: '450px'}}>
              {props.localSources.length > 0 ? (
                <div>
                  <LocalSourcesList
                    localSources={props.localSources}
                    onClickDelete={props.onClickDelete}
                  />
                </div>
              ) : null}
            </div>
            <div style={{ maxWidth: '450px'}}>
              <SearchFormContainer
                notification={props.notification}
                onSearchResultClick={props.onSearchResultClick}
              />
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <ThemeProvider theme={buttonTheme}>
              <Button variant="outlined" onClick={props.onClose}>
                Done
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </>
  );
};

Search.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  userLoggedIn: PropTypes.bool.isRequired,
  onAboutClick: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearchResultClick: PropTypes.func.isRequired,
  localSources: PropTypes.array.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default Search;
