import React from 'react';
import PropTypes from 'prop-types';
import SourceSelect from './SourceSelect';
import theme from '../../../theme/palette';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '10px'
};

const textContainerStyle = {
  padding: "10px",
  paddingRight: "15px",
  color: theme.light,
  textAlign: 'center',
  font: '18px Roboto',
  fontStyle: 'italic',
};

const SourceSelectionContainer = ({ value, onChange, allSources }) => {
  if (allSources.length === 0) value = '';

  return (
    <div className="source-select-container basic-container" style={containerStyle}>
      <div style={textContainerStyle}>You're writing with</div>
      <div>
        <SourceSelect value={value} onChange={onChange} allSources={allSources} />
      </div>
    </div>
  );
};

SourceSelectionContainer.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  allSources: PropTypes.array,
};

export default SourceSelectionContainer;
