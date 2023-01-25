import { useState } from 'react';

const useField = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { value, onChange };
};

export default useField
