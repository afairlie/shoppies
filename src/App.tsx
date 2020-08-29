import React, { useEffect, useState } from 'react';
import { SearchBar } from './components/SearchBar';
// import { formatResults } from './helpers/formatResults';

// interface state {
//   results: movie[],
//   term: string
// }

interface movie {
  title: string,
  year: number,
  nominated: boolean
}

const App: React.FC = () => {
  const [term, setTerm] = useState<string>('');
  const [results, setResults] = useState<movie[]>([]);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=538adb24&s=${term}&type=movie`)
    .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error('api search error')
        }
      })
    .then(res => {
        setResults(res.Search)
    })
  }, [term])

  return (
    <div>
      {/* Search */}
      <SearchBar term={term} setTerm={setTerm}/>
      {/* Results */}
      <ul>
        {results && results.map((movie: any, index) => {
          return <li key={index} >{`${movie.Title}, ${movie.Year}` }</li>
        })}
      </ul>
      {/* Nominations */}
    </div>
  );
}

export default App;
