import React from 'react';

const Welcome = () => {
  return (
    <div className="welcome">
      <p>
        Type in a word, and the next word in the sentence will be generated from
        the selected source material.
      </p>
      <p>
        You can append new words without typing by clicking <b>generate</b>.
      </p>
      <p>If you don't like a word, click it to generate a new one.</p>
      <p>
        <span style={{ color: 'lightcoral' }}>Warning:</span> the selected
        source is not filtered in any way, and may produce less than polite
        language.
      </p>
      <p>
        <a
          href="https://github.com/shrampi/cowriter"
          style={{ color: '#2e79db' }}
        >
          GitHub
        </a>
      </p>
    </div>
  );
};

export default Welcome;
