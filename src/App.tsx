import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { formatResults } from './helpers/formatResults';
import { movie } from './interfaces'
import { FlexRow } from './styled/index'

import { SearchBar } from './components/SearchBar';
import {Results} from './components/Results';
import {Nominations} from './components/Nominations';

const MainStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({theme}) => (theme.colors.text)}
`
const Title = styled.h1`
  font-family: ${({theme}) => (theme.fontFamily.title)};
  font-size: ${({theme}) => (theme.fontSize.xl)};
  background: -webkit-linear-gradient(#160900, #9e7a47);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${({theme}) => (theme.spacing.sm)};
  line-height: normal;
`

const App: React.FC = () => {
  const [term, setTerm] = useState<string>('');
  const [results, setResults] = useState<movie[]>([]);
  const [nominations, setNominations] = useState<movie[]>([]);
  const [complete, setComplete] = useState<boolean>(false);

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
      setResults(prev => prev.map(m => m.title === movie.title ? {...m, nominated: true } : m ))
      setNominations(prev => [...prev, movie])
    }
  }

  const removeNomination = (movie: movie) => {
    setNominations(prev => [...prev.filter(m => m.title !== movie.title)])
    setResults(prev => prev.map(m => m.title === movie.title ? {...m, nominated: false } : m ))
  }

  return (
    <MainStyles>
      {!complete && 
      <>
        <Title> Shoppies 🎞</Title>
        <SearchBar onSearch={(term: string) => setTerm(term)}/>
        <FlexRow>
          <Results results={results} nominate={nominate}/>
          <Nominations nominations={nominations} removeNomination={removeNomination}/>
        </FlexRow>
      </>}
      {complete && <div>complete!</div>}
    </MainStyles>
  );
}

export default App;
