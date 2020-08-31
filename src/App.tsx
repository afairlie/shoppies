import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { formatResults } from './helpers/formatResults';
import { movie } from './interfaces'
import { ResponsiveFlexRow, FlexColumn } from './styled/index'

import { SearchBar } from './components/SearchBar';
import {Results} from './components/Results';
import {Nominations} from './components/Nominations';
import {Complete} from './components/Complete';

const MainStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({theme}) => (theme.colors.text)}
`
const Logo = styled.h1`
  font-family: ${({theme}) => (theme.fontFamily.title)};
  font-size: ${({theme}) => (theme.fontSize.xl)};
  background: -webkit-linear-gradient(#160900, #9e7a47);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${({theme}) => (theme.spacing.md)};
  line-height: normal;

  @media (max-width: 779px) {
    font-size: ${({theme}) => (theme.fontSize.md)};
  }
`

const App: React.FC = () => {
  // debounced search term for API
  const [term, setTerm] = useState<string>('');
  // controlled input value for SearchBar
  const [value, setValue] = useState('');
  const [results, setResults] = useState<movie[]>([]);
  const [nominations, setNominations] = useState<movie[]>([]);
  const [isComplete, setComplete] = useState<boolean>(false);

  useEffect(() => {
    const key = '538adb24'
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${term}&type=movie`)
    .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('api search error')
        }
      })
    .then(res => {
        const formattedResults = formatResults(res.Search, nominations)
        setResults(formattedResults)
    })
    .then(() => {
      return nominations.length === 5 ? setComplete(true) : null
    })
  }, [term, nominations])

  const nominate = (movie: movie) => {
    if (nominations.length < 5) {
      setNominations(prev => [...prev, movie])
    }
  }

  const removeNomination = (movie: movie) => {
    if (isComplete) {setComplete(false)}
    setNominations(prev => [...prev.filter(m => m.title !== movie.title || m.year !== movie.year)])
  }

  const restart = () => {
    setTerm('')
    setValue('')
    setResults([])
    setNominations([])
    setComplete(false)
  }

  return (
    <MainStyles>
      <Logo> Shoppies 🎞</Logo>
        <SearchBar onSearch={(term: string) => setTerm(term)} value={value} setValue={setValue}/>
        <ResponsiveFlexRow>
          <Results results={results} nominate={nominate}/>
          <FlexColumn>
            {isComplete && <Complete restart={restart}/>}
            <Nominations nominations={nominations} removeNomination={removeNomination}/>
          </FlexColumn>
        </ResponsiveFlexRow>
    </MainStyles>
  );
}

export default App;
