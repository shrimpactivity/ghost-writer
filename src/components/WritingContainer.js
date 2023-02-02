import React from 'react';
import PropTypes from 'prop-types';
import CompositionForm from './CompositionForm';
import CompositionWords from './CompositionWords';
import theme from '../config/colorPalette';

// Formatted sentence (capitalize and space correctly), writing input (as is), suggestion (capitalize and space correctly)

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: '40vh',
  padding: '10px',
  backgroundColor: theme.dark,
  borderRadius: '10px',
  border: '2px solid',
  borderColor: theme.medium,
};

const WritingContainer = ({
  composition,
  suggestion,
  options,
  onProposalChange,
  onProposalSubmit,
  onContentClick,
  onDeleteLastWord,
  onDeleteComposition,
}) => {
  return (
    <div style={containerStyle}>
      <div>
        <CompositionWords
          composition={composition}
          suggestion={suggestion}
          onContentClick={onContentClick}
          options={options}
        />
      </div>
      <div style={{alignSelf:"center"}}>
        <CompositionForm
          onChange={onProposalChange}
          value={composition.proposal}
          onSubmit={onProposalSubmit}
          onDeleteLastWord={onDeleteLastWord}
          onDeleteComposition={onDeleteComposition}
        />
      </div>
    </div>
  );
};

WritingContainer.propTypes = {
  composition: PropTypes.object,
  suggestion: PropTypes.string,
  options: PropTypes.object,
  onProposalChange: PropTypes.func,
  onProposalSubmit: PropTypes.func,
  onContentClick: PropTypes.func,
  onDeleteLastWord: PropTypes.func,
  onDeleteComposition: PropTypes.func,
};

export default WritingContainer;
