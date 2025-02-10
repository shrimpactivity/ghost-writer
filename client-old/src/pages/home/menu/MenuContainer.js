import React from 'react';
import PropTypes from 'prop-types';

import ButtonMenu from './ButtonMenu';
import OptionInputs from './OptionInputs';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
  marginBottom: '30px'
};

const MenuContainer = ({
  options,
  onOpenSearchClick,
  showOptions,
  onOptionsClick,
}) => {
  return (
    <div className="home-content-container basic-container" style={containerStyle}>
      <ButtonMenu
        showOptions={showOptions}
        onOptionButtonClick={onOptionsClick}
        onSearchButtonClick={onOpenSearchClick}
      />
      {showOptions && <OptionInputs options={options} />}
    </div>
  );
};

MenuContainer.propTypes = {
  options: PropTypes.object.isRequired,
  onOpenSearchClick: PropTypes.func.isRequired,
};

export default MenuContainer;
