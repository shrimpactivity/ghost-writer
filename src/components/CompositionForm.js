import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

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
        <Button variant="contained" type="submit">
          +
        </Button>
        <Button variant="contained" onClick={onDeleteLastWord}>
          {'<-'}
        </Button>
        <Button variant="contained" onClick={onDeleteComposition}>
          X
        </Button>
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
