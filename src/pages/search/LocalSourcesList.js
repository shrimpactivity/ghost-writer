import React from 'react';
import PropTypes from 'prop-types';
import LocalSource from './LocalSource';
import theme from '../../config/colorPalette';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
  padding: '20px', 
}

const titleStyle = {
  color: theme.light,
  fontSize: '22px',
  alignSelf: 'center',
  paddingBottom: '10px'
}

const LocalSourcesList = ({ localSources, onClickDelete }) => {
  return (
    <div style={containerStyle}>
      <span style={titleStyle}>Downloaded Ghosts</span>
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
  );
};

LocalSourcesList.propTypes = {
  localSources: PropTypes.array,
  onClickDelete: PropTypes.func,
};

export default LocalSourcesList;
