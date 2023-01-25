import React from 'react';
import PropTypes from 'prop-types';
import WritingForm from './WritingForm';
import Button from './Button';

// Formatted sentence (capitalize and space correctly), writing input (as is), suggestion (capitalize and space correctly)

const CompositionDisplay = ({ composition, suggestion, allowSubmit, onContentClick, options}) => {
  
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

  const getSentenceStyle = () => {
    return {
      display: 'inline-block',
      whiteSpace: 'pre',
      cursor: 'pointer',
    };
  };

  const getUserInputStyle = () => {
    return { ...getSentenceStyle(), color: 'blue' };
  };

  const getSuggestionStyle = () => {
    return { ...getSentenceStyle(), color: 'red' };
  };

  return (
    <div>
      {composition.content.map((word, index) => {
        return (
          <div
            key={index}
            style={getSentenceStyle()}
            onClick={() => onContentClick(index)}
          >
            {word + ' '}
          </div>
        );
      })}
      <div style={getUserInputStyle()}>{' ' + composition.proposal + ' '}</div>
      {options.showSuggestionPreview && (
        <div style={getSuggestionStyle()}>
          <em>{suggestion}</em>
        </div>
      )}
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

CompositionDisplay.propTypes = {
  composition: PropTypes.object,
  suggestion: PropTypes.string,
  allowSubmit: PropTypes.bool,
  onContentClick: PropTypes.func,
  options: PropTypes.object,
};

export default CompositionDisplay;
