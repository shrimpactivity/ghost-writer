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

import Welcome from './Welcome';
import SourceSelector from './SourceSelector';
import CompositionContainer from './CompositionContainer';
import OptionsMenu from './OptionsMenu';
import GutenbergSearch from './GutenbergSearch';
import Header from './Header';
import Button from './Button';
import useOptions from '../hooks/useOptions';

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
idk at least like 20-30 options? 
*/

/*
TODO:
- Only allow up to 3 local sources
- Add composition to local storage. 

Header
Composition
Options
Save / Load / Delete
Footer
*/

const App = () => {
  const firstRender = useRef(true);
  const [welcomeVisible] = useState(false);
  const [notification] = useState('');
  const [showSearch, setShowSearch] = useState(false);
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
      console.groupCollapsed('Suggestion hooked...');
      const suggestionParams = [
        composition.getAllTokens(),
        options.suggestionAccuracy,
        options.suggestionCount,
      ];

      if (currentSource.isLocal) {
        console.log(
          'Updating suggestion from local source: ',
          currentSource.title
        );
        const machine = getSuggestionMachine(currentSource.id);
        updateLocalSuggestion(...suggestionParams, machine);
      } else {
        console.log(
          'Queuing a suggestion update from server source: ',
          currentSource.title
        );
        queueSuggestionUpdateFromServer(...suggestionParams, currentSource);
      }

      console.groupEnd();
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
      suggestionService.retrieveSuggestionFromServer(
        ...getWordClickSuggestionParams(wordIndex),
        currentSource
      ).then((suggestion) => {
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
      composition.setContent([]);
    }
  };

  const handleDeleteLastWord = () => {
    const newContent = [...composition.content];
    newContent.pop();
    composition.setContent(newContent);
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

    return bookService.getFormattedBook(gutenbergID).then((formattedBook) => {
      console.log(formattedBook);
      const tokens = formattedBook.split(' ');
      console.log('Creating SuggestionMachine for new local source.');
      const newMachine = new SuggestionMachine(tokens);
      addLocalSourceAndMachine(newSource, newMachine);
    });
  };

  const handleSearchResultClick = (result) => {
    console.log('Search result selected: ', result);
    createSourceAndMachine(result);
    setShowSearch(false);
  };

  return (
    <div>
      <Header />
      {notification}
      {welcomeVisible && <Welcome />}
      {/* <Hint text='' /> */}
      <CompositionContainer
        composition={composition}
        suggestion={suggestion}
        options={options}
        onProposalChange={handleProposalChange}
        onProposalSubmit={handleProposalSubmit}
        onContentClick={handleContentClick}
      />
      <SourceSelector
        sources={sources}
        currentSource={currentSource}
        onChange={handleSourceSelection}
      />

      <Button label="X" onClick={handleDeleteComposition} />
      <Button label="<-" onClick={handleDeleteLastWord} />

      <OptionsMenu options={options} />
      <button onClick={() => setShowSearch(!showSearch)}>
        {showSearch ? 'Hide Search Bar' : 'Search Bar'}
      </button>
      {showSearch && (
        <GutenbergSearch onResultClick={handleSearchResultClick} />
      )}

      {/* TODO: <Footer/> */}
    </div>
  );
};

export default App;
