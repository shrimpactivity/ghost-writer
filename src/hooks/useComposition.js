import { useState } from 'react';
import parseIntoTokens from '../utils/parseIntoTokens';
import { removeExtraWhitespace } from '../utils/text';

const useComposition = () => {
  const [content, setContent] = useState([]);
  const [proposal, setProposal] = useState('');
  const [ghostWords, setGhostWords] = useState([]);

  const addProposalAndSuggestion = (suggestion) => {
    const formattedProposal = removeExtraWhitespace(proposal);
    const proposalItems = formattedProposal ? formattedProposal.split(' ') : [];
    const suggestionItems = suggestion.split(' ');
    const newContent = content
      .concat(proposalItems)
      .concat(suggestionItems);
    setContent(newContent);
    setProposal('');
    const falseGhostWords = [...Array(proposalItems.length)].map(x => false);
    const trueGhostWords = [...Array(suggestionItems.length)].map(x => true);
    const newGhostWords = ghostWords.concat(falseGhostWords, trueGhostWords);
    setGhostWords(newGhostWords);
  };

  const getContentTokens = () => {
    return parseIntoTokens(
      content.reduce((accum, word) => {
        return accum + ' ' + word;
      }, "")
    );
  };

  const getProposalTokens = () => {
    return parseIntoTokens(proposal);
  };

  const getAllTokens = () => {
    return getContentTokens().concat(getProposalTokens());
  };

  const deleteLastWordOfContent = () => {
    const newContent = [...content];
    newContent.pop();
    setContent(newContent);
    const newGhostWords = [...ghostWords];
    newGhostWords.pop();
    setGhostWords(newGhostWords);
  }

  const clearContent = () => {
    setContent([]);
    setGhostWords([]);
  };

  const updateContentAtIndex = (index, word) => {
    const newContent = [...content];
    newContent[index] = word;
    setContent(newContent);
    const newGhostWords = [...ghostWords];
    newGhostWords[index] = true;
    setGhostWords(newGhostWords);
  };

  return {
    content,
    proposal,
    ghostWords,
    setProposal,
    setContent,
    setGhostWords,
    clearContent,
    deleteLastWordOfContent,
    updateContentAtIndex,
    addProposalAndSuggestion,
    getContentTokens,
    getProposalTokens,
    getAllTokens,
  };
};

export default useComposition;