import React from 'react';
import PropTypes from 'prop-types';
import CompositionContent from './CompositionContent';
import SuggestionPreview from './SuggestionPreview';
import {
  formatWordArrayIntoSentence,
  removeExtraWhitespace,
} from '../utils/text';

const viewStyle = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    wordWrap: 'break-word',
    padding: '1vw',
  };
};

const CompositionWords = ({
  composition,
  suggestion,
  onContentClick,
  options,
}) => {
  const formattedContent = formatWordArrayIntoSentence(composition.content);
  const formattedProposal = removeExtraWhitespace(composition.proposal);

  return (
    <div style={viewStyle()}>
      <CompositionContent
        formattedContent={formattedContent}
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
  options: PropTypes.object,
};

export default CompositionWords;
