import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Container } from '@mui/material';
import SearchContainer from './SearchContainer';
import theme from '../../config/colorPalette';

const modalStyle = {
  position: 'absolute',
  top: '140px',
  left: '50%',
  minHeight: '20%',
  maxHeight: "80%",
  transform: 'translateX(-50%)',
  backgroundColor: theme.dark,
  border: '2px solid',
  borderColor: theme.medium,
  borderRadius: '10px',
  boxShadow: 24,
  color: theme.lightest,
};

const flexContainerStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: "center",
  padding: '10px',
  overflow: "auto",
};

const SearchModal = ({ open, onClose, onSearchResultClick }) => {
  return (
    <Modal open={open}>
      <Container maxWidth="sm" style={modalStyle}>
        <div style={flexContainerStyle}>
          <div>
            Search Project Gutenberg
          </div>
          <div>
            <SearchContainer onSearchResultClick={onSearchResultClick} />
          </div>
          <div>
            <Button variant="contained" onClick={onClose}>
              Accept
            </Button>
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
