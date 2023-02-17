import React from 'react';
import PropTypes from 'prop-types';
import SourceSelect from './SourceSelect';
import theme from '../../config/colorPalette';

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '15px',
  backgroundColor: theme.dark,
  borderRadius: '10px',
  border: '2px solid',
  borderColor: theme.medium
};

const textContainerStyle = {
  padding: "9px",
  color: theme.light,
  textAlign: 'center',
  font: '20px Times New Roman',
  fontStyle: 'italic',
};

const SourcePicker = ({ value, onChange, allSources }) => {
  if (allSources.length === 0) value = '';

  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>You're writing with</div>
      <div style={{ maxWidth: '340px' }}>
        <SourceSelect value={value} onChange={onChange} allSources={allSources} />
      </div>
    </div>
  );
};

SourcePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  allSources: PropTypes.array,
};

export default SourcePicker;
