import React from 'react';
import PropTypes from 'prop-types';
import CompositionForm from './CompositionForm';
import CompositionView from './CompositionView';

// Formatted sentence (capitalize and space correctly), writing input (as is), suggestion (capitalize and space correctly)

const CompositionContainer = ({
  composition,
  suggestion,
  options,
  onProposalChange,
  onProposalSubmit,
  onContentClick,
}) => {

  return (
    <div>
      <CompositionView
        composition={composition}
        suggestion={suggestion}
        onContentClick={onContentClick}
        options={options}
      />
      <CompositionForm
        style={{ float: 'none' }}
        onSubmit={onProposalSubmit}
        onChange={onProposalChange}
        value={composition.proposal}
      />
    </div>
  );
};

CompositionContainer.propTypes = {
  composition: PropTypes.object,
  suggestion: PropTypes.string,
  options: PropTypes.object,
  onProposalChange: PropTypes.func,
  onProposalSubmit: PropTypes.func,
  onContentClick: PropTypes.func,
};

export default CompositionContainer;
