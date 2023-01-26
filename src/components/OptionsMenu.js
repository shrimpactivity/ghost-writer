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
        min="0"
        max="5"
        label={'Number of words ghostwriter suggests:'}
      />
      <NumberInput
        {...options.suggestionAccuracyField}
        min="0"
        max="3"
        label={'Suggestion accuracy:'}
      />
    </>
  );
};

const OptionsMenu = ({ options }) => {
  const [hidden, setHidden] = React.useState(true);
  return (
    <div>
      <button onClick={() => setHidden(!hidden)}>
        {hidden ? 'Options' : 'Hide Options'}
      </button>
      {!hidden && <OptionInputs options={options}/>}
    </div>
  );
};

OptionsMenu.propTypes = {
  options: PropTypes.object,
};

export default OptionsMenu;
