import { useEffect, useState } from 'react';
import sourcesService from '../services/sourcesService';

const useSources = () => {
  const [sources, setSources] = useState({
    current: {},
    server: [],
    client: [],
  });

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
        let current = findDefaultSourceIn(serverSources);
        current = current ? current : serverSources[0];
        const updatedSources = { ...sources, server: serverSources, current };
        setSources(updatedSources);
      })
      .catch((error) => {
        console.log('Error retrieving initial sources: ', error.message);
      });
  };

  useEffect(initializeSourcesHook, []);

  const setCurrentSource = (source) => {
    setSources({...sources, current: source});
  }

  const addClientSource = (source) => {
    setSources({...sources, client: sources.client.concat(source)})
  }

  const removeClientSource = (sourceID) => {
    setSources({...sources, client: sources.client.filter(s => s.id !== sourceID)})
  }

  return {
    sources, 
    setCurrentSource,
    addClientSource,
    removeClientSource
  };
};

export default useSources;
