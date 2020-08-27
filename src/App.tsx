import React, { useEffect, useState } from 'react';
import './App.css';

// interface search {
//   results: movie[],
//   term: string
// }

// interface movie {
//   title: string,
//   year: number,
//   nominated: boolean
// }

const App: React.FC = () => {
  let [search, setSearch] = useState<any>({results: [], term: 'ram'})

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=538adb24&s=${search.term}&type=movie`)
    .then(res => res.json())
    .then(res => {
      setSearch({...search, results: [...res.Search.map((movie: { Title: any; }) => movie.Title)]})
      console.log(res)
    })
  }, [search.term])

  return (
    <div>
      <input type='text' value={search.term} onChange={e => setSearch({...search, term: e.target.value})}></input>
      <ul>
        {search.results.map((r: React.ReactNode, index: number) => {
          return <li key={index} >{r}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
