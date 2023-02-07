import React from 'react';
import PropTypes from 'prop-types';
import CheckboxInput from './CheckboxInput';
import NumberInput from './NumberInput';

const OptionInputs = ({ options }) => {
  return (
    <>
      <CheckboxInput
        {...options.showSuggestionPreviewField}
        label={"Show preview of ghostwriter's suggestion:"}
      />
      <NumberInput
        {...options.suggestionCountField}
        min="1"
        max="5"
        label={'Number of words ghostwriter suggests:'}
      />
      <NumberInput
        {...options.suggestionAccuracyField}
        min="1"
        max="3"
        label={'Suggestion accuracy:'}
      />
    </>
  );
};

OptionInputs.propTypes = {
    options: PropTypes.object.isRequired,
};

export default OptionInputs