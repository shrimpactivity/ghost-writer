import React from 'react';
import PropTypes from 'prop-types';

const sentenceStyle = () => {
  return {
    marginRight: '10px',
    cursor: 'pointer',
    wordWrap: "break-word"
  };
};

const proposalStyle = () => {
  return { ...sentenceStyle(), color: 'blue' };
};

const CompositionContent = ({
  formattedContent,
  formattedProposal,
  onContentClick,
}) => {
  return (
    <>
      {formattedContent.split(' ').map((word, index) => {
        return (
          <div
            key={index} // It's an antipattern, congrats if you've found this
            style={sentenceStyle()}
            onClick={() => onContentClick(index)}
          >
            {word + ' '}
          </div>
        );
      })}
      <div style={proposalStyle()}>{formattedProposal}</div>
    </>
  );
};

CompositionContent.propTypes = {
  formattedContent: PropTypes.string,
  onContentClick: PropTypes.func,
};

export default CompositionContent;
