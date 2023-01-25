import React from 'react';
import PropTypes from 'prop-types';
import WritingForm from './WritingForm';
import Button from './Button';
import CompositionViewer from './CompositionViewer';

// Formatted sentence (capitalize and space correctly), writing input (as is), suggestion (capitalize and space correctly)

const CompositionContainer = ({
  composition,
  suggestion,
  allowSubmit,
  onContentClick,
  options,
}) => {
  const handleProposalChange = (event) => {
    const newUserInput = event.target.value;
    composition.setProposal(newUserInput);
  };

  const handleProposalSubmit = (event) => {
    event.preventDefault();
    if (allowSubmit) {
      composition.addProposalAndSuggestion(suggestion);
    }
  };

  const deleteComposition = () => {
    if (
      composition.content.length &&
      confirm('Are you sure you want to delete your composition?')
    ) {
      composition.setContent([]);
    }
  };

  const deleteLastWordOfComposition = () => {
    const newContent = [...composition.content];
    newContent.pop();
    composition.setContent(newContent);
  };

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
      <WritingForm
        style={{ float: 'none' }}
        onSubmit={handleProposalSubmit}
        onChange={handleProposalChange}
        value={composition.proposal}
      />
      <Button label="Delete composition" onClick={deleteComposition} />
      <Button
        label="Delete previous word"
        onClick={deleteLastWordOfComposition}
      />
    </div>
  );
};

CompositionContainer.propTypes = {
  composition: PropTypes.object,
  suggestion: PropTypes.string,
  allowSubmit: PropTypes.bool,
  onContentClick: PropTypes.func,
  options: PropTypes.object,
};

export default CompositionContainer;
