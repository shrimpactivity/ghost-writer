import React from 'react';
import PropTypes from 'prop-types';
import colorPalette from '../../config/colorPalette';

const proposalStyle = {
  marginLeft: '5px',
  fontFamily: 'Georgia',
  borderRadius: '3px',
  color: colorPalette.complement,
  overflowWrap: 'break-word',
  maxWidth: '100%'
};

const ProposalItem = ({ formattedProposal }) => {
  if (formattedProposal.length === 0) {
    return;
  }
  return <span className="proposal-word" style={proposalStyle}>{formattedProposal}</span>;
};

ProposalItem.propTypes = {
  formattedProposal: PropTypes.string.isRequired,
};

export default ProposalItem;
