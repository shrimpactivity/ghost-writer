import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Container } from '@mui/material';
import SearchContainer from './SearchContainer';
import LocalSourcesList from './LocalSourcesList';
import theme from '../../config/colorPalette';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const modalStyle = {
  position: 'absolute',
  top: '140px',
  left: '50%',
  minHeight: '20%',
  maxHeight: '80%',
  width: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.dark,
  border: '2px solid',
  borderColor: theme.medium,
  borderRadius: '10px',
  boxShadow: 24,
  color: theme.lightest,
  overflow: 'auto',
};

const flexContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  overflow: 'auto',
  width: '100%',
  height: '100%',
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
      <Container maxWidth="sm" style={modalStyle}>
        <div style={flexContainerStyle}>
          <div>
            {localSources.length > 0 && (
              <LocalSourcesList
                localSources={localSources}
                onClickDelete={onClickDelete}
              />
            )}
          </div>
          <div>
            <SearchContainer onSearchResultClick={onSearchResultClick} />
          </div>
          <div style={{ padding: '20px' }}>
            <ThemeProvider theme={buttonTheme}>
              <Button
                sx={{ justifySelf: 'flex-end', marginBottom: '-40px' }}
                variant="outlined"
                onClick={onClose}
              >
                Close
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </Container>
    </Modal>
  );
};

SearchModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearchResultClick: PropTypes.func.isRequired,
};

export default SearchModal;
