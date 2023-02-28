import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import theme from './config/colorPalette';

import Home from './pages/home/Home';
import Welcome from './pages/welcome/Welcome';

const handleSearchClose = () => {
  focusProposalInput();
  setShowSearch(false);
};

const handleWelcomeClose = () => {
  focusProposalInput();
  setShowWelcome(false);
  storage.set('userHasVisited', 'true');
};

const App = () => {
  return (
    <Routes>
      <Route path='/welcome' element={<Welcome onCloseClick={handleWelcomeClose}/>} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
