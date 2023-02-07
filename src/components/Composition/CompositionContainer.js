import React from 'react';
import PropTypes from 'prop-types';
import CompositionForm from './CompositionForm';
import CompositionWords from './CompositionWords';
import theme from '../../config/colorPalette';

// Formatted sentence (capitalize and space correctly), writing input (as is), suggestion (capitalize and space correctly)

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: '40vh',
  padding: '10px',
  marginTop: '20px',
  backgroundColor: theme.dark,
  borderRadius: '10px',
  border: '2px solid',
  borderColor: theme.medium,
};

const CompositionContainer = ({
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
        <CompositionForm
          proposal={composition.proposal}
          onProposalChange={onProposalChange}
          onDeleteLastWord={onDeleteLastWord}
          onDeleteComposition={onDeleteComposition}
          onSubmit={onProposalSubmit}
        />
      </div>
      <div>
        <CompositionWords
          composition={composition}
          suggestion={suggestion}
          onContentClick={onContentClick}
          options={options}
        />
      </div>
      
    </div>
  );
};

CompositionContainer.propTypes = {
  composition: PropTypes.object.isRequired,
  suggestion: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  onProposalChange: PropTypes.func.isRequired,
  onProposalSubmit: PropTypes.func.isRequired,
  onContentClick: PropTypes.func.isRequired,
  onDeleteLastWord: PropTypes.func.isRequired,
  onDeleteComposition: PropTypes.func.isRequired,
};

export default CompositionContainer;
