import React from 'react';
import PropTypes from 'prop-types';
import {
  endsInTerminalPunctuation,
  formatWordArrayIntoSentence,
  removeExtraWhitespace,
} from '../../../utils/text';
import { capitalize } from '@mui/material';
import theme from '../../../config/colorPalette';

const suggestionStyle = {
  marginLeft: '5px',
  wordWrap: 'break-word',
  color: theme.light,
  borderRadius: '3px',
  whiteSpace: 'pre',
};

const SuggestionPreview = ({
  composition,
  suggestion,
  isSuggestionLoading,
}) => {
  if (!suggestion) suggestion = '';

  const formattedContent = formatWordArrayIntoSentence(composition.content);
  const formattedProposal = removeExtraWhitespace(composition.proposal);
  const predecessorToSuggestion = formattedContent + formattedProposal;

  let formattedSuggestion = suggestion;
  if (isSuggestionLoading) {
    formattedSuggestion = '...';
  } else if (
    !predecessorToSuggestion ||
    endsInTerminalPunctuation(predecessorToSuggestion)
  ) {
    formattedSuggestion = capitalize(suggestion);
  }

  return (
    <span className="suggestion-preview" style={suggestionStyle}>
      {
        // The mapping below is necessary for styling the suggestion 'wave' animation
        formattedSuggestion.split('').map((letter, index) => {
          return (
            <span key={index} className="suggestion-char" style={{ '--i': index }}>
              {letter}
            </span>
          );
        })
      }
    </span>
  );
};

SuggestionPreview.propTypes = {
  suggestion: PropTypes.string,
  isSuggestionLoading: PropTypes.bool,
  composition: PropTypes.object.isRequired,
};

export default SuggestionPreview;
