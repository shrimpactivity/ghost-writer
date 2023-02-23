import { useState } from 'react';
import parseIntoTokens from '../utils/parseIntoTokens';
import { removeExtraWhitespace } from '../utils/text';
import { v4 as uuidv4 } from 'uuid';

const useComposition = () => {
  const [content, setContent] = useState([]);
  const [proposal, setProposal] = useState('');
  const [ghostWords, setGhostWords] = useState([]);
  const [lineBreaks, setLineBreaks] = useState({});

  const addProposalAndSuggestion = (suggestion) => {
    const formattedProposal = removeExtraWhitespace(proposal);
    const proposalItems = formattedProposal ? formattedProposal.split(' ') : [];
    const suggestionItems = suggestion.trim() ? suggestion.split(' ') : [];
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

  const popLastWordOfContent = () => {
    const newContent = [...content];
    const lastWord = newContent.pop();
    setContent(newContent);
    const newGhostWords = [...ghostWords];
    newGhostWords.pop();
    setGhostWords(newGhostWords);
    const newLineBreaks = {...lineBreaks}
    if (newLineBreaks[newContent.length + 1]) {
      newLineBreaks[newContent.length + 1] = undefined;
      setLineBreaks(newLineBreaks);
    }
    return lastWord;
  }

  const clearAll = () => {
    setContent([]);
    setGhostWords([]);
    setLineBreaks({});
    setProposal('');
  };

  const updateContentAtIndex = (index, word) => {
    const newContent = [...content];
    newContent[index] = word;
    setContent(newContent);
    const newGhostWords = [...ghostWords];
    newGhostWords[index] = true;
    setGhostWords(newGhostWords);
  };

  const addNewLine = () => {
    const newLineBreaks = {...lineBreaks}
    newLineBreaks[content.length] = uuidv4();
    setLineBreaks(newLineBreaks);
  }

  return {
    content,
    proposal,
    ghostWords,
    lineBreaks,
    setProposal,
    setContent,
    setGhostWords,
    setLineBreaks,
    clearAll,
    popLastWordOfContent,
    updateContentAtIndex,
    addProposalAndSuggestion,
    getContentTokens,
    getProposalTokens,
    getAllTokens,
    addNewLine
  };
};

export default useComposition;