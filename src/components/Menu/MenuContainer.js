import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonMenu from './ButtonMenu';
import GutenbergSearch from './GutenbergSearch';
import OptionInputs from './OptionInputs';
import theme from '../../config/colorPalette';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
  marginTop: '20px',
  backgroundColor: theme.dark,
  borderRadius: '10px',
  border: '2px solid',
  borderColor: theme.medium,
  color: theme.light,
};

const MenuContainer = ({
  options,
  handleOpenSearch,
  showSearchModal,
  onSearchResultClick,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div style={containerStyle}>
      <ButtonMenu showOptions={showOptions} onOptionButtonClick={() => setShowOptions(!showOptions)} onSearchButtonClick={handleOpenSearch} />
      {showOptions && <OptionInputs options={options}/>}
      {showSearchModal && (
        <GutenbergSearch onResultClick={onSearchResultClick} />
      )}
    </div>
  );
};

MenuContainer.propTypes = {
  options: PropTypes.object.isRequired,
  handleOpenSearch: PropTypes.func.isRequired,
  showSearchModal: PropTypes.bool.isRequired,
  onSearchResultClick: PropTypes.func.isRequired,
};

export default MenuContainer;
