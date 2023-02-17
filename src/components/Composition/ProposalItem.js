import React from 'react';
import PropTypes from 'prop-types';
import colorPalette from '../../config/colorPalette';
import { beginsWithPunctuation } from '../../utils/text';

const getProposalStyle = (proposal) => {
  return {
    marginLeft: beginsWithPunctuation(proposal) ? '0px' : '5px',
    borderRadius: '3px',
    color: colorPalette.complement,
    overflowWrap: 'break-word',
    maxWidth: '100%',
  };
};

const ProposalItem = ({ formattedProposal }) => {
  if (formattedProposal.length === 0) {
    return;
  }
  return (
    <span className="proposal-word" style={getProposalStyle(formattedProposal)}>
      {formattedProposal}
    </span>
  );
};

ProposalItem.propTypes = {
  formattedProposal: PropTypes.string.isRequired,
};

export default ProposalItem;
