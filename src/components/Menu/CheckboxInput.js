import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../config/colorPalette';

const containerStyle = {
  padding: '5px',
};

const labelStyle = {
  fontSize: '18px',
  marginRight: '10px',
};

const inputStyle = {
  width: '1rem', 
  height: '1rem',
  cursor: 'pointer',
  backgroundColor: theme.light,
  float: 'right'
}

const CheckboxInput = ({ label, value, onChange }) => {
  return (
    <div style={containerStyle}>
      <span style={labelStyle}>{label}</span>
      <input style={inputStyle} type="checkbox" onChange={onChange} checked={value} />
    </div>
  );
};

CheckboxInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CheckboxInput;
