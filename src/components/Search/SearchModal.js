import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Container } from '@mui/material';
import SearchContainer from './SearchContainer';
import LocalSourcesList from './LocalSourcesList';
import theme from '../../config/colorPalette';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const modalContainerStyle = {
  position: 'absolute',
  top: '140px',
  left: '50%',
  minHeight: '20%',
  maxHeight: '80%',
  width: '60%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.dark,
  border: '2px solid',
  borderColor: theme.medium,
  borderRadius: '10px',
  boxShadow: 24,
  color: theme.lightest,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'auto',
};

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: theme.complement,
    },
  },
});

const SearchModal = ({
  open,
  onClose,
  onSearchResultClick,
  localSources,
  onClickDelete,
}) => {
  return (
    <Modal open={open}>
      <div style={modalContainerStyle}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{flex: '1'}}>
            <SearchContainer onSearchResultClick={onSearchResultClick} />
          </div>
          {localSources.length > 0 && (
            <div style={{ borderLeft: '1px solid', borderColor: theme.medium, flex: '1' }}>
              <LocalSourcesList
                localSources={localSources}
                onClickDelete={onClickDelete}
              />
            </div>
          )}
        </div>
        <div>
          <ThemeProvider theme={buttonTheme}>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </Modal>
  );
};

SearchModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearchResultClick: PropTypes.func.isRequired,
};

export default SearchModal;
