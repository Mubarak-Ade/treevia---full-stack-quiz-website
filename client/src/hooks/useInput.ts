import { useState, ChangeEvent } from 'react';

interface UseInputReturn {
  value: string | boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
}

const useInput = (initialState: string | boolean): [string | boolean, (e: ChangeEvent<HTMLInputElement>) => void, () => void] => {
  const [value, setValue] = useState<string | boolean>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { type, checked, value: inputValue } = e.target;
    setValue(type === 'checkbox' ? checked : inputValue);
  };

  const reset = () => {
    setValue(initialState);
  };

  return [value, handleChange, reset];
};

export default useInput;
