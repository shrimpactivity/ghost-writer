import React from 'react';
import PropTypes from 'prop-types';
import CompositionContentAndProposal from './CompositionContentAndProposal';
import SuggestionPreview from './SuggestionPreview';
import {
  formatWordArrayIntoSentence,
  removeExtraWhitespace,
} from '../utils/text';

const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    wordWrap: 'break-word',
    padding: '1vw',
};

const CompositionWriting = ({
  composition,
  suggestion,
  onContentClick,
  options
}) => {
  const formattedContent = formatWordArrayIntoSentence(composition.content);
  const formattedProposal = removeExtraWhitespace(composition.proposal);

  return (
    <div style={containerStyle}>
      <CompositionContentAndProposal
        composition={composition}
        formattedProposal={formattedProposal}
        onContentClick={onContentClick}
      />
      {options.showSuggestionPreview && (
        <SuggestionPreview
          suggestion={suggestion}
          formattedContent={formattedContent}
          formattedProposal={formattedProposal}
        />
      )}
    </div>
  );
};

CompositionWriting.propTypes = {
  composition: PropTypes.object,
  suggestion: PropTypes.string,
  onContentClick: PropTypes.func,
};

export default CompositionWriting;
