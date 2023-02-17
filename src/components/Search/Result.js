import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../config/colorPalette';

const containerStyle = {
  width: '100%',
  padding: '10px',
  cursor: 'pointer',
  borderTop: '2px solid',
};

const Result = ({ value }) => {
  return (
    <div className="search-result" style={containerStyle}>
      <div style={{ color: theme.light }}>{value.authors}</div>
      <div style={{ fontSize: '14px' }}>{value.title}</div>
    </div>
  );
};

Result.propTypes = {
  value: PropTypes.object,
};

export default Result;
