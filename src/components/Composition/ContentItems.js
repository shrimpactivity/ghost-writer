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

const Word = ({ composition, onContentClick, index, word, options }) => {
  return (
    <>
      {composition.lineBreaks[index] ? (
        <p key={composition.lineBreaks[index]}></p>
      ) : null}
      <span
        className="content-word"
        style={getWordStyle(word, index, composition, options)}
        onClick={() => onContentClick(index)}
      >
        {formatContentWord(word, index, composition)}
      </span>
    </>
  );
};

const ContentItems = ({ composition, onContentClick, options }) => {
  if (composition.content.length === 0) {
    return;
  }
  return (
    <>
      {composition.content.map((word, index) => {
        return (
          <Word
            key={index} // It's an antipattern, I know...
            index={index}
            word={word}
            composition={composition}
            options={options}
          />
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
