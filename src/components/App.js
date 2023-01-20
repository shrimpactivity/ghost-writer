import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SuggestionMachine from 'suggestion-machine';

import bookService from '../services/bookService';

import useSources from '../hooks/useSources';
import useComposition from '../hooks/useComposition';

import Welcome from './Welcome';
import SourceSelector from './SourceSelector';
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

/*
What does Composition care about? 
- the composition content
- the user input
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
  const [userInput, setUserInput] = useState('');
  const [options, setOptions] = useState({
    suggestionAccuracy: 3, // Articulate, intelligible, experimental, inebriated
    numSuggestedWords: 1,
    showSuggestionPreview: true,
  });
  const [showSearch, setShowSearch] = useState(false);

  const composition = useComposition();
  const { sources, setCurrentSource, addClientSource, removeClientSource } =
    useSources();

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

  const createSourceFromSearchResult = (result) => {
    const gutenbergID = result.id;
    const newSource = {
      id: uuidv4(),
      title: result.title,
      author: result.authors,
    };

    return bookService.getFormattedBook(gutenbergID).then((formattedBook) => {
      const tokens = formattedBook.split(' ');
      console.log('Creating SuggestionMachine for new local source.');
      newSource.machine = new SuggestionMachine(tokens);
      return newSource;
    });
  };

  const handleSearchResultClick = (result) => {
    console.log('Search result selected: ', result);
    createSourceFromSearchResult(result).then((source) => {
      addClientSource(source);
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
        currentSource={source.current}
        options={options}
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
