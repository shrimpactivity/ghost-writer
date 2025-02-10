import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../../theme/palette';

const selectStyle = {
  height: '30px',
  width: '100%',
  maxWidth: '420px',
  color: 'black',
  backgroundColor: theme.light,
  borderColor: theme.darkest,
  borderRadius: '5px',
  font: '18px Roboto',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

const optionStyle = {
  fontSize: '14px',
};

const formatSourceName = (source) => {
  let result = '';
  if (!source.author) {
    result = source.title;
  } else {
    result = `${source.author} \u2015 ${source.title}`;
  }
  return result;
};

const localSourcesOptionsGroup = (allSources) => {
  const localSources = allSources.filter((s) => s.isLocal);
  if (localSources.length === 0) {
    return;
  }
  return (
    <optgroup style={optionStyle} label="Downloaded Ghosts">
      {localSources.map((source) => (
        <option style={optionStyle} key={source.id} value={source.id}>
          {formatSourceName(source)}
        </option>
      ))}
    </optgroup>
  );
};

const serverSourcesOptionsGroup = (allSources) => {
  const serverSources = allSources.filter((s) => !s.isLocal);
  return (
    <optgroup style={optionStyle} label="Ghosts">
      {serverSources.map((source) => (
        <option style={optionStyle} key={source.id} value={source.id}>
          {formatSourceName(source)}
        </option>
      ))}
    </optgroup>
  );
};

const SourceSelect = ({ sources, onChange }) => {
  return (
    <select style={selectStyle} value={sources.current.id} onChange={onChange}>
      {localSourcesOptionsGroup(sources.all)}
      {serverSourcesOptionsGroup(sources.all)}
    </select>
  );
};

SourceSelect.propTypes = {
  sources: PropTypes.object,
  onChange: PropTypes.func,
};

export default SourceSelect;
