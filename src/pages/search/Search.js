import React from 'react';
import PropTypes from 'prop-types';
import { Button, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SearchContainer from './SearchContainer';
import LocalSourcesList from './LocalSourcesList';
import Navbar from '../../components/Navbar';
import Notification from '../../components/Notification';
import theme from '../../config/colorPalette';

const containerStyle = {
  backgroundColor: theme.dark,
  border: '2px solid',
  borderColor: theme.medium,
  borderRadius: '10px',
  color: theme.lightest,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  maxWidth: '90%',
  marginBottom: '30px'
};

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: theme.complement,
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
      />
      <Notification text={props.notification.text} />
      <div
        className="page-container"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <div className="content-container" style={containerStyle}>
          <div style={{margin: '10px'}}>
            <ThemeProvider theme={buttonTheme}>
              <Button variant="outlined" onClick={props.onClose}>
                Done
              </Button>
            </ThemeProvider>
          </div>
          <div>
            {props.localSources.length > 0 ? (
              <div>
                <LocalSourcesList
                  localSources={props.localSources}
                  onClickDelete={props.onClickDelete}
                />
              </div>
            ) : null}
          </div>
          <div>
            <SearchContainer
              notification={props.notification}
              onSearchResultClick={props.onSearchResultClick}
            />
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
