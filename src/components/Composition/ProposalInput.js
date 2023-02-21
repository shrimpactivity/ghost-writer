import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import theme from '../../config/colorPalette';

const getInputStyle = (proposal) => {
  return {
    marginLeft: '0.5em',
    color: 'cyan',
    backgroundColor: theme.darker,
    width: `${proposal.length * 0.6 + 0.6}em`,
    maxWidth: '100%',
    font: '16px roboto-mono',
    border: 'none',
    borderRadius: '3px',
  };
};

const ProposalInput = (props) => {

  const inputRef = useRef(null);

  const focus = () => {
    inputRef.current.focus();
  }

  useEffect(focus, []);

  const handleKeyDown = (event) => {
    if (event.code === "Backspace") {
      props.onInputBackspace(event);
    }
  }

  return (
    <span>
      <form
        onSubmit={props.onProposalSubmit}
        style={{ display: 'inline'}}
      >
        <input
          ref={inputRef}
          className="proposal-input"
          type="text"
          onChange={props.onProposalChange}
          onKeyDown={handleKeyDown}
          value={props.composition.proposal}
          spellCheck="false"
          autoComplete="off"
          style={getInputStyle(props.composition.proposal)}
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    </span>
  );
};

ProposalInput.propTypes = {
  onInputBackspace: PropTypes.func.isRequired,
  onProposalChange: PropTypes.func.isRequired,
  composition: PropTypes.object.isRequired,
}

export default ProposalInput;
