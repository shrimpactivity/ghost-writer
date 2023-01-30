import React from 'react';
import PropTypes from 'prop-types';
import { endsInTerminalPunctuation } from '../utils/text';
import { capitalize } from '@mui/material';

const suggestionStyle = () => {
  return {
    display: 'inline-block',
    whiteSpace: 'pre',
    cursor: 'pointer',
    color: 'red',
  };
};

const SuggestionPreview = ({ suggestion, formattedContent, formattedProposal }) => {

  let predecessorToSuggestion = formattedContent + formattedProposal;
  let formattedSuggestion = suggestion;
  if (endsInTerminalPunctuation(predecessorToSuggestion)) {
    formattedSuggestion = capitalize(suggestion);
  }

  return (
    <div style={suggestionStyle()}>
      <em>{formattedSuggestion}</em>
    </div>
  );
};

SuggestionPreview.propTypes = {
  suggestion: PropTypes.string,
  formattedContent: PropTypes.string,
  formattedProposal: PropTypes.string
};

export default SuggestionPreview;
