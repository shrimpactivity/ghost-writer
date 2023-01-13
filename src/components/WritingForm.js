import React from 'react';

const WritingForm = ({ onSubmit, onChange, value }) => {

  return (
    <div style={{padding: '10px'}}>
      <form onSubmit={onSubmit}>
        <input 
          type="text"
          placeholder="Start typing here"
          onChange={onChange}
          value={value}
          spellCheck="true"
        />
        <button type='submit'>Compose</button>
      </form>
    </div>
  )
}

export default WritingForm;
