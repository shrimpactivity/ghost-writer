import React from 'react';
import PropTypes from 'prop-types';
import ContentItems from './ContentItems';
import SuggestionPreview from './SuggestionPreview';
import ProposalInput from './ProposalInput';
import CompositionButtons from './CompositionButtons';
import { formatWordArrayIntoSentence } from '../../../utils/text';
import theme from '../../../config/colorPalette';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '30vh',
  width: '95%',
  maxWidth: '700px',
  padding: '10px',
  backgroundColor: theme.dark,
  borderRadius: '10px',
  border: '2px solid',
  borderColor: theme.medium,
  color: theme.lightest,
  fontFamily: 'roboto-mono',
  fontSize: '16px',
  margin: '10px'
};

const CompositionContainer = (props) => {
  const handleCopyComposition = () => {
    const formattedContent = formatWordArrayIntoSentence(
      props.composition.content
    );
    navigator.clipboard.writeText(formattedContent);
    console.log(props.composition.getAllTokens())
  };

  return (
    <div
      className="composition-container home-content-container"
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
