import React from 'react';
import PropTypes from 'prop-types';

const formatSource = (source) => {
  if (!source.author) {
    return source.title;
  }
  return `${source.author} - ${source.title}`;
};

const localSourcesOptionsGroup = (sources) => {
  return (
    <optgroup label="Downloaded Ghosts">
      {sources.filter(s => s.isLocal).map((source) => (
        <option key={source.id} value={source.id}>
          {formatSource(source)}
        </option>
      ))}
    </optgroup>
  );
};

const serverSourcesOptionsGroup = (sources) => {
  return (
    <optgroup label="Ghosts">
      {sources.filter(s => !s.isLocal).map((source) => (
        <option key={source.id} value={source.id}>
          {formatSource(source)}
        </option>
      ))}
    </optgroup>
  );
};

const SourceSelector = ({ sources, currentSource, onChange }) => {

  return (
    <div style={{ padding: '10px' }}>
      <div style={{ float: 'left' }}>Now co-writing with:</div>
      <select value={currentSource.id} onChange={onChange}>
        {localSourcesOptionsGroup(sources)}
        {serverSourcesOptionsGroup(sources)}
      </select>
    </div>
  );
};

SourceSelector.propTypes = {
  sources: PropTypes.array,
  currentSource: PropTypes.object,
  onChange: PropTypes.func,
};

export default SourceSelector;
