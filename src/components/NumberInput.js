import React from 'react';
import PropTypes from 'prop-types';

const NumberInput = ({ value, onChange, min, max, label }) => {
  return (
    <div>
      <label>
        {label}
        <input type="number" value={value} onChange={onChange} min={min} max={max} step="1" />
      </label>
    </div>
  )
}

NumberInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  min: PropTypes.string,
  max: PropTypes.string,
  label: PropTypes.string
}

export default NumberInput;
