import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../config/colorPalette';
import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const buttonTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const CompositionButtons = ({ onProposalSubmit, onAddNewLine, onCopyComposition, onDeleteComposition }) => {
  return (
    <>
      <ThemeProvider theme={buttonTheme}>
        <Tooltip title="Accept suggestion (Tab)">
          <IconButton
            aria-label="copy composition"
            variant="contained"
            onClick={onProposalSubmit}
          >
            <AddCircleOutlineIcon sx={{ color: theme.light }} fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Tooltip title="New line (Enter)">
          <IconButton
            aria-label="copy composition"
            variant="contained"
            onClick={onAddNewLine}
          >
            <KeyboardReturnIcon sx={{ color: theme.light }} fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Copy composition">
          <IconButton
            aria-label="copy composition"
            variant="contained"
            onClick={onCopyComposition}
          >
            <ContentCopyIcon sx={{ color: theme.light }} fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete composition">
          <IconButton
            aria-label="delete composition"
            variant="contained"
            onClick={onDeleteComposition}
          >
            <DeleteForeverIcon
              sx={{ color: theme.complement }}
              fontSize="medium"
            />
          </IconButton>
        </Tooltip>
      </ThemeProvider>
    </>
  );
};

CompositionButtons.propTypes = {
  onProposalSubmit: PropTypes.func.isRequired,
  onAddNewLine: PropTypes.func.isRequired,
  onCopyComposition: PropTypes.func.isRequired,
  onDeleteComposition: PropTypes.func.isRequired,
};

export default CompositionButtons;
