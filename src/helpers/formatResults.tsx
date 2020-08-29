interface movie {
  title: string,
  year: number,
  nominated: boolean
}

export const formatResults = (results: any[]): movie[] => {
  // format a new movie object with only title, year, and nomination status
  if (!results) {
    return []
  }

  return results.map((movie: any) => {
    const movieObj: movie = { title: movie.Title, year: movie.Year, nominated: false }
    return movieObj;
  })
}