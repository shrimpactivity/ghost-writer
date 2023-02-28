import React from 'react';
import PropTypes from 'prop-types';

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
  if (isSuggestionLoading) {
    suggestion = '...';
  } 

  return (
    <span className="suggestion-preview" style={suggestionStyle}>
      {
        // The mapping below is necessary for styling the suggestion 'wave' animation
        suggestion.split('').map((letter, index) => {
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
