import React, { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface props {
  onSearch: (term: string) => void
}

export const SearchBar: React.FC<props> = ({ onSearch }) => {
  // hook controls input state
  const [value, setValue] = useState('apocalypse');
  // value of input debounced
  const debouncedTerm = useDebounce(value, 500);

  // memoize onSearch callback
  const search = useCallback(onSearch, [debouncedTerm]);

  // search callback tracks debouncedTerm
  useEffect(() => {
    search(debouncedTerm);
  }, [debouncedTerm, search]);

  return <input 
    type='text'
    value={value}
    onChange={e => setValue(e.target.value)}
    placeholder='search a movie'
  />
}