import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import theme from '../../config/colorPalette';

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

  return (
    <>
      {props.composition.lineBreaks[props.composition.content.length] ? <p></p> : null}
      <span>
        <form onSubmit={props.onProposalSubmit} style={{ display: 'inline' }}>
          <input
            ref={props.inputRef}
            className="proposal-input"
            type="text"
            onChange={props.onProposalChange}
            onKeyDown={props.onInputKeyDown}
            value={props.composition.proposal}
            spellCheck="false"
            autoComplete="off"
            style={getInputStyle(props.composition.proposal)}
          />
          <button type="submit" style={{ display: 'none' }}></button>
        </form>
      </span>
    </>
  );
};

ProposalInput.propTypes = {
  onInputKeyDown: PropTypes.func.isRequired,
  onProposalChange: PropTypes.func.isRequired,
  composition: PropTypes.object.isRequired,
};

export default ProposalInput;
