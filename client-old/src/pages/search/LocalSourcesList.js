import React from 'react';
import PropTypes from 'prop-types';
import LocalSource from './LocalSource';
import palette from '../../theme/palette';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px'
};

const titleStyle = {
  color: palette.light,
  backgroundColor: palette.dark,
  borderRadius: '10px',
  padding: '5px',
  paddingLeft: '10px',
  paddingRight: '10px',
  fontSize: '20px',
};

const LocalSourcesList = ({ localSources, onClickDelete }) => {
  return (
    <div style={containerStyle}>
      <span style={titleStyle}>Downloaded Ghosts</span>
      <div style={{maxHeight: '40vh', overflow: 'auto'}}>
      {localSources.map((source) => {
        return (
          <LocalSource
            key={source.id}
            source={source}
            onClickDelete={onClickDelete}
          />
        );
      })}
      </div>
    </div>
  );
};

LocalSourcesList.propTypes = {
  localSources: PropTypes.array,
  onClickDelete: PropTypes.func,
};

export default LocalSourcesList;
