import React from 'react';
import PropTypes from 'prop-types';

const Result = ({ value }) => {
  return (
    <div>
      <div>
        {value.title}
      </div>
      <div>
        {value.authors}
      </div>
    </div>
  );
};

Result.propTypes = {
  value: PropTypes.object,
};

export default Result;