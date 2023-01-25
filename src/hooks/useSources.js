import { useEffect, useState } from 'react';
import sourcesService from '../services/sourcesService';

const useSources = () => {
  const [currentSource, setCurrentSource] = useState({});
  const [sources, setSources] = useState([]);
  const [suggestionMachines, setSuggestionMachines] = useState([]);

  const defaultSource = {
    title: 'Complete Works',
    author: 'William Shakespeare'
  }

  const findDefaultSourceIn = (items) => {
    items.find((source) => {
        return (
          source.title === defaultSource.title &&
          source.author === defaultSource.author
        );
      });
  }

  const initializeSourcesHook = () => {
    sourcesService
      .getSourcesInfo()
      .then((serverSources) => {
        const processedSources = serverSources.map(s => ({...s, isLocal: false}));
        let current = findDefaultSourceIn(processedSources);
        current = current ? current : processedSources[0];
        setSources(processedSources);
        setCurrentSource(current);
      })
      .catch((error) => {
        console.log('Error retrieving initial sources: ', error.message);
      });
  };

  useEffect(initializeSourcesHook, []);

  const addLocalSourceAndMachine = (source, sourceSuggestionMachine) => {
    const processedSource = {...source, isLocal: true};
    sourceSuggestionMachine.id = source.id;
    setSources(sources.concat(processedSource));
    setCurrentSource(processedSource);
    setSuggestionMachines(suggestionMachines.concat(sourceSuggestionMachine));
  }

  const removeLocalSourceAndMachine = (sourceID) => {
    const filteredSources = sources.filter(s => s.id !== sourceID);
    setSources(filteredSources);
    if (currentSource.id === sourceID) {
      setCurrentSource(filteredSources[0]);
    }
    setSuggestionMachines(suggestionMachines.filter(s => s.id !== sourceID));
  }

  const getSuggestionMachine = (sourceID) => {
    console.log('machine ', suggestionMachines);
    return suggestionMachines.find(s => s.id === sourceID);
  }

  return {
    sources, 
    currentSource, 
    setCurrentSource,
    addLocalSourceAndMachine,
    removeLocalSourceAndMachine,
    getSuggestionMachine
  };
};

export default useSources;
