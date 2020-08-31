import React, { useCallback, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import styled from 'styled-components'

interface props {
  onSearch: (term: string) => void,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const Input = styled.input`
  color: ${({theme}) => (theme.colors.text)};
  margin: ${({theme}) => (`${theme.spacing.sm} 0 ${theme.spacing.md}`)};
  padding: ${({theme}) => (theme.spacing.xs)};
  padding-left: ${({theme}) => (theme.spacing.sm)};
  border-radius: ${({theme}) => (theme.borderRadius.curve)};
  border: none;
  font-size: ${({theme}) => (theme.fontSize.md)};
  box-shadow: inset ${({theme}) => {
    const xs = theme.spacing.xs
    return `${xs} ${xs} ${xs}`
  }} lightGray;

  &:focus {
    outline: none;
  }
`

export const SearchBar: React.FC<props> = ({ onSearch, value, setValue }) => {
  // hook controls input state
  
  // value of input debounced
  const debouncedTerm = useDebounce(value, 400);

  // memoize onSearch callback
  const search = useCallback(onSearch, [debouncedTerm]);

  // search callback tracks debouncedTerm
  useEffect(() => {
    search(debouncedTerm);
  }, [debouncedTerm, search]);

  return (
    <>
      <Input 
        type='text'
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder='search a movie'
      />
    </>
  )
}