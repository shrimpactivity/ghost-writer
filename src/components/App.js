import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SuggestionMachine from 'suggestion-machine';

import bookService from '../services/bookService';
import suggestionService from '../services/suggestionService';

import textUtils from '../utils/text';
import parseStringIntoTokens from '../utils/tokens';
import removeGutenbergLabels from '../utils/removeGutenbergLabels';

import useSources from '../hooks/useSources';
import useSuggestion from '../hooks/useSuggestion';

import Welcome from './Welcome';
import SourceSelector from './SourceSelector';
import WritingForm from './WritingForm';
import CompositionDisplay from './CompositionDisplay';
import OptionsMenu from './OptionsMenu';
import CheckboxInput from './CheckboxInput';
import NumberInput from './NumberInput';
import Button from './Button';
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

*/



const App = () => {
  const firstRender = useRef(true);
  const [welcomeVisible] = useState(false);
  const [notification] = useState('');
  const [composition, setComposition] = useState('');
  const [userInput, setUserInput] = useState('');
  const [options, setOptions] = useState({
    suggestionAccuracy: 3, // Articulate, intelligible, experimental, inebriated
    numSuggestedWords: 1,
    showSuggestionPreview: true,
  });
  const [showSearch, setShowSearch] = useState(false);

  const { sources, setCurrentSource, addClientSource, removeClientSource } =
    useSources();
  const { suggestion, queueSuggestionUpdate, isSuggestionTimedOut } =
    useSuggestion();

  const updateSuggestionHook = () => {
    console.log('Suggestion hooked...')
    const tokens = parseStringIntoTokens(composition + ' ' + userInput);
    const params = {
      tokens,
      source: sources.current,
      accuracy: options.suggestionAccuracy,
      amount: options.numSuggestedWords,
    };
    if (!firstRender.current) {
      queueSuggestionUpdate(params);
    }
    firstRender.current = false;
  };

  useEffect(updateSuggestionHook, [composition, userInput, sources, options]);

  const findSource = (sourceID) => {
    let result = sources.server.find((source) => source.id === sourceID);
    if (!result) {
      result = sources.client.find((source) => source.id === sourceID);
    }
    return result;
  };

  const handleSourceSelection = (event) => {
    const selectedID = event.target.value;
    const selectedSource = findSource(selectedID);
    console.log('Source selected: ', selectedSource.title);
    setCurrentSource(selectedSource);
  };

  const handleWritingChange = (event) => {
    const newUserInput = event.target.value;
    setUserInput(newUserInput);
  };

  const handleWritingSubmit = (event) => {
    event.preventDefault();
    if (!isSuggestionTimedOut()) {
      const newComposition = composition + ' ' + userInput + ' ' + suggestion;
      const formattedComposition =
        textUtils.formatStringIntoSentence(newComposition);
      setComposition(formattedComposition);
      setUserInput('');
    }
  };

  const handleWordClick = (wordIndex) => {
    console.log('Word clicked at index ', wordIndex);
    const compositionArray = composition.split(' ');
    const predecessors = compositionArray.slice(0, wordIndex);
    let tokens = [];
    for (let word of predecessors) {
      const token = parseStringIntoTokens(word)[0];
      if (token) {
        tokens.push(token);
      }
    }
    suggestionService
      .retrieveSuggestion(
        tokens,
        sources.current,
        options.suggestionAccuracy,
        1
      )
      .then((suggestion) => {
        compositionArray[wordIndex] = suggestion;
        const newComposition =
          textUtils.formatWordArrayIntoSentence(compositionArray);
        setComposition(newComposition);
      });
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

  const deleteComposition = () => {
    if (
      composition &&
      confirm('Are you sure you want to delete your composition?')
    ) {
      setComposition('');
    }
  };

  const deleteLastWordOfComposition = () => {
    if (composition) {
      const compositionArray = composition.split(' ');
      compositionArray.pop();
      const newComposition =
        textUtils.formatWordArrayIntoSentence(compositionArray);
      setComposition(newComposition);
    }
  };

  const createSourceFromSearchResult = (result) => {
    const gutenbergID = result.id;
    const newSource = {
      id: uuidv4(),
      title: result.title,
      author: result.authors,
    };

    newSource.machine = new SuggestionMachine('this is a test'.split(' '));
    console.log('Test machine created for new source.');
    addClientSource(newSource);
    console.log(newSource.machine);

    // return bookService.getFormattedBook(gutenbergID).then((formattedBook) => {
    //   const tokens = formattedBook.split(' ');
    //   console.log('Creating SuggestionMachine for new local source.');
    //   newSource.machine = new SuggestionMachine(tokens);
    //   return newSource;
    // });
  };

  const handleSearchResultClick = (result) => {
    console.log('Search result selected: ', result);
    createSourceFromSearchResult(result)
    // .then((source) => {
    //   addClientSource(source);
    // });
    setShowSearch(false);
  };

  return (
    <div>
      <Header />
      {notification}
      {welcomeVisible && <Welcome />}
      {/* <Hint text='' /> */}
      <CompositionDisplay
        composition={composition}
        userInput={userInput}
        suggestion={suggestion}
        showPreview={options.showSuggestionPreview}
        onWordClick={handleWordClick}
      />
      <WritingForm
        style={{ float: 'none' }}
        onSubmit={handleWritingSubmit}
        onChange={handleWritingChange}
        value={userInput}
      />
      <SourceSelector sources={sources} onChange={handleSourceSelection} />
      <Button label="Delete composition" onClick={deleteComposition} />
      <Button
        label="Delete previous word"
        onClick={deleteLastWordOfComposition}
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
          max="100"
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
