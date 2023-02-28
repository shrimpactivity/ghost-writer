import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../../config/colorPalette';
import { beginsWithPunctuation } from '../../../utils/text';

const getWordStyle = (contentItem, options) => {
  const highlightWord = options.highlightGhostWords && contentItem.ghost;
  return {
    marginLeft: beginsWithPunctuation(contentItem.word) ? '0px' : '0.6em',
    cursor: 'pointer',
    color: highlightWord ? theme.light : theme.lightest,
    borderRadius: '3px',
    display: 'inline-block',
    maxWidth: '100%',
  };
};

const Word = ({ contentItem, onContentClick, index, options }) => {
  return (
    <>
      <span
        className="content-word"
        style={getWordStyle(contentItem, options)}
        onClick={() => onContentClick(index)}
      >
        {contentItem.word}
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
      {composition.content.map((contentItem, index) => {
        return contentItem.word === '\n' ? (
          <div key={index} style={{ height: '20px' }}></div>
        ) : (
          <Word
            key={contentItem.id} // It's an antipattern, I know...
            index={index}
            contentItem={contentItem}
            composition={composition}
            options={options}
            onContentClick={onContentClick}
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
