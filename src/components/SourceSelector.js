import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select } from '@mui/material';

const formatSourceName = (source) => {
  if (!source.author) {
    return source.title;
  }
  return `${source.author} \u2015 ${source.title}`;
};

const localSourcesOptionsGroup = (sources) => {
  const localSources = sources.filter((s) => s.isLocal);
  if (localSources.length === 0) {
    return;
  }

  return (
    <optgroup label="Downloaded Ghosts">
      {localSources.map((source) => (
        <option key={source.id} value={source.id}>
          {formatSourceName(source)}
        </option>
      ))}
    </optgroup>
  );
};

const serverSourcesOptionsGroup = (sources) => {
  const serverSources = sources.filter((s) => !s.isLocal);
  return (
    <optgroup label="Ghosts">
      {serverSources.map((source) => (
        <option key={source.id} value={source.id}>
          {formatSourceName(source)}
        </option>
      ))}
    </optgroup>
  );
};

const SourceSelector = ({ value, onChange, sources }) => {
  if (sources.length === 0) value = '';
  
  return (
    <div style={{ padding: '10px' }}>
      <select
        style={{
          width: "100%"
        }}
        value={value}
        onChange={onChange}
        label={'Choose your Ghost Writer'}
      >
        {localSourcesOptionsGroup(sources)}
        {serverSourcesOptionsGroup(sources)}
      </select>
    </div>
  );
};

SourceSelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  sources: PropTypes.array
};

export default SourceSelector;
