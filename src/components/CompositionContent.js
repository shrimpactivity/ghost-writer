import React from 'react';
import PropTypes from 'prop-types';
import theme from '../config/colorPalette';

const contentWordStyle = {
  marginRight: '6px',
  padding: '1px',
  cursor: 'pointer',
  wordWrap: 'break-word',
  color: theme.lightest,
  fontFamily: 'Georgia',
  borderRadius: '3px',
};

const proposalStyle = {
  ...contentWordStyle,
  color: theme.light,
};

const ContentDivs = ({formattedContent, onContentClick}) => {
  if (formattedContent.length === 0) {
    return;
  }
  return (
    <>
      {formattedContent.split(' ').map((word, index) => {
        return (
          <div
            className="content-word"
            key={index} // It's an antipattern, congrats if you've found this
            style={contentWordStyle}
            onClick={() => onContentClick(index)}
          >
            {word}
          </div>
        );
      })}
    </>
  );
};

const ProposalDivs = ({formattedProposal}) => {
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
}

const CompositionContent = ({
  formattedContent,
  formattedProposal,
  onContentClick,
}) => {
  return (
    <>
      <ContentDivs formattedContent={formattedContent} onContentclick={onContentClick}/>
      <ProposalDivs formattedProposal={formattedProposal}/>
    </>
  );
};

CompositionContent.propTypes = {
  formattedContent: PropTypes.string,
  onContentClick: PropTypes.func,
};

export default CompositionContent;
