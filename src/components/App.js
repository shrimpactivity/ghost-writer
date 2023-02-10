import React, { useState } from 'react';
import Navbar from './Navbar';
import MainContainer from './MainContainer';
import { CssBaseline } from '@mui/material';
import theme from '../config/colorPalette';

const backgroundStyle = {
  width: '100%',
  minHeight: '100vh',
  backgroundColor: theme.darkest,
  paddingBottom: '50px',
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
        <MainContainer />
      </div>
    </>
  );
};

export default App;
