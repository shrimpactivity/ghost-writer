import { useState, useEffect } from 'react';
import parseIntoTokens from '../utils/parseIntoTokens';

const useComposition = () => {
  const [content, setContent] = useState([]);
  const [proposal, setProposal] = useState('');

  const addProposalAndSuggestion = (suggestion) => {
    const newContent = content.concat([proposal.trim(), suggestion]);
    setContent(newContent);
    setProposal('');
  };

  const getContentTokens = () => {
    return parseIntoTokens(
      content.reduce((accum, word) => {
        return accum + ' ' + word;
      })
    );
  };

  const getProposalTokens = () => {
    return parseIntoTokens(proposal);
  };

  const getAllTokens = () => {
    return getContentTokens().concat(getProposalTokens);
  };

  const clearContent = () => {
    setContent([]);
  };

  const updateContentAtIndex = (index, word) => {
    const newContent = [...content];
    newContent[index] = word;
    setContent(newContent);
  };

  return {
    content,
    proposal,
    setProposal,
    setContent,
    clearContent,
    updateContentAtIndex,
    addProposalAndSuggestion,
    getContentTokens,
    getProposalTokens,
    getAllTokens,
  };
};

export default useComposition;