import React, { useState } from 'react';
import Navbar from './Navbar';
import MainContainer from './MainContainer';
import { CssBaseline } from '@mui/material';
import theme from '../config/colorPalette';

const backgroundStyle = {
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.darkest,
};

const mainWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleLogin = () => {
    setUserLoggedIn(!userLoggedIn);
  };

  return (
    <>
      <CssBaseline />
      <div className="background" style={backgroundStyle}>
        <Navbar onLoginClick={handleLogin} userLoggedIn={userLoggedIn} />
        <div style={mainWrapperStyle}>
          <div>
            <MainContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
