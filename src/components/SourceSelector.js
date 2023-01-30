import React from 'react';
import PropTypes from 'prop-types';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { formatWordArrayIntoSentence } from '../utils/text';
import theme from '../config/theme';

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
    <>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        style={{ padding: '10px' }}
      >
        <Box display="flex">
          <Typography variant="h6">Now writing with:</Typography>
        </Box>
        <select
          style={{
            borderRadius: '3px',
          }}
          value={value}
          onChange={onChange}
        >
          {localSourcesOptionsGroup(sources)}
          {serverSourcesOptionsGroup(sources)}
        </select>
      </Box>
    </>
  );
};

SourceSelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  sources: PropTypes.array,
};

export default SourceSelector;
