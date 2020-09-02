import React, { useCallback, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import styled from 'styled-components'
import {Button} from './Button'

interface props {
  onSearch: (term: string) => void,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
}

// margin: ${({theme}) => (`${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.md} 0`)};
// padding: ${({theme}) => (theme.spacing.xs)};


const Input = styled.input`
  color: ${({theme}) => (theme.colors.text)};
  font-size: ${({theme}) => (theme.fontSize.md)};
  padding-left: ${({theme}) => (theme.spacing.sm)};
  margin-right: ${({theme}) => (theme.spacing.sm)};
  border-radius: ${({theme}) => (theme.borderRadius.curve)};
  border: none;
  flex: 3;
  align-self: center;
  
  box-shadow: inset ${({theme}) => {
    const xs = theme.spacing.xs
    return `${xs} ${xs} ${xs}`
  }} lightGray;

  &:focus {
    outline: none;
  }

  @media (max-width: 779px) {
    font-size: ${({theme}) => (theme.fontSize.sm)};
    padding-left: ${({theme}) => (theme.spacing.md)};
  }
`
const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: ${({theme}) => (`${theme.spacing.sm} 0 ${theme.spacing.md}`)}
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
      <FlexBox>
        <Input 
          type='text'
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='search a movie'
        />
        <Button clearSearch onClick={() => setValue('')}>clear search</Button>
      </FlexBox>
    </>
  )
}