import React from 'react';
import PropTypes from 'prop-types';

const CompositionViewer = ({
  composition,
  suggestion,
  onContentClick,
  options,
}) => {
  const getSentenceStyle = () => {
    return {
      display: 'inline-block',
      whiteSpace: 'pre',
      cursor: 'pointer',
    };
  };

  const getUserInputStyle = () => {
    return { ...getSentenceStyle(), color: 'blue' };
  };

  const getSuggestionStyle = () => {
    return { ...getSentenceStyle(), color: 'red' };
  };

  return (
    <div>
      Hi
      {composition.content.map((word, index) => {
        return (
          <div
            key={index}
            style={getSentenceStyle()}
            onClick={() => onContentClick(index)}
          >
            {word + ' '}
          </div>
        );
      })}
      <div style={getUserInputStyle()}>{' ' + composition.proposal + ' '}</div>
      {options.showSuggestionPreview && (
        <div style={getSuggestionStyle()}>
          <em>{suggestion}</em>
        </div>
      )}
    </div>
  );
};

CompositionViewer.propTypes = {
  composition: PropTypes.object,
  suggestion: PropTypes.string,
  onContentClick: PropTypes.func,
  options: PropTypes.object,
};

export default CompositionViewer;