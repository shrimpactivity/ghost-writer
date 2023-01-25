import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SuggestionMachine from 'suggestion-machine';
import parseIntoTokens from '../utils/parseIntoTokens';
import { getServerSuggestion, getLocalSuggestion } from '../utils/getSuggestion';

import bookService from '../services/bookService';

import useSources from '../hooks/useSources';
import useComposition from '../hooks/useComposition';
import useSuggestion from '../hooks/useSuggestion';

import Welcome from './Welcome';
import SourceSelector from './SourceSelector';
import CompositionContainer from './CompositionContainer';
import OptionsMenu from './OptionsMenu';
import CheckboxInput from './CheckboxInput';
import NumberInput from './NumberInput';
import GutenbergSearch from './GutenbergSearch';
import Header from './Header';

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
  const [options, setOptions] = useState({
    suggestionAccuracy: 3, // Articulate, intelligible, experimental, inebriated
    numSuggestedWords: 1,
    showSuggestionPreview: true,
  });
  const [showSearch, setShowSearch] = useState(false);
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
  } = useSuggestion();

  const updateSuggestionHook = () => {
    if (!firstRender.current) {
      console.groupCollapsed('Suggestion hooked...');
      const suggestionParams = [
        composition.getAllTokens(),
        options.suggestionAccuracy,
        options.numSuggestedWords,
      ];

      if (currentSource.isLocal) {
        console.log('Updating suggestion from local source: ', currentSource.title);
        const machine = getSuggestionMachine(currentSource.id);
        updateLocalSuggestion(...suggestionParams, machine);
      } else {
        console.log('Queuing a suggestion update from server source: ', currentSource.title);
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
    options,
  ]);

  const getPredecessorTokens = (wordIndex) => {
    const predecessorWords = composition.content.slice(0, wordIndex);
    console.log(predecessorWords);
    const predecessorTokens = parseIntoTokens(
      predecessorWords.reduce((accum, word) => {
        return accum + ' ' + word;
      }, '')
    );
    return predecessorTokens;
  };

  const handleContentClick = (wordIndex) => {
    console.group('Word clicked at index ', wordIndex);
    const predecessorTokens = getPredecessorTokens(wordIndex);
    console.log('Predecessors of word clicked: ', predecessorTokens);
    const suggestionParams = [
      predecessorTokens,
      options.suggestionAccuracy,
      options.numSuggestedWords,
    ];

    if (currentSource.isLocal) {
      const suggestion = getLocalSuggestion(
        ...suggestionParams,
        getSuggestionMachine(currentSource.id)
      );
      console.log('Local suggestion found: ', suggestion);
      console.groupEnd();
      composition.updateContentAtIndex(wordIndex, suggestion);
      return;
    }

    getServerSuggestion(...suggestionParams, currentSource).then(
      (suggestion) => {
        console.log('Server suggestion found: ', suggestion);
        console.groupEnd();
        composition.updateContentAtIndex(wordIndex, suggestion);
      }
    );
  };

  const handleSourceSelection = (event) => {
    const selectedID = event.target.value;
    const selectedSource = sources.find((s) => s.id === selectedID);
    console.log('Source selected: ', selectedSource.title);
    setCurrentSource(selectedSource);
  };

  const handleShowSuggestionPreviewChange = () => {
    const newValue = !options.showSuggestionPreview;
    const updatedOptions = { ...options, showSuggestionPreview: newValue };
    setOptions(updatedOptions);
  };

  const handleNumSuggestedWordsChange = (event) => {
    const newAmount = Number(event.target.value);
    const updatedOptions = { ...options, numSuggestedWords: newAmount };
    setOptions(updatedOptions);
  };

  const handleSuggestionAccuracyChange = (event) => {
    const newAccuracy = Number(event.target.value);
    const updatedOptions = { ...options, suggestionAccuracy: newAccuracy };
    setOptions(updatedOptions);
  };

  const createSourceAndMachine = (result) => {
    const gutenbergID = result.id;
    const newSource = {
      id: uuidv4(),
      title: result.title,
      author: result.authors,
    };

    return bookService.getFormattedBook(gutenbergID).then((formattedBook) => {
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
        allowSubmit={!isSuggestionTimedOut()}
        onContentClick={handleContentClick}
        options={options}
      />
      <SourceSelector
        sources={sources}
        currentSource={currentSource}
        onChange={handleSourceSelection}
      />

      <OptionsMenu>
        <CheckboxInput
          label={"Show preview of ghostwriter's suggestion:"}
          value={options.showSuggestionPreview}
          onChange={handleShowSuggestionPreviewChange}
        />
        <NumberInput
          value={options.numSuggestedWords}
          onChange={handleNumSuggestedWordsChange}
          min="0"
          max="5"
          label={'Number of words ghostwriter suggests:'}
        />
        <NumberInput
          value={options.suggestionAccuracy}
          onChange={handleSuggestionAccuracyChange}
          min="0"
          max="3"
          label={'Suggestion accuracy:'}
        />
      </OptionsMenu>
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
