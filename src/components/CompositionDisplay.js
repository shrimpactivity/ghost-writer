import React from 'react';
import PropTypes from 'prop-types';
import textUtils from '../../../shared-lib/textUtils';

// Formatted sentence (capitalize and space correctly), writing input (as is), suggestion (capitalize and space correctly)

const CompositionDisplay = ({ composition, userInput, suggestion, showPreview, onWordClick }) => {

  const potentialComposition = (composition + userInput).trim();
  const formattedSuggestion = !potentialComposition || textUtils.endsInTerminalPunctuation(potentialComposition)
  ? textUtils.capitalize(suggestion)
  : suggestion;

  const compositionArray = composition.split(' ');
  let formattedCompositionArray = compositionArray.map(word => {
    if (/[!?.,]+/.test(word)) {
      return word;
    }
    return (` ${word}`);
  })

  const getSentenceStyle = () => {
    return { 
      display: 'inline-block', 
      whiteSpace: 'pre', 
      cursor: 'pointer' 
    };
  }
  
  const getUserInputStyle = () => {
    return {...getSentenceStyle(), color: 'blue'}
  }

  const getSuggestionStyle = () => {
    return {...getSentenceStyle(), color: 'red'}
  }

  return (
    <div>
      {
        formattedCompositionArray.map((word, index) => {
          return (
            <div key={index} style={getSentenceStyle()} onClick={() => onWordClick(index)}>
              {word}
            </div>
          )
        })
      }
      <div style={getUserInputStyle()}>{' ' + userInput + ' '}</div>
      {showPreview && <div style={getSuggestionStyle()}><em>{formattedSuggestion}</em></div>}
    </div>
  )
}

CompositionDisplay.propTypes = {
  composition: PropTypes.string,
  userInput: PropTypes.string,
  suggestion: PropTypes.string,
  showPreview: PropTypes.bool,
  onWordClick: PropTypes.func,
}

export default CompositionDisplay;