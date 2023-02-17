import React from 'react';
import PropTypes from 'prop-types';
import CompositionFormButtons from './CompositionFormButtons';
import theme from '../../config/colorPalette';

const formItemsContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
};

const inputStyle = {
  borderRadius: "5px",
  border: "2px solid",
  borderColor: theme.light,
  backgroundColor: theme.darker,
  color: theme.lightest,
  minWidth: "300px",
  marginRight: "10px",
  height: "30px",
  fontSize: "14px"
};

const CompositionForm = ({
  proposal,
  onProposalChange,
  onCopyComposition,
  onDeleteLastWord,
  onDeleteComposition,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} style={{display: "inline"}}>
      <div style={formItemsContainerStyle}>
        <div>
          <input
            type="text"
            placeholder="Begin typing here..."
            onChange={onProposalChange}
            value={proposal}
            spellCheck="true"
            style={inputStyle}
          />
        </div>
        <div>
          <CompositionFormButtons
            onCopyComposition={onCopyComposition}
            onDeleteLastWord={onDeleteLastWord}
            onDeleteComposition={onDeleteComposition}
          />
        </div>
      </div>
    </form>
  );
};

CompositionForm.propTypes = {
  proposal: PropTypes.string.isRequired,
  onProposalChange: PropTypes.func.isRequired,
  onCopyComposition: PropTypes.func.isRequired,
  onDeleteLastWord: PropTypes.func.isRequired,
  onDeleteComposition: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CompositionForm;
