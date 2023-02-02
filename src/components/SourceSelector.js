import React from 'react';
import PropTypes from 'prop-types';
import theme from '../config/colorPalette';

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '15px',
  backgroundColor: theme.dark,
  borderRadius: '10px',
};

const textContainerStyle = {
  flexGrow: 1,
  color: theme.light,
  textAlign: 'center',
  fontStyle: 'italic',
  fontSize: '18px',
};

const selectStyle = {
  width: '100%',
  color: 'black',
  backgroundColor: theme.light,
  borderColor: theme.darkest,
  borderRadius: '5px',
  font: '18px Roboto',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

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
    <div style={containerStyle}>
      <div style={textContainerStyle}>Now writing with: </div>
      <div style={{ maxWidth: '360px' }}>
        <select style={selectStyle} value={value} onChange={onChange}>
          {localSourcesOptionsGroup(sources)}
          {serverSourcesOptionsGroup(sources)}
        </select>
      </div>
    </div>
  );
};

SourceSelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  sources: PropTypes.array,
};

export default SourceSelector;
