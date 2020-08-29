interface movie {
  title: string,
  year: number,
  nominated: boolean
}

export const formatResults = (results: any[], nominations: movie[]): movie[] => {
  // format a new movie object with only title, year, and nomination status
  if (!results) {
    return []
  }

  return results.map((movie: any) => {
    // if movie is nominated, format true, else format false
    const nominated = nominations.find(nom => nom.title === movie.Title)
    return nominated ? { title: movie.Title, year: movie.Year, nominated: true } 
      : { title: movie.Title, year: movie.Year, nominated: false }
  })
}