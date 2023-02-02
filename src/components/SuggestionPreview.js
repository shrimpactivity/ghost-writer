import React from 'react';
import PropTypes from 'prop-types';
import { endsInTerminalPunctuation } from '../utils/text';
import { capitalize } from '@mui/material';
import theme from '../config/colorPalette';


const suggestionStyle = {
  marginRight: '6px',
  padding: '1px',
  wordWrap: 'break-word',
  color: theme.complement,
  fontFamily: 'Georgia',
  borderRadius: '3px',
};

const SuggestionPreview = ({ suggestion, formattedContent, formattedProposal }) => {

  let predecessorToSuggestion = formattedContent + formattedProposal;
  let formattedSuggestion = suggestion;
  if (endsInTerminalPunctuation(predecessorToSuggestion)) {
    formattedSuggestion = capitalize(suggestion);
  }

  return (
    <div style={suggestionStyle}>
      {formattedSuggestion}
    </div>
  );
};

SuggestionPreview.propTypes = {
  suggestion: PropTypes.string,
  formattedContent: PropTypes.string,
  formattedProposal: PropTypes.string
};

export default SuggestionPreview;
