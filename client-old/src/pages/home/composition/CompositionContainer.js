import React from 'react';
import PropTypes from 'prop-types';

import ContentItems from './ContentItems';
import SuggestionPreview from './SuggestionPreview';
import ProposalInput from './ProposalInput';
import CompositionButtons from './CompositionButtons';
import { formatWordArrayIntoSentence } from '../../../utils/text';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '30vh',
  fontFamily: 'roboto-mono, lucida console, monospace',
  fontSize: '16px',
};

const CompositionContainer = (props) => {
  const handleCopyComposition = () => {
    const formattedContent = formatWordArrayIntoSentence(
      props.composition.content.map(item => item.word)
    );
    navigator.clipboard.writeText(formattedContent);
  };

  return (
    <div
      className="composition-container basic-container"
      style={containerStyle}
      onClick={props.onContainerClick}
    >
      <div>
        <ContentItems {...props} />
        <ProposalInput {...props} />
        {props.options.showSuggestionPreview ? (
          <SuggestionPreview {...props} />
        ) : null}
      </div>
      <div style={{alignSelf: 'flex-end'}}>
        <CompositionButtons
          {...props}
          onCopyComposition={handleCopyComposition}
        />
      </div>
    </div>
  );
};

CompositionContainer.propTypes = {
  composition: PropTypes.object.isRequired,
  suggestion: PropTypes.string,
  isSuggestionLoading: PropTypes.bool,
  options: PropTypes.object.isRequired,
  onProposalSubmit: PropTypes.func.isRequired,
  onContainerClick: PropTypes.func.isRequired,
  onContentClick: PropTypes.func.isRequired,
  onDeleteComposition: PropTypes.func.isRequired,
};

export default CompositionContainer;
