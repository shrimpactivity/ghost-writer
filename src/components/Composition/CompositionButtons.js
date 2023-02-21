import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../config/colorPalette';
import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const buttonTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const CompositionButtons = ({ onCopyComposition, onDeleteComposition }) => {
  return (
    <>
      <ThemeProvider theme={buttonTheme}>
        <Tooltip title="Copy composition">
          <IconButton aria-label="copy composition" variant="contained" onClick={onCopyComposition}>
            <ContentCopyIcon sx={{ color: theme.alternate }} fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete composition">
          <IconButton aria-label="delete composition" variant="contained" onClick={onDeleteComposition}>
            <DeleteForeverIcon sx={{ color: theme.complement }} fontSize="medium"/>
          </IconButton>
        </Tooltip>
      </ThemeProvider>
    </>
  );
};

CompositionButtons.propTypes = {
  onCopyComposition: PropTypes.func.isRequired,
  onDeleteComposition: PropTypes.func.isRequired,
};

export default CompositionButtons;
