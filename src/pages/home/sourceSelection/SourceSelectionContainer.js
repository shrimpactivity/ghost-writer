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

const SourceSelectionContainer = ({ sources, onChange }) => {
  return (
    <div className="source-select-container basic-container" style={containerStyle}>
      <div style={textContainerStyle}>You're writing with</div>
      <div>
        <SourceSelect sources={sources} onChange={onChange}/>
      </div>
    </div>
  );
};

SourceSelectionContainer.propTypes = {
  sources: PropTypes.object,
  onChange: PropTypes.func,
};

export default SourceSelectionContainer;
