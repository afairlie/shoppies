import React, { useEffect, useState } from 'react';

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
    .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error('api search error')
        }
      })
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
