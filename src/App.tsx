import React, { useEffect, useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { formatResults } from './helpers/formatResults';

interface movie {
  title: string,
  year: number,
  nominated: boolean
}

const App: React.FC = () => {
  const [term, setTerm] = useState<string>('');
  const [results, setResults] = useState<movie[]>([]);
  const [nominations, setNominations] = useState<movie[]>([]);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=538adb24&s=${term}&type=movie`)
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
    <div>
      {/* Search: onSearch, useCallback to setTerm at App level */}
      <SearchBar onSearch={(term: string) => setTerm(term)}/>
      {/* Results: render list of movies w/ title, year, and nominate button */}
      <h1>Results</h1>
      <ul>
        {results && results.map((movie: any, index) => {
          return <li key={index}>
                  {`${movie.title}, ${movie.year} `}
                  <button disabled={movie.nominated} onClick={() => nominate(movie)}>{movie.nominated ? 'nominated' : 'nominate!'}</button>
                </li>
        })}
      </ul>
      {/* Nominations: render list of movie noms with title, year, and remove button */}
      <h1>Nominations</h1>
      <ul>
        {nominations && nominations.map((movie: any, index) => {
          return <li key={index}>
                  {`${movie.title}, ${movie.year} `}
                  <button onClick={() => removeNomination(movie)}>remove</button>
                </li>
        })}
      </ul>
    </div>
  );
}

export default App;
