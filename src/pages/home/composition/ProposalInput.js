import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../../config/colorPalette';

const getInputStyle = (proposalText) => {
  return {
    marginLeft: '0.5em',
    color: 'cyan',
    backgroundColor: proposalText.length > 0 ? theme.darker : theme.dark,
    width: `${proposalText.length * 0.6 + 0.6}em`,
    maxWidth: '100%',
    font: '16px roboto-mono',
    border: 'none',
    borderRadius: '3px',
  };
};

const ProposalInput = (props) => {
  const handleProposalChange = (event) => {
    const newUserInput = event.target.value;
    props.composition.setProposal(newUserInput);
  };

  const handleInputKeyDown = (event) => {
    switch (event.code) {
      case 'Backspace':
        if (
          props.composition.proposal.length === 0 &&
          props.composition.content.length > 0
        ) {
          event.preventDefault();
          const newProposal = props.composition.popLastWordOfContent();
          props.composition.setProposal(newProposal === '\n' ? '' : newProposal);
        }
        break;

      case 'Tab':
          event.preventDefault();
          props.onProposalSubmit();
          break;

      case 'Enter':
        // Add proposal to composition. Don't add suggestion.
        // Pressing enter multiple times should create more than one new line.
        event.preventDefault();
        props.composition.addNewLine();
        break;
    }
  };

  return (
    <>
      <span>
        <input
          ref={props.inputRef}
          className="proposal-input"
          type="text"
          onChange={handleProposalChange}
          onKeyDown={handleInputKeyDown}
          value={props.composition.proposal}
          spellCheck="false"
          autoComplete="off"
          style={getInputStyle(props.composition.proposal)}
        />
      </span>
    </>
  );
};

ProposalInput.propTypes = {
  composition: PropTypes.object.isRequired,
};

export default ProposalInput;
