import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import theme from '../../theme/palette';

const LocalSource = ({ source, onClickDelete }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        borderTop: '2px solid',
        borderColor: theme.darker,
        padding: '5px',
      }}
    >
      <div>
        <Tooltip title="Delete Ghost">
          <IconButton
            aria-label="delete ghost"
            variant="contained"
            onClick={() => onClickDelete(source.id)}
          >
            <DeleteForeverIcon
              sx={{ color: theme.complement }}
              fontSize="medium"
            />
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <div style={{ color: theme.light }}>{source.author}</div>
        <div style={{ fontSize: '12px' }}>{source.title}</div>
      </div>
      
    </div>
  );
};

LocalSource.propTypes = {
  source: PropTypes.object.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default LocalSource;
