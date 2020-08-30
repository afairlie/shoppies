import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { formatResults } from './helpers/formatResults';
import { movie } from './interfaces'

import { SearchBar } from './components/SearchBar';
import {Results} from './components/Results';

const AppStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

const App: React.FC = () => {
  const [term, setTerm] = useState<string>('');
  const [results, setResults] = useState<movie[]>([]);
  const [nominations, setNominations] = useState<movie[]>([]);

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
      return nominations.length === 5 ? alert('congratulations, you nominated 5 movies!') : null
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
    <AppStyles>
      {/* Search: onSearch, useCallback to setTerm at App level */}
      <SearchBar onSearch={(term: string) => setTerm(term)}/>
      {/* Results: render list of movies w/ title, year, and nominate button */}
      <Results results={results} nominate={nominate}/>
      {/* Nominations: render list of movie noms with title, year, and remove button */}
      <h1>Nominations</h1>
      <ul>
        {nominations && nominations.map((movie, index) => {
          return <li key={index}>
                  {`${movie.title}, ${movie.year} `}
                  <button onClick={() => removeNomination(movie)}>remove</button>
                </li>
        })}
      </ul>
    </AppStyles>
  );
}

export default App;
