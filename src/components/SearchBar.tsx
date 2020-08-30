import React, { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import styled from 'styled-components'

interface props {
  onSearch: (term: string) => void
}

const Input = styled.input`
  color: ${({theme}) => (theme.colors.text)};
`

export const SearchBar: React.FC<props> = ({ onSearch }) => {
  // hook controls input state
  const [value, setValue] = useState('');
  // value of input debounced
  const debouncedTerm = useDebounce(value, 400);

  // memoize onSearch callback
  const search = useCallback(onSearch, [debouncedTerm]);

  // search callback tracks debouncedTerm
  useEffect(() => {
    search(debouncedTerm);
  }, [debouncedTerm, search]);

  return <Input 
    type='text'
    value={value}
    onChange={e => setValue(e.target.value)}
    placeholder='search a movie'
  />
}