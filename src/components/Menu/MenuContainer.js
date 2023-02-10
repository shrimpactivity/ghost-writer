import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonMenu from './ButtonMenu';
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
  onOpenSearchClick,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div style={containerStyle}>
      <ButtonMenu showOptions={showOptions} onOptionButtonClick={() => setShowOptions(!showOptions)} onSearchButtonClick={onOpenSearchClick} />
      {showOptions && <OptionInputs options={options}/>}
    </div>
  );
};

MenuContainer.propTypes = {
  options: PropTypes.object.isRequired,
  onOpenSearchClick: PropTypes.func.isRequired,
};

export default MenuContainer;
