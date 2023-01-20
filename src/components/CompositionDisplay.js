import React from 'react';
import PropTypes from 'prop-types';
import textUtils from '../utils/text';
import { getLocalSuggestion, getServerSuggesion } from '../utils/getSuggestion';
import WritingForm from './WritingForm';


// Formatted sentence (capitalize and space correctly), writing input (as is), suggestion (capitalize and space correctly)

const CompositionDisplay = ({ composition, currentSource, options }) => {
  const { suggestion, queueSuggestionUpdate, isSuggestionTimedOut } =
    useSuggestion();

  const updateSuggestionHook = () => {
    console.log('Suggestion hooked...');
    const params = {
      tokens: composition.getAllTokens(),
      source: currentSource,
      accuracy: options.suggestionAccuracy,
      amount: options.numSuggestedWords,
    };
    if (!firstRender.current) {
      queueSuggestionUpdate(params);
    }
    firstRender.current = false;
  };

  useEffect(updateSuggestionHook, [composition, currentSource, options]);

  const handleProposalChange = (event) => {
    const newUserInput = event.target.value;
    composition.setProposal(newUserInput);
  };

  const handleProposalSubmit = (event) => {
    event.preventDefault();
    if (!isSuggestionTimedOut()) {
      composition.addProposalAndSuggestion(suggestion);
    }
  };

  const isCurrentSourceLocal = () => {
    if (currentSource.machine) {
      return true;
    }
    return false;
  }

  const handleContentClick = (wordIndex) => {
    console.log('Word clicked at index ', wordIndex);
    const predecessorWords = composition.content.slice(0, wordIndex);
    const predecessorTokens = parseIntoTokens(
      predecessorWords.reduce((accum, word) => {
        return accum + ' ' + word;
      })
    );
    
    const params = {
      tokens: predecessorTokens,
      source: currentSource,
      accuracy: options.suggestionAccuracy,
      amount: options.numSuggestedWords,
    };

    if (isCurrentSourceLocal()) {
      const suggestion = getLocalSuggestion(params);
      composition.updateContentAtIndex(wordIndex, suggestion);
      return;
    }

    getServerSuggestion(params).then(result => {
      composition.updateContentAtIndex(wordIndex, result);
    })
  };

  const deleteComposition = () => {
    if (
      composition.content.length &&
      confirm('Are you sure you want to delete your composition?')
    ) {
      setComposition([]);
    }
  };

  const deleteLastWordOfComposition = () => {
    const newContent = [...composition.content];
    newContent.pop();
    composition.setContent(newContent);
  };

  const potentialComposition = (composition + userInput).trim();
  const formattedSuggestion =
    !potentialComposition ||
    textUtils.endsInTerminalPunctuation(potentialComposition)
      ? textUtils.capitalize(suggestion)
      : suggestion;

  const compositionArray = composition.split(' ');
  let formattedCompositionArray = compositionArray.map((word) => {
    if (/$[!?.,]+/.test(word)) {
      return word;
    }
    return ` ${word}`;
  });

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
      {formattedCompositionArray.map((word, index) => {
        return (
          <div
            key={index}
            style={getSentenceStyle()}
            onClick={() => onWordClick(index)}
          >
            {word}
          </div>
        );
      })}
      <div style={getUserInputStyle()}>{' ' + userInput + ' '}</div>
      {showPreview && (
        <div style={getSuggestionStyle()}>
          <em>{formattedSuggestion}</em>
        </div>
      )}
      <WritingForm
        style={{ float: 'none' }}
        onSubmit={handleProposalSubmit}
        onChange={handleProposalChange}
        value={userInput}
      />
    </div>
  );
};

CompositionDisplay.propTypes = {
  composition: PropTypes.object,
  currentSource: PropTypes.object,
  options: PropTypes.object,
};

export default CompositionDisplay;
