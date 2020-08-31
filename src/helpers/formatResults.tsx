import { movie } from '../interfaces'

export const formatResults = (results: any[], nominations: movie[]): movie[] => {
  // format a new movie object with only title, year, and nomination status
  if (!results) {
    return []
  }

  return results.map((movie: any) => {
    // if movie is nominated, format true, else format false
    const nominated = nominations.find(nom => nom.title === movie.Title && nom.year === movie.Year)
    return nominated ? { title: movie.Title, year: movie.Year, nominated: true } 
      : { title: movie.Title, year: movie.Year, nominated: false }
  })
}