import React from 'react';
import PropTypes from 'prop-types';
import CompositionContent from './CompositionContent';
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

const CompositionWords = ({
  composition,
  suggestion,
  onContentClick,
  options
}) => {
  const formattedContent = formatWordArrayIntoSentence(composition.content);
  const formattedProposal = removeExtraWhitespace(composition.proposal);

  return (
    <div style={containerStyle}>
      <CompositionContent
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

CompositionWords.propTypes = {
  composition: PropTypes.object,
  suggestion: PropTypes.string,
  onContentClick: PropTypes.func,
};

export default CompositionWords;
