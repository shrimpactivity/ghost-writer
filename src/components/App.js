import React from 'react';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SuggestionMachine from 'suggestion-machine';

import bookService from '../services/bookService';
import sourcesService from '../services/sourcesService';
import suggestionService from '../services/suggestionService';

import textUtils from '../utils/textUtils';
import parseStringIntoTokens from '../utils/parseStringIntoTokens';
import removeGutenbergLabels from '../utils/removeGutenbergLabels';

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
  const [welcomeVisible] = useState(false);
  const [notification] = useState('');
  const [sources, setSources] = useState({
    current: {},
    server: [],
    client: [],
  });
  const [composition, setComposition] = useState('');
  const [userInput, setUserInput] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [suggestionRequestTimeout, setSuggestionRequestTimeout] =
    useState(null);
  const [options, setOptions] = useState({
    suggestionAccuracy: 3, // Articulate, intelligible, experimental, inebriated
    numSuggestedWords: 1,
    showSuggestionPreview: true,
  });
  const [showSearch, setShowSearch] = useState(false);

  /** Initializes sources state by retrieving info from server. */
  const initializeSources = () => {
    sourcesService
      .getSourcesInfo()
      .then((serverSources) => {
        let current = serverSources.find((source) => {
          return (
            source.title === 'Complete Works' &&
            source.author === 'William Shakespeare'
          );
        });
        if (!current) {
          current = serverSources[0];
        }
        const updatedSources = { ...sources, server: serverSources, current };
        setSources(updatedSources);
      })
      .catch((error) => {
        console.log('Error retrieving initial sources: ', error.message);
      });
  };

  useEffect(initializeSources, []);

  /**
   * Retrieves a suggestion from the server using the current composition and userInput.
   * @returns {Promise} the suggestion
   */
  const getSuggestion = () => {
    const tokens = parseStringIntoTokens(composition + ' ' + userInput);
    return suggestionService.retrieveSuggestion(
      tokens,
      sources.current,
      options.suggestionAccuracy,
      options.numSuggestedWords
    );
  };

  // FIXME: have it consistently update every 500ms, rather than waiting 500ms between updates?
  // Have the timeout handling up top, then do stuff based on timeout state?
  /** Queue's  */
  const queueSuggestionUpdateFromServer = () => {
    const SUGGESTION_REQUEST_INTERVAL = 500;
    // Indicate suggestion is loading
    setSuggestion('...');
    // If there's no suggestion request timer active:
    if (!suggestionRequestTimeout) {
      getSuggestion().then(suggestion => {
        setSuggestion(suggestion);
      });
      // start a timeout which will be the suggestionRequestTimeout. After 1 sec, will be set to null.
      const timeoutID = setTimeout(() => {
        setSuggestionRequestTimeout(null);
      }, SUGGESTION_REQUEST_INTERVAL);
      setSuggestionRequestTimeout(timeoutID);
      return;
    }
    // If there is already a suggestion request timer active:
    // Clear the current timeout
    clearTimeout(suggestionRequestTimeout);
    // Create a new timeout that will update the suggestion.
    const timeoutID = setTimeout(() => {
      getSuggestion().then(suggestion => {
        setSuggestion(suggestion);
      });
      setSuggestionRequestTimeout(null);
    }, SUGGESTION_REQUEST_INTERVAL);
    setSuggestionRequestTimeout(timeoutID);
  };

  const updateSuggestionHook = () => {
    // Check if current source has local data
    if (!sources.current.machine) {
      queueSuggestionUpdateFromServer();
    } else {
      const tokens = parseStringIntoTokens(composition + ' ' + userInput);
      const suggestion = sources.current.tree.getSuggestionFrom(tokens);
      setSuggestion(suggestion);
    }
  };

  useEffect(updateSuggestionHook, [composition, userInput, sources, options]);

  const handleSourceSelection = (event) => {
    const selectedID = event.target.value;
    const clientSourcesInfo = sources.client.map((source) => ({
      ...source,
      data: null,
    }));
    const allSources = sources.server.concat(clientSourcesInfo);
    const newSource = allSources.find((source) => source.id === selectedID);
    const updatedSources = { ...sources, current: newSource };
    setSources(updatedSources);
  };

  const handleWritingChange = (event) => {
    const newUserInput = event.target.value;
    setUserInput(newUserInput);
  };

  const handleWritingSubmit = (event) => {
    event.preventDefault();
    if (!suggestionRequestTimeout) {
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
    console.log('New source information: ', newSource);
    console.log('Retrieving text from Project Gutenberg...');
    return bookService.getBook(gutenbergID).then((book) => {
      const formattedText = removeGutenbergLabels(book);
      const tokens = parseStringIntoTokens(formattedText);
      newSource.machine = new SuggestionMachine(tokens);
      console.log('Gutenberg resource found and processed into new source.');
      return newSource;
    });
  };

  const handleSearchResultClick = (result) => {
    console.log('Selected result: ', result);
    createSourceFromSearchResult(result).then((source) => {
      console.log('Adding source to state...');
      const newClientSources = sources.client.concat(source);
      setSources({ ...sources, client: newClientSources, current: source });
      console.log('Done');
      console.log('Char length of data: ', JSON.stringify(source.tree).length);
    });
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
