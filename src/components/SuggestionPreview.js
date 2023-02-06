import React from 'react';
import PropTypes from 'prop-types';
import { endsInTerminalPunctuation } from '../utils/text';
import { capitalize } from '@mui/material';
import theme from '../config/colorPalette';

const suggestionStyle = {
  marginRight: '6px',
  padding: '1px',
  wordWrap: 'break-word',
  color: theme.light,
  fontFamily: 'Georgia',
  borderRadius: '3px',
  whiteSpace: "pre"
};

const SuggestionPreview = ({ suggestion, formattedContent, formattedProposal }) => {

  let predecessorToSuggestion = formattedContent + formattedProposal;
  let formattedSuggestion = suggestion;
  if (!predecessorToSuggestion || endsInTerminalPunctuation(predecessorToSuggestion)) {
    formattedSuggestion = capitalize(suggestion);
  }

  return (
    <div className="suggestion-preview" style={suggestionStyle}>
      {formattedSuggestion.split('').map((letter, index) => {
        return (
          <span key={index} style={{"--i": index}}>{letter}</span>
        )
      })}
    </div>
  );
};

SuggestionPreview.propTypes = {
  suggestion: PropTypes.string,
  formattedContent: PropTypes.string,
  formattedProposal: PropTypes.string
};

export default SuggestionPreview;
