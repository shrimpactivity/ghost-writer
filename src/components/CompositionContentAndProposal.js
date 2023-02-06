import React from 'react';
import PropTypes from 'prop-types';
import theme from '../config/colorPalette';
import { endsInTerminalPunctuation } from '../utils/text';
import { capitalize } from '@mui/material';

const getWordStyle = (isGhostWord) => {
  return {
    marginRight: '4px',
    padding: '1px',
    cursor: 'pointer',
    wordWrap: 'break-word',
    color: isGhostWord ? theme.light : theme.lightest,
    fontFamily: 'Georgia',
    borderRadius: '3px',
  };
};

const proposalStyle = {
  ...getWordStyle(false),
  color: theme.complement,
};

const ContentDivs = ({ composition, onContentClick }) => {
  if (composition.content.length === 0) {
    return;
  }

  const formatContentWord = (word, index) => {
    if (index === 0) {
      return capitalize(word);
    }

    const prevWord = composition.content[index - 1];
    if (endsInTerminalPunctuation(prevWord)) {
      return capitalize(word);
    }

    return word;
  }
  return (
    <>
      {composition.content.map((word, index) => {
        return (
          <div
            className="content-word"
            key={index} // It's an antipattern, congrats if you've found this
            style={getWordStyle(composition.ghostWords[index])}
            onClick={() => onContentClick(index)}
          >
            {formatContentWord(word, index)}
          </div>
        );
      })}
    </>
  );
};

const ProposalDivs = ({ formattedProposal }) => {
  if (formattedProposal.length === 0) {
    return;
  }
  return (
    <>
      {formattedProposal.split(' ').map((word, index) => {
        return (
          <div
            className="content-word"
            key={index} // Another one!
            style={proposalStyle}
          >
            {word}
          </div>
        );
      })}
    </>
  );
};

const CompositionContentAndProposal = ({
  composition,
  formattedProposal,
  onContentClick,
}) => {
  return (
    <>
      <ContentDivs
        composition={composition}
        onContentClick={onContentClick}
      />
      <ProposalDivs formattedProposal={formattedProposal} />
    </>
  );
};

CompositionContentAndProposal.propTypes = {
  formattedContent: PropTypes.string,
  onContentClick: PropTypes.func,
};

export default CompositionContentAndProposal;
