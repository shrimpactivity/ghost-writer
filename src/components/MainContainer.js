import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SuggestionMachine from 'suggestion-machine';
import parseIntoTokens from '../utils/parseIntoTokens';
import bookService from '../services/bookService';
import suggestionService from '../services/suggestionService';

import useSources from '../hooks/useSources';
import useComposition from '../hooks/useComposition';
import useSuggestion from '../hooks/useSuggestion';
import useNotification from '../hooks/useNotification';
import useOptions from '../hooks/useOptions';

import NotificationContainer from './NotificationContainer';
import SourceSelector from './SourceSelector';
import CompositionContainer from './Composition/CompositionContainer';
import MenuContainer from './Menu/MenuContainer';


import { Container } from '@mui/material';

/*
Initial sources:
shakespeare
bible
quran
paradise lost
all sherlock holmes
pride and prejudice
jane eyre
moby dick
federalist papers
long cat ipsum
idk at least like 20-30 options? 
*/

/*
TODO:
- Only allow up to 3 local sources
- Add composition to local storage. 

inebriated
experimental
intelligible
articulate

Header
Composition
Options
Save / Load / Delete
Footer
*/

const MainContainer = () => {
  const firstRender = useRef(true);
  const [showSearch, setShowSearch] = useState(false);

  const notification = useNotification('Loading Ghosts...');
  const options = useOptions();
  const composition = useComposition();
  const {
    sources,
    currentSource,
    setCurrentSource,
    addLocalSourceAndMachine,
    removeLocalSourceAndMachine,
    getSuggestionMachine,
  } = useSources();
  const {
    suggestion,
    updateLocalSuggestion,
    queueSuggestionUpdateFromServer,
    isSuggestionTimedOut,
    timeSuggestionOut,
  } = useSuggestion();

  const updateSuggestionHook = () => {
    if (!firstRender.current) {
      const suggestionParams = [
        composition.getAllTokens(),
        options.suggestionAccuracy,
        options.suggestionCount,
      ];

      if (currentSource.isLocal) {
        const machine = getSuggestionMachine(currentSource.id);
        updateLocalSuggestion(...suggestionParams, machine);
      } else {
        queueSuggestionUpdateFromServer(...suggestionParams, currentSource);
      }
    }

    firstRender.current = false;
  };

  useEffect(updateSuggestionHook, [
    composition.content,
    composition.proposal,
    currentSource,
    options.suggestionAccuracy,
    options.suggestionCount,
  ]);

  useEffect(() => {
    if (!sources.isLoading) {
      notification.update("Ghosts loaded, ready to write!")
    }
  }, [sources.isLoading])

  const getPredecessorTokens = (wordIndex) => {
    const predecessorWords = composition.content.slice(0, wordIndex);
    const predecessorTokens = parseIntoTokens(
      predecessorWords.reduce((accum, word) => {
        return accum + ' ' + word;
      }, '')
    );
    return predecessorTokens;
  };

  const getWordClickSuggestionParams = (wordIndex) => {
    const suggestionParams = [
      getPredecessorTokens(wordIndex),
      options.suggestionAccuracy,
      1,
    ];
    return suggestionParams;
  };

  const handleContentClick = (wordIndex) => {
    console.groupCollapsed('Word clicked at index ', wordIndex);
    if (currentSource.isLocal) {
      const suggestion = suggestionService.getSuggestionFromMachine(
        ...getWordClickSuggestionParams(wordIndex),
        getSuggestionMachine(currentSource.id)
      );
      console.log('Local suggestion found: ', suggestion);
      console.groupEnd();
      composition.updateContentAtIndex(wordIndex, suggestion);
    } else if (!isSuggestionTimedOut()) {
      suggestionService
        .retrieveSuggestionFromServer(
          ...getWordClickSuggestionParams(wordIndex),
          currentSource
        )
        .then((suggestion) => {
          console.log('Server suggestion found: ', suggestion);
          console.groupEnd();
          composition.updateContentAtIndex(wordIndex, suggestion);
        });
      timeSuggestionOut();
    }
  };

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

  const handleDeleteComposition = () => {
    if (
      composition.content.length &&
      confirm('Are you sure you want to delete your composition?')
    ) {
      composition.clearContent();
      notification.update('Composition deleted');
    }
  };

  const handleDeleteLastWord = () => {
    composition.deleteLastWordOfContent();
  };

  const handleSourceSelection = (event) => {
    const selectedID = event.target.value;
    const selectedSource = sources.find((s) => s.id === selectedID);
    console.log('Source selected: ', selectedSource.title);
    setCurrentSource(selectedSource);
  };

  const createSourceAndMachine = (result) => {
    const gutenbergID = result.id;
    const newSource = {
      id: uuidv4(),
      title: result.title,
      author: result.authors,
    };

    notification.update(`Extracting ${newSource.title} from Project Gutenberg...`, Infinity);

    return bookService.getFormattedBook(gutenbergID).then((formattedBook) => {
      notification.update(`Sublimating Ghost in alphabetic vestibule...`, Infinity)
      console.log('Creating SuggestionMachine for new local source.');
      const tokens = formattedBook.split(' ');
      const newMachine = new SuggestionMachine(tokens);
      console.log('New Machine created no problem...')
      notification.update('Cleaning ectoplasm...');
      addLocalSourceAndMachine(newSource, newMachine);
    });
  };

  const handleSearchResultClick = (result) => {
    console.log('Search result selected: ', result);
    createSourceAndMachine(result);
    setShowSearch(false);
  };

  return (
    <>
      <Container maxWidth="sm">
        <NotificationContainer text={notification.text}/>
        <SourceSelector
          value={currentSource.id}
          onChange={handleSourceSelection}
          sources={sources}
        />

        <CompositionContainer
          composition={composition}
          suggestion={suggestion}
          options={options}
          onProposalChange={handleProposalChange}
          onProposalSubmit={handleProposalSubmit}
          onContentClick={handleContentClick}
          onDeleteLastWord={handleDeleteLastWord}
          onDeleteComposition={handleDeleteComposition}
        />

        <MenuContainer 
          options={options}
          handleOpenSearch={() => setShowSearch(!showSearch)}
          showSearchModal={showSearch}
          onSearchResultClick={handleSearchResultClick}
        /> 
        
      </Container>
    </>
  );
};

export default MainContainer;
