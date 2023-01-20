import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@mui/material';

const formatSource = (source) => {
  if (!source.author) {
    return source.title;
  }
  return `${source.author} - ${source.title}`;
};

const clientSourcesOptionsGroups = (clientSources) => {
  return (
    <optgroup label="Downloaded Ghosts">
      {clientSources.map((source) => (
        <option key={source.id} value={source.id}>
          {formatSource(source)}
        </option>
      ))}
    </optgroup>
  );
};

const serverSourcesOptionsGroup = (serverSources) => {
  return (
    <optgroup label="Ghosts">
      {serverSources.map((source) => (
        <option key={source.id} value={source.id}>
          {formatSource(source)}
        </option>
      ))}
    </optgroup>
  );
};

const options = 'this is a test'.split(' ');

const SourceSelector = ({ sources, onChange }) => {
  const showClientSources = sources.client.length > 0;

  return (
    <div style={{ padding: '10px' }}>
      <div style={{ float: 'left' }}>Now co-writing with:</div>
      <select value={sources.current.id} onChange={onChange}>
        {showClientSources && clientSourcesOptionsGroups(sources.client)}
        {serverSourcesOptionsGroup(sources.server)}
      </select>

    </div>
  );
};

SourceSelector.propTypes = {
  sources: PropTypes.object,
  onChange: PropTypes.func,
};

export default SourceSelector;
