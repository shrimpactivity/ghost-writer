import React from 'react';
import PropTypes from 'prop-types';

const CheckboxInput = ({ label, value, onChange }) => {
  return (
    <div>
      <label>
        {label}
        <input type="checkbox" onChange={onChange} checked={value} />
      </label>
    </div>
  );
};

CheckboxInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CheckboxInput;
