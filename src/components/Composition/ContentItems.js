import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../config/colorPalette';
import {
  capitalize,
  endsInTerminalPunctuation,
  beginsWithPunctuation,
} from '../../utils/text';


const getWordStyle = (word, index, composition, options) => {
  const isGhostWord =
    options.highlightGhostWords && composition.ghostWords[index];
  return {
    marginLeft: beginsWithPunctuation(word) ? '0px' : '0.6em',
    cursor: 'pointer',
    color: isGhostWord ? theme.light : theme.lightest,
    borderRadius: '3px',
    display: 'inline-block',
    maxWidth: '100%',
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

const ContentItems = ({ composition, onContentClick, options }) => {
  if (composition.content.length === 0) {
    return;
  }
  return (
    // we have a list of word indexes, and the new line should be inserted before them.
    <>
      {composition.content.map((word, index) => {
        return (
          <>
            {composition.lineBreaks[index] ? <p key={composition.lineBreaks[index]}></p> : null}
            <span
              className="content-word"
              key={index} // It's an antipattern, I know...
              style={getWordStyle(word, index, composition, options)}
              onClick={() => onContentClick(index)}
            >
              {formatContentWord(word, index, composition)}
            </span>
          </>
        );
      })}
    </>
  );
};

ContentItems.propTypes = {
  composition: PropTypes.object.isRequired,
  onContentClick: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
};

export default ContentItems;
