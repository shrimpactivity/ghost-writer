import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import theme from '../../config/colorPalette';

const LocalSource = ({ source, onClickDelete }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '2px solid',
        borderColor: theme.darker,
        padding: '5px'
      }}
    >
      <div>
        <div>{source.author}</div>
        <div style={{ fontSize: '12px' }}>{source.title}</div>
      </div>
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
    </div>
  );
};

LocalSource.propTypes = {
  source: PropTypes.object.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default LocalSource;
