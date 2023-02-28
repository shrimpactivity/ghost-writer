import { useEffect, useState } from 'react';
import sourcesService from '../services/sources';

const useSources = () => {
  const [sources, setSources] = useState([]);
  const [suggestionMachines, setSuggestionMachines] = useState([]);
  const [current, setCurrent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getInitialSource = (processedSources) => {
    const defaultSource = {
      title: 'Complete Works',
      author: 'William Shakespeare',
    };

    let result = processedSources.find((source) => {
      return (
        source.title === defaultSource.title &&
        source.author === defaultSource.author
      );
    });

    if (!result) {
      return processedSources[0];
    }

    return result;
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
        const sortedSources = processedSources.sort((a, b) => {
          if (a.author < b.author) return -1;
          if (a.author === b.author) return 0;
          return 1;
        });
        const current = getInitialSource(sortedSources);
        setSources(sortedSources);
        setCurrent(current);
        setIsLoading(false);
        console.log('Server sources found: ', processedSources);
        console.log('Current source set to: ', current.title);
      })
      .catch((error) => {
        console.log('Error retrieving initial sources: ', error.message);
      });
  };

  useEffect(initializeSourcesHook, []);

  const addLocalSourceAndMachine = (source, machine) => {
    const processedSource = { ...source, isLocal: true };
    machine.id = source.id;
    setSources(sources.concat(processedSource));
    setCurrent(processedSource);
    setSuggestionMachines(suggestionMachines.concat(machine));
    console.log('Added local source and machine: ', processedSource.title);
  };

  const removeLocalSourceAndMachine = (sourceID) => {
    const filteredSources = sources.filter((s) => s.id !== sourceID);
    setSources(filteredSources);
    console.log('Removed local source and machine: ', sources.find(s => s.id === sourceID).title);
    if (current.id === sourceID) {
      setCurrent(filteredSources[0]);
    }
    setSuggestionMachines(suggestionMachines.filter((s) => s.id !== sourceID));
  };

  const getSuggestionMachine = (sourceID) => {
    return suggestionMachines.find((s) => s.id === sourceID);
  };

  return {
    all: sources,
    current: current,
    isLoading,
    suggestionMachines,
    setCurrent,
    addLocalSourceAndMachine,
    removeLocalSourceAndMachine,
    getSuggestionMachine,
  };
};

export default useSources;
