import React from 'react';
import PropTypes from 'prop-types';
import CheckboxInput from './CheckboxInput';
import NumberInput from './NumberInput';
import MoodInput from './MoodInput';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '20px',
  marginBottom: '20px',
};

const borderStyle = {
  borderRadius: '10px',
  padding: '10px',
  boxShadow: '0 2px 10px 5px rgba(0, 0, 0, 0.5)',
};

const OptionInputs = ({ options }) => {
  return (
    <div style={containerStyle}>
      <div style={borderStyle}>
        <MoodInput {...options.suggestionAccuracyField} label="Ghost mood:" />
        <NumberInput
          {...options.suggestionCountField}
          min="1"
          max="10"
          label={'Number of suggested words:'}
        />
        <CheckboxInput
          {...options.showSuggestionPreviewField}
          label={"Preview Ghost's suggestion:"}
        />
        <CheckboxInput
          {...options.highlightGhostWordsField}
          label={"Highlight Ghost's contributions:"}
        />
        {/* FIXME:<CheckboxInput
        {...options.weightedSuggestionsField}
        label={"Weigh suggestions by frequency: "}
      /> */}
      </div>
    </div>
  );
};

OptionInputs.propTypes = {
  options: PropTypes.object.isRequired,
};

export default OptionInputs;
