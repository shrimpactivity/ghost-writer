import React from 'react';
import PropTypes from 'prop-types';
import { endsInTerminalPunctuation } from '../../utils/text';
import { capitalize } from '@mui/material';
import theme from '../../config/colorPalette';

const suggestionStyle = {
  marginLeft: '5px',
  wordWrap: 'break-word',
  color: theme.light,
  borderRadius: '3px',
  whiteSpace: "pre"
};

const SuggestionPreview = ({ suggestion, isSuggestionLoading, formattedContent, formattedProposal }) => {

  if (!suggestion) suggestion = '';

  let predecessorToSuggestion = formattedContent + formattedProposal;
  let formattedSuggestion = suggestion;
  if (!predecessorToSuggestion || endsInTerminalPunctuation(predecessorToSuggestion)) {
    formattedSuggestion = capitalize(suggestion);
  }

  if (isSuggestionLoading) {
    formattedSuggestion = '...';
  }

  return (
    <span className="suggestion-preview" style={suggestionStyle}>
      {formattedSuggestion.split('').map((letter, index) => {
        return (
          <span key={index} style={{"--i": index}}>{letter}</span>
        )
      })}
    </span>
  );
};

SuggestionPreview.propTypes = {
  suggestion: PropTypes.string,
  formattedContent: PropTypes.string,
  formattedProposal: PropTypes.string
};

export default SuggestionPreview;
