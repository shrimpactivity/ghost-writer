import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../config/colorPalette';
import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BackspaceIcon from '@mui/icons-material/Backspace';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const buttonTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const CompositionFormButtons = ({ onCopyComposition, onDeleteLastWord, onDeleteComposition }) => {
  return (
    <>
      <ThemeProvider theme={buttonTheme}>
        <Tooltip title="Add to composition">
          <IconButton aria-label="add to composition" variant="contained" type="submit">
            <AddBoxIcon sx={{ color: theme.light }} fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Copy composition">
          <IconButton aria-label="copy composition" variant="contained" onClick={onCopyComposition}>
            <ContentCopyIcon sx={{ color: theme.light }} fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete last word">
          <IconButton aria-label="delete last word" variant="contained" onClick={onDeleteLastWord}>
            <BackspaceIcon sx={{ color: theme.complement }} fontSize="medium"/>
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

CompositionFormButtons.propTypes = {
  onCopyComposition: PropTypes.func.isRequired,
  onDeleteLastWord: PropTypes.func.isRequired,
  onDeleteComposition: PropTypes.func.isRequired,
};

export default CompositionFormButtons;
