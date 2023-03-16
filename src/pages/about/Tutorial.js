import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import palette from '../../theme/palette';

import tut1 from '../../assets/tutorial/1.png';
import tut2 from '../../assets/tutorial/2.png';
import tut3 from '../../assets/tutorial/3.png';
import tut4 from '../../assets/tutorial/4.png';

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: palette.light,
    },
  },
});

const buttonStyle = {
  margin: '0px 10px 0px 10px',
  width: '100px'
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const menuStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const labelStyle = {
  color: palette.lightest,
  padding: '10px',
  textAlign: 'center',
};

const imageStyle = {
  border: '2px solid',
  borderColor: palette.dark,
  borderRadius: '20px'
}

const getCurrentImage = (currentIndex) => {
  const images = [
    <img src={tut1} style={imageStyle}></img>,
    <img src={tut2} style={imageStyle}></img>,
    <img src={tut3} style={imageStyle}></img>,
    <img src={tut4} style={imageStyle}></img>,
  ];
  return images[currentIndex];
};

const getCurrentLabel = (currentIndex) => {
  const labels = [
    <span>Choose your ghost co-author from the dropdown</span>,
    <span>
      While typing, the ghost's suggestion will appear next to your cursor
    </span>,
    <span>
      Press Tab or click the <AddCircleOutlineIcon fontSize="string" /> button
      to accept the suggestion and add your contributions.
    </span>,
    <span>
      Click a word you or the ghost already contributed, and the ghost will replace it
    </span>,
  ];
  return labels[currentIndex];
};

const Tutorial = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const MAX_INDEX = 3;

  const handleNext = () => {
    if (currentIndex < MAX_INDEX) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="tutorial-container" style={containerStyle}>
      <h3 style={{margin: '10px 0px 0px 0px'}}>Tutorial</h3>
      <span style={labelStyle}>{getCurrentLabel(currentIndex)}</span>
      <div className="tutorial-image-container">
        {getCurrentImage(currentIndex)}
      </div>
      
      <div className="tutorial-menu" style={menuStyle}>
        <ThemeProvider theme={buttonTheme}>
          <Button
            variant="text"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            sx={buttonStyle}
          >
            Previous
          </Button>
          <span>{`(${currentIndex + 1} / ${MAX_INDEX + 1})`}</span>
          <Button
            variant="text"
            onClick={handleNext}
            disabled={currentIndex === MAX_INDEX}
            sx={buttonStyle}
          >
            Next
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

Tutorial.propTypes = {};

export default Tutorial;
