import { useState, useEffect } from 'react';
import parseIntoTokens from '../utils/parseIntoTokens';
import { removeExtraWhitespace } from '../utils/text';
import storage from '../services/localStorage';

/**
 * Converts an array of words into an array of objects to be stored in the content state.
 * @param {string[]} words
 * @param {boolean} addedByGhost
 * @returns {Object[]}
 */
const convertWordsToContentObjects = (words, addedByGhost) => {
  return words.map((word) => {
    return {
      word,
      ghost: addedByGhost,
      id: `${Math.floor(Math.random() * 999999999999)}`,
    };
  });
};

const useComposition = () => {
  const [content, setContent] = useState(() => {
    const initial = JSON.parse(storage.get('content'));
    return initial || [];
  });
  const [proposal, setProposal] = useState(() => {
    const initial = JSON.parse(storage.get('proposal'));
    return initial || '';
  });

  /**
   * Effect for updating the composition in local storage when changes are made.
   */
  const updateLocalStorage = () => {
    storage.set('content', JSON.stringify(content));
    storage.set('proposal', JSON.stringify(proposal));
  };

  useEffect(updateLocalStorage, [content, proposal]);

  /**
   * Formats the current proposal and suggestion argument, then adds them to the content state.
   * @param {string} suggestion
   */
  const addProposalAndSuggestion = (suggestion) => {
    const formattedProposal = removeExtraWhitespace(proposal);
    const proposalWords = formattedProposal ? formattedProposal.split(' ') : [];
    const suggestionWords = suggestion.trim() ? suggestion.split(' ') : [];

    const newContent = content
      .concat(convertWordsToContentObjects(proposalWords, false))
      .concat(convertWordsToContentObjects(suggestionWords, true));
    setContent(newContent);

    setProposal('');
  };

  /**
   * Formats the proposal and adds it to the content state.
   */
  const addProposal = () => {
    const formattedProposal = removeExtraWhitespace(proposal);
    const proposalWords = formattedProposal ? formattedProposal.split(' ') : [];
    const newContent = content.concat(
      convertWordsToContentObjects(proposalWords, false)
    );
    setContent(newContent);
    setProposal('');
  };

  /**
   * Returns an array of word tokens usable with the suggestion algorithm. All new line characters are removed.
   * @returns {string[]}
   */
  const getContentTokens = () => {
    const removedNewLines = content.filter((item) => item.word !== '\n');
    return parseIntoTokens(
      removedNewLines.reduce((accum, item) => {
        return accum + ' ' + item.word;
      }, '')
    );
  };

  /**
   * Returns an array of word tokens usable with the suggestion algorithm.
   * @returns {string[]}
   */
  const getProposalTokens = () => {
    return parseIntoTokens(proposal);
  };

  /**
   * Returns the tokenized form of all content and proposal words.
   * @returns {string[]}
   */
  const getAllTokens = () => {
    return getContentTokens().concat(getProposalTokens());
  };

  /**
   * Returns all tokens preceding the specified content index. New line characters are exlcluded from being tokens.
   * @param {number} index
   * @returns {string[]}
   */
  const getTokensPreceding = (index) => {
    const predecessorWords = content
      .map((item) => item.word)
      .slice(0, index)
      .filter((word) => word !== '\n');
    const predecessorTokens = parseIntoTokens(
      predecessorWords.reduce((accum, word) => {
        return accum + ' ' + word;
      }, '')
    );
    return predecessorTokens;
  };

  /**
   * Deletes the last content item and returns its word value.
   * @returns {string}
   */
  const popLastWordOfContent = () => {
    const newContent = [...content];
    const lastWord = newContent.pop().word;
    setContent(newContent);
    return lastWord;
  };

  /**
   * Resets the state back to initial empty values.
   */
  const clearAll = () => {
    setContent([]);
    setProposal('');
  };

  /**
   * Updates the content item at the specified index.
   * @param {number} index
   * @param {string} word
   * @param {boolean} [addedByGhost=true]
   */
  const updateContentAtIndex = (index, word, addedByGhost = true) => {
    const newContent = [...content];
    newContent[index].word = word;
    newContent[index].ghost = true;
    setContent(newContent);
  };

  /**
   * Adds a new item to the content state with a word value of '\n' to represent a new line in the text editor.
   */
  const addNewLine = () => {
    const formattedProposal = removeExtraWhitespace(proposal);
    const proposalWords = formattedProposal ? formattedProposal.split(' ') : [];
    const newLineItem = {
      word: '\n',
      ghost: false,
      id: `${Math.floor(Math.random() * 999999999999999)}`,
    };
    const newContent = content
      .concat(convertWordsToContentObjects(proposalWords, false))
      .concat(newLineItem);
    setProposal('');
    setContent(newContent);
  };

  

  return {
    content,
    proposal,
    setProposal,
    setContent,
    clearAll,
    popLastWordOfContent,
    updateContentAtIndex,
    addProposalAndSuggestion,
    addProposal,
    getContentTokens,
    getProposalTokens,
    getAllTokens,
    getTokensPreceding,
    addNewLine,
  };
};

export default useComposition;
