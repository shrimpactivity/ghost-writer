import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import CompositionFormButtons from './CompositionFormButtons';

const CompositionForm = ({
  proposal,
  onProposalChange,
  onDeleteLastWord,
  onDeleteComposition,
  onSubmit,
}) => {
  return (
    <div style={{ padding: '10px' }}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Start typing here"
          onChange={onProposalChange}
          value={proposal}
          spellCheck="true"
        />
        <CompositionFormButtons onDeleteLastWord={onDeleteLastWord} onDeleteComposition={onDeleteComposition} />
      </form>
    </div>
  );
};

CompositionForm.propTypes = {
  proposal: PropTypes.string.isRequired,
  onProposalChange: PropTypes.func.isRequired,
  onDeleteLastWord: PropTypes.func.isRequired,
  onDeleteComposition: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default CompositionForm;
