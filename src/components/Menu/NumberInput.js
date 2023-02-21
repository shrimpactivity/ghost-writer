import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../config/colorPalette';

const containerStyle = {
  padding: '5px'
}

const inputStyle = {
  display: 'inline-block',
  backgroundColor: theme.light,
  color: theme.darkest,
  fontSize: '16px',
  width: '3em',
  float: 'right'
};

const labelStyle = {
  fontSize: '16px',
  marginRight: '10px'
};

const NumberInput = ({ value, onChange, min, max, label }) => {
  return (
    <div style={containerStyle}>
      <span style={labelStyle}>{label}</span>
      <input
        style={inputStyle}
        type="number"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step="1"
      />
    </div>
  );
};

NumberInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  min: PropTypes.string,
  max: PropTypes.string,
};

export default NumberInput;
