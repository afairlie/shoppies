import React from 'react'

interface props {
  term: string, 
  setTerm: React.Dispatch<React.SetStateAction<string>>
}

export const SearchBar: React.FC<props> = ({term, setTerm}) => {

  return <input 
    type='text'
    value={term}
    onChange={e => setTerm(e.target.value)}
    placeholder='search a movie'
  />
}