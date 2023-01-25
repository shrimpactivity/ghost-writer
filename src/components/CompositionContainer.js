import React from 'react';
import PropTypes from 'prop-types';
import CompositionForm from './CompositionForm';
import CompositionViewer from './CompositionViewer';

// Formatted sentence (capitalize and space correctly), writing input (as is), suggestion (capitalize and space correctly)

const CompositionContainer = ({
  composition,
  suggestion,
  options,
  onProposalChange,
  onProposalSubmit,
  onContentClick,
}) => {
  

  // const potentialComposition = (composition + userInput).trim();
  // const formattedSuggestion =
  //   !potentialComposition ||
  //   textUtils.endsInTerminalPunctuation(potentialComposition)
  //     ? textUtils.capitalize(suggestion)
  //     : suggestion;

  // const compositionArray = composition.split(' ');
  // let formattedCompositionArray = compositionArray.map((word) => {
  //   if (/$[!?.,]+/.test(word)) {
  //     return word;
  //   }
  //   return ` ${word}`;
  // });

  return (
    <div>
      <CompositionViewer
        composition={composition}
        suggestion={suggestion}
        onContentClick={onContentClick}
        options={options}
      />
      <CompositionForm
        style={{ float: 'none' }}
        onSubmit={onProposalSubmit}
        onChange={onProposalChange}
        value={composition.proposal}
      />
    </div>
  );
};

CompositionContainer.propTypes = {
  composition: PropTypes.object,
  suggestion: PropTypes.string,
  options: PropTypes.object,
  onProposalChange: PropTypes.func,
  onProposalSubmit: PropTypes.func,
  onContentClick: PropTypes.func,
};

export default CompositionContainer;
