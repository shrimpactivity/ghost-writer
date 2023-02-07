import React from 'react';
import PropTypes from 'prop-types';
import SuggestionPreview from './SuggestionPreview';
import {
  formatWordArrayIntoSentence,
  removeExtraWhitespace,
} from '../../utils/text';
import ProposalItem from './ProposalItem';
import ContentItems from './ContentItems';

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
      <ContentItems
        composition={composition}
        onContentClick={onContentClick}
      />
      <ProposalItem formattedProposal={formattedProposal} />
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
  composition: PropTypes.object.isRequired,
  suggestion: PropTypes.string.isRequired,
  onContentClick: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired
};

export default CompositionWords;
