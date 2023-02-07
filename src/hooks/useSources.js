import { useEffect, useState } from 'react';
import sourcesService from '../services/sourcesService';

const useSources = () => {
  const [currentSource, setCurrentSource] = useState({});
  const [sources, setSources] = useState([]);
  const [suggestionMachines, setSuggestionMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const defaultSource = {
    title: 'Complete Works',
    author: 'William Shakespeare',
  };

  const findDefaultSourceIn = (items) => {
    items.find((source) => {
      return (
        source.title === defaultSource.title &&
        source.author === defaultSource.author
      );
    });
  };

  const initializeSourcesHook = () => {
    console.log('Retrieving sources from server...')
    sourcesService
      .getSourcesInfo()
      .then((serverSources) => {
        const processedSources = serverSources.map((s) => ({
          ...s,
          isLocal: false,
        }));
        let current = findDefaultSourceIn(processedSources);
        current = current ? current : processedSources[0];
        setSources(processedSources);
        setCurrentSource(current);
        setIsLoading(false);
        console.log('Server sources found: ', processedSources);
        console.log('Current source set to: ', current.title);
      })
      .catch((error) => {
        console.log('Error retrieving initial sources: ', error.message);
      });
  };

  useEffect(initializeSourcesHook, []);

  const addLocalSourceAndMachine = (source, sourceSuggestionMachine) => {
    const processedSource = { ...source, isLocal: true };
    sourceSuggestionMachine.id = source.id;
    setSources(sources.concat(processedSource));
    setCurrentSource(processedSource);
    setSuggestionMachines(suggestionMachines.concat(sourceSuggestionMachine));
    console.log('Added local source and machine: ', processedSource.title);
  };

  const removeLocalSourceAndMachine = (sourceID) => {
    const filteredSources = sources.filter((s) => s.id !== sourceID);
    setSources(filteredSources);
    console.log('Removed local source and machine: ', sources.find(s => s.id === sourceID).title);
    if (currentSource.id === sourceID) {
      setCurrentSource(filteredSources[0]);
    }
    setSuggestionMachines(suggestionMachines.filter((s) => s.id !== sourceID));
  };

  const getSuggestionMachine = (sourceID) => {
    return suggestionMachines.find((s) => s.id === sourceID);
  };

  return {
    sources,
    currentSource,
    isLoading,
    setCurrentSource,
    addLocalSourceAndMachine,
    removeLocalSourceAndMachine,
    getSuggestionMachine,
  };
};

export default useSources;
