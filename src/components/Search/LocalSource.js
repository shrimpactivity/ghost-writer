import React from 'react';
import PropTypes from 'prop-types';

const LocalSource = ({ source, onClickDelete }) => {
  return (
    <div>
      <div>
        <div>{source.title}</div>
        <div>{source.author}</div>
      </div>
      <div><button onClick={() => onClickDelete(source.id)}>X</button></div>
    </div>
  );
};

LocalSource.propTypes = {
  source: PropTypes.object.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default LocalSource;
