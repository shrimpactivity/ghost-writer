import React from 'react';
import PropTypes from 'prop-types';

import palette from '../../../theme/palette';

const suggestionStyle = {
  marginLeft: '5px',
  wordWrap: 'break-word',
  color: palette.light,
  borderRadius: '3px',
  whiteSpace: 'pre',
};

const SuggestionPreview = ({
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
};

export default SuggestionPreview;
