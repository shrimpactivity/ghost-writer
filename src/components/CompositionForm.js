import React from 'react';
import { Button } from '@mui/material';

const WritingForm = ({
  onSubmit,
  onChange,
  value,
  onDeleteLastWord,
  onDeleteComposition,
}) => {
  return (
    <div style={{ padding: '10px' }}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Start typing here"
          onChange={onChange}
          value={value}
          spellCheck="true"
        />
        <Button variant="contained" type="submit">
          +
        </Button>
        <Button variant="contained" onClick={onDeleteLastWord}>
          {'<-'}
        </Button>
        <Button variant="contained" onClick={onDeleteComposition}>
          X
        </Button>
      </form>
    </div>
  );
};

export default WritingForm;
