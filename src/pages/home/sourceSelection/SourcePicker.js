import React from 'react';
import PropTypes from 'prop-types';
import SourceSelect from './SourceSelect';
import theme from '../../../config/colorPalette';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '95%',
  maxWidth: '700px',
  padding: '15px',
  margin: '10px',
  backgroundColor: theme.dark,
  borderRadius: '10px',
  border: '2px solid',
  borderColor: theme.medium
};

const textContainerStyle = {
  padding: "10px",
  paddingRight: "15px",
  color: theme.light,
  textAlign: 'center',
  font: '18px Roboto',
  fontStyle: 'italic',
};

const SourcePicker = ({ value, onChange, allSources }) => {
  if (allSources.length === 0) value = '';

  return (
    <div className="source-select-container" style={containerStyle}>
      <div style={textContainerStyle}>You're writing with</div>
      <div>
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
