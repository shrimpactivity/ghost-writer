import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../config/colorPalette';
import { capitalize, endsInTerminalPunctuation, beginsInTerminalPunctuation } from '../../utils/text';

const getWordStyle = (word, isGhostWord) => {
  return {
    marginLeft: beginsInTerminalPunctuation(word) ? '0px' : '5px',
    cursor: 'pointer',
    color: isGhostWord ? theme.light : theme.lightest,
    fontFamily: 'Georgia',
    borderRadius: '3px',
    display: 'inline',
    overflowWrap: 'break-word',
    maxWidth: '100%'
  };
};

const formatContentWord = (word, index, composition) => {
  if (index === 0) {
    return capitalize(word);
  }
  const prevWord = composition.content[index - 1];
  if (endsInTerminalPunctuation(prevWord)) {
    return capitalize(word);
  }
  return word;
};

const ContentItems = ({ composition, onContentClick, highlightGhostWords }) => {
  if (composition.content.length === 0) {
    return;
  }

   

  return (
    <>
      {composition.content.map((word, index) => {
        return (
          <span
            className="content-word"
            key={index} // It's an antipattern, congrats if you've found this
            style={getWordStyle(word, highlightGhostWords && composition.ghostWords[index])}
            onClick={() => onContentClick(index)}
          >
            {formatContentWord(word, index, composition)}
          </span>
        );
      })}
    </>
  );
};

ContentItems.propTypes = {
  composition: PropTypes.object.isRequired,
  onContentClick: PropTypes.func.isRequired,
  highlightGhostWords: PropTypes.bool,
}

export default ContentItems;