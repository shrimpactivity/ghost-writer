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
  border: '2px solid',
  borderColor: theme.medium
};

const textContainerStyle = {
  padding: "9px",
  color: theme.light,
  textAlign: 'center',
  fontStyle: 'italic',
  fontSize: '17px',
};

const selectStyle = {
  width: '100%',
  height: '30px',
  color: 'black',
  backgroundColor: theme.light,
  borderColor: theme.darkest,
  borderRadius: '5px',
  font: '18px Roboto',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

const optionStyle = {
  overflow: "hidden",
  textOverflow: 'ellipsis',
  fontSize: "14px"
}

const formatSourceName = (source) => {
  let result = ""
  if (!source.author) {
    result = source.title;
  } else {
    result = `${source.author} \u2015 ${source.title}`;
  }
  if (result.length > 60) {
    result = result.slice(0, 60) + '...';
  }
  return result;
};

const localSourcesOptionsGroup = (sources) => {
  const localSources = sources.filter((s) => s.isLocal);
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

const serverSourcesOptionsGroup = (sources) => {
  const serverSources = sources.filter((s) => !s.isLocal);
  return (
    <optgroup label="Ghosts">
      {serverSources.map((source) => (
        <option style={optionStyle} key={source.id} value={source.id}>
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
      <div style={textContainerStyle}>You're writing with</div>
      <div style={{ maxWidth: '350px' }}>
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
