import React from 'react';
import PropTypes from 'prop-types';
import LocalSource from './LocalSource';

const LocalSourcesList = ({ localSources, onClickDelete }) => {
  return (
    <div>
      <span>Your Downloaded Ghosts</span>
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
